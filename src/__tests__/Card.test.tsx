import mockRouter from 'next-router-mock';
import Card from '@/components/card/Card';
import React from 'react';
import Home from '@/pages';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { TransformSpellsRequest, propsToCard } from './_fakeData';

describe('Tests for the Card component', () => {
  beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Ensure that the card component renders the relevant card data', () => {
    mockRouter.setCurrentUrl('/?page=1&limit=10');

    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...propsToCard} />
      </RouterContext.Provider>
    );

    const cardName = screen.getByText(propsToCard.name);
    const cardEffect = screen.getByText((content) => {
      return content.includes(propsToCard.effect);
    });
    const cardImage = screen.getByAltText('spells-image');

    expect(cardName).toBeTruthy();
    expect(cardEffect).toBeTruthy();
    expect(cardImage.getAttribute('src')).toBe(propsToCard.image);
  });

  test('Validate that clicking on a card opens a detailed card component && Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    const mockData = {
      data: TransformSpellsRequest,
    };
    mockRouter.setCurrentUrl('/?page=1&limit=10');

    render(
      <RouterContext.Provider value={mockRouter}>
        <Home cards={mockData} />
      </RouterContext.Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toBeTruthy();

    expect(mockRouter.query).toEqual(
      expect.not.objectContaining({
        id: expect.anything(),
      })
    );

    await waitFor(() => {
      fireEvent.click(cards[0]);
    });
    setTimeout(() => {
      const detailed = screen.getByTestId('detailsBlock');
      expect(detailed).toBeInTheDocument();

      const detailedCardName = screen.getByText(/light: Ice-blue/i);
      expect(detailedCardName).toBeInTheDocument();
      screen.debug();
    }, 100);

    expect(mockRouter.query).toEqual(
      expect.objectContaining({
        id: 'f10af5f6-c6d3-48b9-b229-fee496e3ae41',
      })
    );
  });
});
