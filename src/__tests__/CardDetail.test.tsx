import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { routes } from '../router/router';
import { fakeData } from './fakeData/fakeData';

describe('Detailed card tests', () => {
  beforeEach(() => {
    vi.mock('../api/api', () => {
      return {
        getSpell: vi.fn(async () => {
          return fakeData;
        }),
        findSpells: vi.fn(async () => {
          return fakeData;
        }),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
    });

    await act(async () => render(<RouterProvider router={router} />));
    const nameSpell = screen.getByText(fakeData.data.attributes.name);
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
    expect(cardImage.getAttribute('src')).toBe(fakeData.data.attributes.image);
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));

    const closeDetailsBtn = screen.getByTestId('closeDetails');
    fireEvent.click(closeDetailsBtn);

    const nameSpell = screen.queryByText(fakeData.data.attributes.name);
    expect(nameSpell).toBeFalsy();
    const cardEffect = screen.queryByText((content) => {
      return content.includes(fakeData.data.attributes.effect);
    });
    expect(cardEffect).toBeFalsy();
    const cardCategory = screen.queryByText((content) => {
      return content.includes(fakeData.data.attributes.category);
    });
    expect(cardCategory).toBeFalsy();
    const cardLight = screen.queryByText((content) => {
      return content.includes(fakeData.data.attributes.light);
    });
    expect(cardLight).toBeFalsy();
  });

  // test('Check that a loading indicator is displayed while fetching data', async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ['/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41'],
  //     initialIndex: 1,
  //   });

  //   await act(async () => render(<RouterProvider router={router} />));

  //   // Ensure that the loading indicator is displayed.
  //   const loadingElement = screen.getByTestId('DetailedLoadingBlock');
  //   expect(loadingElement).toBeTruthy();
  //   screen.debug()
  // });
});
