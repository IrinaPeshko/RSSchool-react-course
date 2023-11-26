import React from 'react';
import mockRouter from 'next-router-mock';
import Details from '@/pages/details/[id]';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { TransformSpellsRequest, transformCard } from './_fakeData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('Detailed card tests', () => {
  beforeEach(() => {
    vi.mock('next/router', () => require('next-router-mock'));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Detailed card component correctly displays the detailed card data', async () => {
    mockRouter.setCurrentUrl(
      '/details/?f10af5f6-c6d3-48b9-b229-fee496e3ae41&page=1&limit=10'
    );

    render(
      <RouterContext.Provider value={mockRouter}>
        <Details
          spellsData={TransformSpellsRequest}
          spellData={transformCard}
        />
      </RouterContext.Provider>
    );

    const detailedBlock = screen.getByTestId('detailsBlock');
    const detailedContainer = within(detailedBlock);
    const nameSpell = detailedContainer.getByText(transformCard.response.name);
    expect(nameSpell).toBeTruthy();

    const cardEffect = detailedContainer.getByText((content) => {
      return content.includes(transformCard.response.effect);
    });
    expect(cardEffect).toBeTruthy();

    const cardCategory = detailedContainer.getByText((content) => {
      return content.includes(transformCard.response.category);
    });
    expect(cardCategory).toBeTruthy();
    const cardLight = detailedContainer.getByText((content) => {
      return content.includes(transformCard.response.light);
    });
    expect(cardLight).toBeTruthy();
    const cardImage = detailedContainer.getByAltText('spells-image');
    expect(cardImage.getAttribute('src')).toBe(transformCard.response.image);
  });

  test('Displays default image if main image is not provided', async () => {
    const spellDataWithoutImage = {
      ...transformCard,
      response: {
        ...transformCard.response,
        image: '',
      },
    };

    render(
      <RouterContext.Provider value={mockRouter}>
        <Details
          spellsData={TransformSpellsRequest}
          spellData={spellDataWithoutImage}
        />
      </RouterContext.Provider>
    );

    const defaultImage = screen.getByTestId('detailed-img');
    expect(defaultImage).toBeInTheDocument();
    expect(defaultImage.getAttribute('src')).toBe(
      'https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png'
    );
  });

  test('Clicking the close button hides the component', async () => {
    mockRouter.setCurrentUrl(
      '/details/f10af5f6-c6d3-48b9-b229-fee496e3ae41?page=1&limit=10'
    );

    render(
      <RouterContext.Provider value={mockRouter}>
        <Details
          spellsData={TransformSpellsRequest}
          spellData={transformCard}
        />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const detailedBlock = screen.getByTestId('detailsBlock');
      const closeDetailsBtn = screen.getByTestId('closeDetails');

      expect(detailedBlock).toBeInTheDocument();

      fireEvent.click(closeDetailsBtn);

      expect(mockRouter.query).toEqual(
        expect.not.objectContaining({
          id: expect.anything(),
        })
      );
    });
  });
});
