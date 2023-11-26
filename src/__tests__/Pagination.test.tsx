import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '../pages/index';
import { TransformSpellsRequest } from './fakeData';
import { act } from 'react-dom/test-utils';

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

  await act(() => {
    fireEvent.click(nextBtn);
  });

  screen.debug();

  expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
  //     expect(router.state.location.search).toBe('?limit=10&page=2');

  //   await act(() => {
  //     fireEvent.click(nextBtn);
  //     expect(router.state.location.search).toBe('?limit=10&page=3');
  //   });
  //   await act(() => {
  //     fireEvent.click(prevBtn);
  //     expect(router.state.location.search).toBe('?limit=10&page=2');
  //   });
});
// test('should be able to change the query "page"', () => {
// const { container } = render (
// <RouterContext. Provider value={createMockedRouter('1')}›
// <Link hrefaff query: ( page: '4' ) })›Page 4</Link>
// </ RouterContext.Provider>
// expect (container) .toContainHTML('<div›<a hrefs"/page/4"›Page 4‹/a></div>')

// describe('Tests for the SearchCard component', () => {
// const useRouter = vi.spyOn(require('next/router'), 'useRouter');
// let pushMock: MockedFunction<NextRouter['push']>;

// beforeEach(() => {
//   pushMock = vi.fn();
//   useRouter.mockReturnValue({
//     push: pushMock,
//   })
// });

// afterEach(() => {
//   vi.clearAllMocks();
//   vi.resetAllMocks();
// });

// test('Make sure the component updates URL query parameter when page changes', async () => {
//   const mockStore = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
//   });

//   const router = createMemoryRouter(routes, {
//     initialEntries: ['?page=1&limit=10'],
//   });

//   render(
//     <Provider store={mockStore}>
//       <RouterProvider router={router} />
//     </Provider>
//   );
//   const nextBtn = screen.getByTestId('nextBtn');
//   const prevBtn = screen.getByTestId('prevBtn');

//   await act(() => {
//     expect(router.state.location.search).toBe('?page=1&limit=10');
//     const pagination = screen.getByTestId('pagination');
//     expect(pagination).toBeInTheDocument();
//     expect(nextBtn).toBeInTheDocument();
//     expect(prevBtn).toBeInTheDocument();
//     fireEvent.click(nextBtn);
//     expect(router.state.location.search).toBe('?limit=10&page=2');
//   });
//   await act(() => {
//     fireEvent.click(nextBtn);
//     expect(router.state.location.search).toBe('?limit=10&page=3');
//   });
//   await act(() => {
//     fireEvent.click(prevBtn);
//     expect(router.state.location.search).toBe('?limit=10&page=2');
//   });
// });
// });
