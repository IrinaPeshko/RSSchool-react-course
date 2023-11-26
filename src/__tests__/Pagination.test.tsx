import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '../pages/index';
import { TransformSpellsRequest } from './_fakeData';

// const mockedRouterPush = vi.fn(() => Promise.resolve(true));
// const createMockedRouter = (page: string): NextRouter => ({
//   basePath: '',
//   route: '/page/[page]',
//   pathname: '/page/[page]',
//   query: { page },
//   asPath: `/page/${page}`,
//   isLocaleDomain: false,
//   push: mockedRouterPush,
//   replace: vi.fn(() => Promise.resolve(true)),
//   reload: vi.fn(),
//   back: vi.fn(),
//   forward: vi.fn(),
//   prefetch: vi.fn(() => Promise.resolve()),
//   beforePopState: vi.fn(),
//   events: {
//     emit: vi.fn(),
//     on: vi.fn(),
//     off: vi.fn(),
//   },
//   isFallback: false,
//   isReady: true,
//   isPreview: false,
// });

// const mockRouter = createMockedRouter('1');

const mockData = {
  data: TransformSpellsRequest,
};
vi.mock('next/router', () => require('next-router-mock'));
test('Make sure the component updates URL query parameter when page changes', async () => {
  mockRouter.setCurrentUrl('/?page=1&limit=10');
  render(
    <RouterContext.Provider value={mockRouter}>
      <Home cards={mockData} />
    </RouterContext.Provider>
  );

  const nextBtn = screen.getByTestId('nextBtn');
  const prevBtn = screen.getByTestId('prevBtn');
  const pagination = screen.getByTestId('pagination');

  expect(pagination).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(prevBtn).toBeInTheDocument();
  expect(mockRouter.query).toEqual({ page: '1', limit: '10' });

  fireEvent.click(nextBtn);
  expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
  fireEvent.click(nextBtn);
  expect(mockRouter.query).toEqual({ page: '3', limit: '10' });
  fireEvent.click(prevBtn);
  expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
});
