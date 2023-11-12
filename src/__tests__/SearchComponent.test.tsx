import { fireEvent, render, screen } from '@testing-library/react';
import SearchPage from '../components/search-page/SearchPage';
import { BrowserRouter } from 'react-router-dom';

describe('Search component tests', () => {
  afterEach(() => {
    localStorage.setItem('searchInput', '');
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', 'test');
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('searchInput').getAttribute('value')).toBe(
      'test'
    );
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
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

  //  vi.mock('../search-page/SearchPage.tsx', async () => {
  //    const actual = await vi.importActual('../search-page/SearchPage.tsx');
  //    return {
  //      ...actual,
  //      findSpells: vi.fn(),
  //    };
  //  });
  // test('check Pagination', () => {
  //   const fakeData = [
  //        [
  //          {
  //            id: 'ef7c3503-8dea-41b2-8755-f9424ba7645e',
  //            type: 'spell',
  //            attributes: {
  //              slug: 'age-line',
  //              category: 'Charm',
  //              creator: null,
  //              effect:
  //                'Prevents people above or below a certain age from access to a target',
  //              hand: null,
  //              image:
  //                'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
  //              incantation: null,
  //              light: 'Blue',
  //              name: 'Age Line',
  //              wiki: 'https://harrypotter.fandom.com/wiki/Age_Line',
  //            },
  //            links: {
  //              self: '/v1/spells/ef7c3503-8dea-41b2-8755-f9424ba7645e',
  //            },
  //          },
  //          {
  //            id: '5af173e5-480a-4f51-ab6c-a6521cfa551a',
  //            type: 'spell',
  //            attributes: {
  //              slug: 'alarte-ascendare',
  //              category: 'Charm',
  //              creator: null,
  //              effect: 'Rockets target upward',
  //              hand: 'Brandish wand',
  //              image:
  //                'https://static.wikia.nocookie.net/harrypotter/images/c/c4/Alarte_Ascendare.gif',
  //              incantation: 'Alarte Ascendare(a-LAR-tay a-SEN-der-ay)',
  //              light: 'Red',
  //              name: 'Alarte Ascendare',
  //              wiki: 'https://harrypotter.fandom.com/wiki/Alarte_Ascendare',
  //            },
  //            links: {
  //              self: '/v1/spells/5af173e5-480a-4f51-ab6c-a6521cfa551a',
  //            },
  //          },
  //          {
  //            id: 'e19aca93-0144-4fd5-a8cf-d0ee156ec2ed',
  //            type: 'spell',
  //            attributes: {
  //              slug: 'albus-dumbledore-s-forceful-spell',
  //              category: 'Spell',
  //              creator: null,
  //              effect: 'Great force',
  //              hand: 'Flick wand',
  //              image: null,
  //              incantation: null,
  //              light: 'None',
  //              name: "Albus Dumbledore's forceful spell",
  //              wiki: "https://harrypotter.fandom.com/wiki/Albus_Dumbledore's_forceful_spell",
  //            },
  //            links: {
  //              self: '/v1/spells/e19aca93-0144-4fd5-a8cf-d0ee156ec2ed',
  //            },
  //          },
  //          {
  //            id: '6b7c784e-aeef-439d-8ee5-2ae8d74a30f1',
  //            type: 'spell',
  //            attributes: {
  //              slug: 'amplifying-charm',
  //              category: 'Charm',
  //              creator: null,
  //              effect: 'Loudens target',
  //              hand: 'Direct at target',
  //              image:
  //                'https://static.wikia.nocookie.net/harrypotter/images/2/29/Sonorous_GOF_Dumbledore_1.jpg',
  //              incantation: 'Sonorus(soh-NOHR-us)',
  //              light: 'None',
  //              name: 'Amplifying Charm',
  //              wiki: 'https://harrypotter.fandom.com/wiki/Amplifying_Charm',
  //            },
  //            links: {
  //              self: '/v1/spells/6b7c784e-aeef-439d-8ee5-2ae8d74a30f1',
  //            },
  //          },
  //          {
  //            id: '210ffa82-fc5f-4a5b-b85c-38198d9c93c0',
  //            type: 'spell',
  //            attributes: {
  //              slug: 'anapneo',
  //              category: 'Healing spell, Vanishment, Charm',
  //              creator: null,
  //              effect: "Cleared target's airway by vanishing blockages",
  //              hand: 'Point wand at target',
  //              image:
  //                'https://static.wikia.nocookie.net/harrypotter/images/2/2e/Celestina_Warbeck%27s_throat_unblocked_HM.png',
  //              incantation: 'Anapneo(ah-NAP-nee-oh)',
  //              light: null,
  //              name: 'Anapneo',
  //              wiki: 'https://harrypotter.fandom.com/wiki/Anapneo',
  //            },
  //            links: {
  //              self: '/v1/spells/210ffa82-fc5f-4a5b-b85c-38198d9c93c0',
  //            },
  //          },
  //        ],
  //      ];
  //  findSpells.mockResolvedValue({ data: fakeData });

  //   render(
  //     <BrowserRouter>
  //       <SearchPage />
  //     </BrowserRouter>
  //   );

  //   const nextButton = screen.getByText('next');
  //   fireEvent.click(nextButton)

  //   setTimeout(()=> {
  //   screen.debug();

  //   }, 1000)
  //   })
});
