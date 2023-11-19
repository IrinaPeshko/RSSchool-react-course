import { fireEvent, render, screen } from '@testing-library/react';
import { transformCard, transformCards } from './fakeData/fakeData';
import { routes } from '../router/router';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { rootReducer } from '../store/store';
import { Provider } from 'react-redux';
import { ReduxApiMockType } from '../types/requests-types';
import { configureStore } from '@reduxjs/toolkit';
import { initialState } from './fakeData/initialSliceState';

describe('Tests for the SearchCard component', () => {
  beforeAll(() => {
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
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Make sure the component updates URL query parameter when page changes', async () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['?page=1&limit=10'],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );
    const nextBtn = screen.getByTestId('nextBtn');
    const prevBtn = screen.getByTestId('prevBtn');

    await act(() => {
      expect(router.state.location.search).toBe('?page=1&limit=10');
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toBeInTheDocument();
      expect(nextBtn).toBeInTheDocument();
      expect(prevBtn).toBeInTheDocument();
      fireEvent.click(nextBtn);
      expect(router.state.location.search).toBe('?limit=10&page=2');
    });
    await act(() => {
      fireEvent.click(nextBtn);
      expect(router.state.location.search).toBe('?limit=10&page=3');
    });
    await act(() => {
      fireEvent.click(prevBtn);
      expect(router.state.location.search).toBe('?limit=10&page=2');
    });
  });
});
