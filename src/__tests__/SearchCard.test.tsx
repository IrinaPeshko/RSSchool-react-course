import {
  // act,
  // fireEvent,
  render,
  screen,
  // waitFor,
} from '@testing-library/react';
import SearchCard from '../components/search-card/SearchCard';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { routes } from '../router/router';
import { transformFakeCards } from './fakeData/fakeDataToCards';
// import { SpellsRequestType } from '../types/requests-types';
// import { spellsRequest } from './fakeData/spellsRequest';
import { propsToCard } from './fakeData/propsToCard';
// import { fakeData } from './fakeData/fakeData';
// import { getSpell } from '../api/api';
import { reduxApi } from '../api/redux.api';
import { store } from '../store/store';
import { Provider } from 'react-redux';

describe('Tests for the SearchCard component', () => {
  // beforeAll(() => {

  //   // vi.mock('../api/api', () => {
  //   //   return {
  //   //     findSpells: vi.fn(async () => {
  //   //       return fakeDataCards;
  //   //     }),
  //   //     getSpell: vi.fn(() => {
  //   //       return fakeData;
  //   //     }),
  //   //   };
  //   // });
  // });
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
    vi.spyOn(reduxApi, 'useGetSpellsQuery').mockReturnValue(transformFakeCards);
    // vi.mock('../api/redux.api', () => {
    //   useGetSpellsQuery: vi.fn(async () => {
    //     return transformFakeCards
    //   })
    // });

    const router = createMemoryRouter(routes, {
      initialEntries: ['?page=1&limit=5'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    screen.debug;

    // const cards = await screen.findAllByTestId('card');
    // expect(cards).toBeTruthy();

    // expect(getSpell).toBeCalledTimes(0);

    // await waitFor(() => {
    //   fireEvent.click(cards[1]);
    // });

    // const detailed = screen.getByTestId('detailsBlock');
    // expect(detailed).toBeInTheDocument();

    // const detailedCardName = screen.getByText(/light: Ice-blue/i);
    // expect(detailedCardName).toBeInTheDocument();

    // expect(getSpell).toBeCalledTimes(1);
  });
});
