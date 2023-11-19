import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import SearchResult from '../components/search-results/searchResult';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { initialState } from './fakeData/initialSliceState';

describe('Tests for the CardList component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    const mockStore = configureMockStore();
    
    const cardsStore = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={cardsStore}>
          <SearchResult />
        </Provider>
      </MemoryRouter>
    );

    screen.debug;
    expect(screen.getAllByTestId('card').length).toBe(3);
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResult />
        </Provider>
      </MemoryRouter>
    );
    
    const errorMessage = "We couldn't find anything matching your request.";
    const isErrorTitle = screen.getByText(errorMessage);
    expect(isErrorTitle).toBeTruthy();
  });
});
