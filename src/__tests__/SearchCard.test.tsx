import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchCard from '../components/search-card/SearchCard';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { routes } from '../router/router';
import { propsToCard } from './fakeData/propsToCard';
import { useGetOneSpellQuery } from '../api/reduxApi';
import { rootReducer } from '../store/store';
import { Provider } from 'react-redux';
import { ReduxApiMockType } from '../types/requests-types';
import { transformCard, transformCards } from './fakeData/fakeData';
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

  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <SearchCard {...propsToCard} />
      </MemoryRouter>
    );
    const cardName = screen.getByText(propsToCard.name);
    expect(cardName).toBeTruthy();

    const cardEffect = screen.getByText((content) => {
      return content.includes(propsToCard.effect);
    });
    expect(cardEffect).toBeTruthy();

    const cardImage = screen.getByAltText('spells-image');
    expect(cardImage.getAttribute('src')).toBe(propsToCard.image);
  });

  test('Validate that clicking on a card opens a detailed card component && Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ['?page=1&limit=5'],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );

    const cards = await screen.findAllByTestId('card');
    expect(cards).toBeTruthy();

    expect(useGetOneSpellQuery).toBeCalledTimes(0);

    await waitFor(() => {
      fireEvent.click(cards[1]);
    });

    const detailed = screen.getByTestId('detailsBlock');
    expect(detailed).toBeInTheDocument();

    const detailedCardName = screen.getByText(/light: Ice-blue/i);
    expect(detailedCardName).toBeInTheDocument();

    expect(useGetOneSpellQuery).toBeCalledTimes(1);
  });
});
