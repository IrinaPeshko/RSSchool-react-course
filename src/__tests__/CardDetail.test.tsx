import {
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
// import thunk from 'redux-thunk';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
// import configureMockStore from 'redux-mock-store';
import { routes } from '../router/router';
import { fakeData, transformCard, transformCards } from './fakeData/fakeData';
import { reduxApi } from '../api/reduxApi';
import { Provider } from 'react-redux';
// import { initialState } from './fakeData/initialSliceState';
import { store } from '../store/store';

describe('Detailed card tests', () => {
  beforeAll(async() => {
    vi.spyOn(reduxApi, 'useGetOneSpellQuery').mockReturnValue(transformCard);
    vi.spyOn(reduxApi, 'useGetSpellsQuery').mockReturnValue(transformCards);
  });
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
    });
    //  const middlewares = [
    //    thunk,
    //    ...getDefaultMiddleware().prepend(reduxApi.middleware),
    //  ];
    //  const mockStore = configureMockStore(middlewares);
    //  const cardStore = mockStore(initialState);

    

    vi.spyOn(reduxApi, 'useGetOneSpellQuery').mockReturnValue(transformCard);

    
    await waitFor (() =>{
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      );
    })

    // render(
    //   <Provider store={store}>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path={'/'} element={<App/>} >
    //           <Route
    //             path={'/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'}
    //             element={<CardDetail />}
    //           />
    //         </Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </Provider>
    // )

    await waitFor(() => {
      screen.debug;

      const nameSpell = screen.getByText(transformCard.data.response.name);
      expect(nameSpell).toBeTruthy();
      const cardEffect = screen.getByText((content) => {
        return content.includes(fakeData.data.attributes.effect);
      });
      expect(cardEffect).toBeTruthy();
      const cardCategory = screen.getByText((content) => {
        return content.includes(fakeData.data.attributes.category);
      });
      expect(cardCategory).toBeTruthy();
      const cardLight = screen.getByText((content) => {
        return content.includes(fakeData.data.attributes.light);
      });
      expect(cardLight).toBeTruthy();
      const cardImage = screen.getByAltText('spells-image');
      expect(cardImage.getAttribute('src')).toBe(
        fakeData.data.attributes.image
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
