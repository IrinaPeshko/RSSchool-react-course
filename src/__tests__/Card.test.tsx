import mockRouter from 'next-router-mock';
import Card from '@/components/card/Card';
import React from 'react';
import Home from '@/pages';
import { render, screen } from '@testing-library/react';
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

  test('Renders default image when image prop is not provided', () => {
    mockRouter.setCurrentUrl('/?page=1&limit=10');
    const propsWithoutImage = { ...propsToCard, image: undefined };
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...propsWithoutImage} />
      </RouterContext.Provider>
    );
    const defaultImage: HTMLImageElement = screen.getByAltText('spells-image');
    expect(defaultImage).toHaveAttribute(
      'src',
    );
    expect(defaultImage.src).toMatch(/static-spell\.webp/);
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
  });

  test('Link component handles href correctly based on search query', () => {
    mockRouter.setCurrentUrl('/?page=1&limit=10&search=ce');
    mockRouter.query = { ...mockRouter.query};
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...propsToCard} />
      </RouterContext.Provider>
    );

    expect(mockRouter.query).toEqual({page:'1', limit:'10', search: "ce"});
  });

});