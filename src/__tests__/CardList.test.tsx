import { render, screen } from '@testing-library/react';
import SearchResult from '../components/search-results/searchResult';
import { SpellsRequestContext } from '../components/search-page/Contexts';
import { SpellsRequestData, SpellsRequestType } from '../types/requests-types';
import { MemoryRouter } from 'react-router-dom';

describe('Tests for the CardList component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    const spellsRequest: SpellsRequestData[] = [
      {
        attributes: {
          slug: 'age-line',
          category: 'Charm',
          creator: 'Harry Potter',
          effect:
            'Prevents people above or below a certain age from access to a target',
          hand: 'Brandish wand',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
          incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
          light: 'Blue',
          name: 'Age Line',
          wiki: 'https://harrypotter.fandom.com/wiki/Age_Line',
        },
        id: 'ef7c3503-8dea-41b2-8755-f9424ba7645e',
        links: {
          self: '/v1/spells/ef7c3503-8dea-41b2-8755-f9424ba7645e',
        },
        type: 'spell',
      },
      {
        attributes: {
          slug: 'alarte-ascendare',
          category: 'Charm',
          creator: 'Harry Potter',
          effect: 'Rockets target upward',
          hand: 'Brandish wand',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif',
          incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
          light: 'Red',
          name: 'Alarte Ascendare',
          wiki: 'https://harrypotter.fandom.com/wiki/Alarte_Ascendare',
        },
        id: '5af173e5-480a-4f51-ab6c-a6521cfa551a',
        links: {
          self: '/v1/spells/e19aca93-0144-4fd5-a8cf-d0ee156ec2ed',
        },
        type: 'spell',
      },
      {
        attributes: {
          slug: 'albus-dumbledore-s-forceful-spell',
          category: 'Spell',
          creator: 'Harry Potter',
          effect: 'Great force',
          hand: 'Flick wand',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
          incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
          light: 'None',
          name: "Albus Dumbledore's forceful spell",
          wiki: "https://harrypotter.fandom.com/wiki/Albus_Dumbledore's_forceful_spell",
        },
        id: 'e19aca93-0144-4fd5-a8cf-d0ee156ec2ed',
        links: {
          self: '/v1/spells/5af173e5-480a-4f51-ab6c-a6521cfa551a',
        },
        type: 'spell',
      },
    ];
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
