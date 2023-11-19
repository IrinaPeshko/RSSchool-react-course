import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/store';
import { initialState } from './fakeData/initialSliceState';
import { routes } from '../router/router';
import { Provider } from 'react-redux';
import { ReduxApiMockType } from '../types/requests-types';
import { transformCard, transformCards } from './fakeData/fakeData';

describe('Search component tests', () => {

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

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', 'test');
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );

    screen.debug()

    expect(screen.getByTestId('searchInput').getAttribute('value')).toBe(
      'test'
    );
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );

    const input = screen.getByTestId('searchInput');
    const searchBtn = screen.getByTestId('searchBtn');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(searchBtn);
    setTimeout(() => {
      const localStorageValue = localStorage.getItem('inputValue');
      expect(localStorageValue).toBe('test');
    }, 200);
  });
});
