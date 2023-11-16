import { render, screen } from '@testing-library/react';
import SearchResult from '../components/search-results/searchResult';
import { SpellsRequestContext } from '../components/search-page/Contexts';
import { SpellsRequestData, SpellsRequestType } from '../types/requests-types';
import { MemoryRouter } from 'react-router-dom';
import { spellsRequest } from './fakeData/spellsRequest';

describe('Tests for the CardList component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    const cardsList: SpellsRequestType = {
      spellsRequest: spellsRequest,
      setSpellsRequest: vi.fn(),
    };

    render(
      <MemoryRouter>
        <SpellsRequestContext.Provider value={cardsList}>
          <SearchResult />
        </SpellsRequestContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('card').length).toBe(3);
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    const spellsRequest: SpellsRequestData[] = [];
    const cardsList: SpellsRequestType = {
      spellsRequest: spellsRequest,
      setSpellsRequest: vi.fn(),
    };
    render(
      <MemoryRouter>
        <SpellsRequestContext.Provider value={cardsList}>
          <SearchResult />
        </SpellsRequestContext.Provider>
      </MemoryRouter>
    );

    const errorMessage = "We couldn't find anything matching your request.";
    const isErrorTitle = screen.getByText(errorMessage);
    expect(isErrorTitle).toBeTruthy();
  });
});
