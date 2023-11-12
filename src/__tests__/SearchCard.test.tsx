import { act, render, screen } from '@testing-library/react';
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

describe('Tests for the SearchCard component', () => {
  const propsToCard = {
    name: 'Age Line',
    effect:
      'Prevents people above or below a certain age from access to a target',
    image:
      'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
    category: 'Charm',
    light: 'Blue',
    id: 'ef7c3503-8dea-41b2-8755-f9424ba7645e',
  };

  afterEach(() => {
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
    vi.mock('../api/api', () => {
      return {
        findSpells: vi.fn(async () => {
          // console.log(searchWord, limit, page);
          return fakeDataCards;
        }),
      };
    });
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
    screen.debug();
  });
});
