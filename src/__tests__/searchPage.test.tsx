import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router/router';
import { act, render } from '@testing-library/react';
import { ReduxApiMockType } from '../types/requests-types';
import { transformCard, transformCards } from './fakeData/fakeData';
import { useGetSpellsQuery } from '../api/reduxApi';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/store';
import { initialState } from './fakeData/initialSliceState';
import { Provider } from 'react-redux';

describe('Search page tests', () => {
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

  test('Visuall all page', async () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=1&limit=10'],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );

    await act(async () => render(<RouterProvider router={router} />));
    expect(useGetSpellsQuery).toBeCalledTimes(1);
  });
});
