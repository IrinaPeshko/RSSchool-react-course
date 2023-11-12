import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SearchCard from '../components/search-card/SearchCard';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { routes } from '../router/router';
import { fakeDataCards } from './fakeData/fakeDataToCards';
import { SpellsRequestType } from '../types/requests-types';
import { spellsRequest } from './fakeData/spellsRequest';
import { SpellsRequestContext } from '../components/search-page/Contexts';
import { propsToCard } from './fakeData/propsToCard';
import { Mock } from 'vitest';

describe('Tests for the SearchCard component', () => {
  beforeAll(() => {
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeDataCards);
        },
      });
    }) as Mock;

    vi.mock('../api/api', () => {
      return {
        findSpells: vi.fn(async () => {
          return fakeDataCards;
        }),
        request: vi.fn(),
        requestObj: vi.fn(async () => {
          return fakeDataCards;
        }),
        requestArr: vi.fn(async () => {
          return fakeDataCards.data;
        }),
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
  test('Validate that clicking on a card opens a detailed card component;', async () => {
    const cardsList: SpellsRequestType = {
      spellsRequest: spellsRequest,
      setSpellsRequest: vi.fn(),
    };
    const router = createMemoryRouter(routes, {
      initialEntries: ['?page=1&limit=5'],
    });

    await act(async () =>
      render(
        <SpellsRequestContext.Provider value={cardsList}>
          <RouterProvider router={router} />
        </SpellsRequestContext.Provider>
      )
    );
    const cards = await screen.findAllByTestId('card');
    expect(cards).toBeTruthy();

    await waitFor(() => {
      fireEvent.click(cards[1]);
    });

    const detailed = screen.getByTestId('detailsBlock');
    expect(detailed).toBeInTheDocument();
  });
});
