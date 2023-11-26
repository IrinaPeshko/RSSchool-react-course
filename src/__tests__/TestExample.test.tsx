import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import {
  TransformSpellsRequest,
  transformCard,
  transformCards,
} from './_fakeData';
import { ReduxApiMockType } from '@/types/requests-types';
import Details from '@/pages/details/[id]';

// const MockRouter = {
//   route: '/?page=1&limit=10',
//   pathname: '/?page=1&limit=10',
//   query: { page: '1', limit: '10' },
//   asPath: '/?page=1&limit=10',
//   basePath: '',
//   components: {},
//   sdc: {},
//   sbc: {},
//   sub: {},
//   clc: {},
//   isSsr: {},
//   state: {},
//   _key: {},
//   onPopState: {},
//   _bfl: {},
//   hange: {},
//   _getFlightData: {}, getInitialProps: {}, locale: {},
//   changeState: {},
//   handleRouteInfoError: {},
//   getRouteInfo: {},
//   isLocaleDomain: {},
//   isFirstPopStateEvent: {},
//   _initialMatchesMiddlewarePromise: {},
//   pageLoader: {},
//   _bps: {},
//   _wrapApp: {},
//   change: {}, urlIsNew: {}, fetchComponent: {}, _getData: {},
//   set: {},
//   onlyAHashChange: {},
//   scrollToHash: {},
//   isFallback: false,
//   isReady: true,
//   isPreview: false,
//   push: mockedRouterPush,
//   replace: vi.fn(),
//   reload: vi.fn(),
//   back: vi.fn(),
//   forward: vi.fn(),
//   prefetch: vi.fn(),
//   beforePopState: vi.fn(),
//   events: {
//     emit: vi.fn(),
//     on: vi.fn(),
//     off: vi.fn(),
//   },
// };

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('../api/reduxApi', async () => {
  const actual: { reduxApi: ReduxApiMockType } = (await vi.importActual(
    '../api/reduxApi'
  )) as { reduxApi: ReduxApiMockType };
  return {
    ...actual,
    useGetOneSpellQuery: vi.fn(() => transformCard),
    useGetSpellsQuery: vi.fn(() => transformCards),
  };
});

test('Check rendering hole page', async () => {
  mockRouter.setCurrentUrl(
    '/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41?page=1&limit=10'
  );

  mockRouter.push = vi.fn().mockImplementation((url) => {
    if (url.includes('/details/')) {
      const id = url.split('/details/')[1];
      mockRouter.query.id = id;
    }
  });
  render(
    <RouterContext.Provider value={mockRouter}>
      <Details spellsData={TransformSpellsRequest} spellData={transformCard} />
    </RouterContext.Provider>
  );

  const detailedBlock = screen.getByTestId('detailsBlock');
  expect(detailedBlock).toBeInTheDocument();

  const closeDetailsBtn = screen.getByTestId('closeDetails');

  await waitFor(() => {
    fireEvent.click(closeDetailsBtn);
  });

  screen.debug();

  //  const detailedFalseBlock = screen.queryByTestId('detailsBlock');
  //  expect(detailedFalseBlock).toBeFalsy();

  // const cards = screen.getAllByTestId('card');
  // expect(cards).toBeTruthy();

  // await waitFor(() => {
  //   fireEvent.click(cards[0]);
  // });
  // const detailed = screen.getByTestId('detailsBlock');
  // expect(detailed).toBeInTheDocument();
});
