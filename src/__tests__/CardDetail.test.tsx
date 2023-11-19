import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { transformCard, transformCards } from './fakeData/fakeData';
import { rootReducer } from '../store/store';
import { initialState } from './fakeData/initialSliceState';
import { reduxApi, useGetOneSpellQuery, useGetSpellsQuery } from '../api/reduxApi';
import { routes } from '../router/router';

type ReduxApiMockType = {
  useGetSpellsQuery: typeof useGetSpellsQuery;
  useGetOneSpellQuery: typeof useGetOneSpellQuery;
  reducer: ReturnType<typeof reduxApi.reducer>;
  reducerPath: string;
};
describe('Detailed card tests', () => {
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

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
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

    await waitFor(() => {
      const detailedBlock = screen.getByTestId('detailsBlock');
      const detailedContainer = within(detailedBlock);
      const nameSpell = detailedContainer.getByText(
        transformCard.data.response.name
      );
      expect(nameSpell).toBeTruthy();

      const cardEffect = detailedContainer.getByText((content) => {
        return content.includes(transformCard.data.response.effect);
      });
      expect(cardEffect).toBeTruthy();

      const cardCategory = detailedContainer.getByText((content) => {
        return content.includes(transformCard.data.response.category);
      });
      expect(cardCategory).toBeTruthy();
      const cardLight = detailedContainer.getByText((content) => {
        return content.includes(transformCard.data.response.light);
      });
      expect(cardLight).toBeTruthy();
      const cardImage = detailedContainer.getByAltText('spells-image');
      expect(cardImage.getAttribute('src')).toBe(
        transformCard.data.response.image
      );
    });
  });

  // test('Ensure that clicking the close button hides the component', async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
  //   });

  //   await act(async () => render(<RouterProvider router={router} />));

  //   const closeDetailsBtn = screen.getByTestId('closeDetails');
  //   fireEvent.click(closeDetailsBtn);

  //   const nameSpell = screen.queryByText(fakeData.data.attributes.name);
  //   expect(nameSpell).toBeFalsy();
  //   const cardEffect = screen.queryByText((content) => {
  //     return content.includes(fakeData.data.attributes.effect);
  //   });
  //   expect(cardEffect).toBeFalsy();
  //   const cardCategory = screen.queryByText((content) => {
  //     return content.includes(fakeData.data.attributes.category);
  //   });
  //   expect(cardCategory).toBeFalsy();
  //   const cardLight = screen.queryByText((content) => {
  //     return content.includes(fakeData.data.attributes.light);
  //   });
  //   expect(cardLight).toBeFalsy();
  // });

  // test('Check that a loading indicator is displayed while fetching data;', async () => {
  //   render(
  //     <MemoryRouter>
  //       <CardDetail />
  //     </MemoryRouter>
  //   );

  //   const spinner = screen.getByTestId('DetailedLoadingBlock');
  //   expect(spinner).toBeInTheDocument();
  // });
});
