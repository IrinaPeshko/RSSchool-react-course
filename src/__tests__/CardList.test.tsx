import mockRouter from 'next-router-mock';
import React from 'react';
import Home from '@/pages';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { TransformSpellsRequest } from './_fakeData';
import SearchResult from '@/components/search-results/searchResult';

describe('Tests for the CardList component', () => {
  beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Component renders the specified number of cards', () => {
    const mockData = {
      data: TransformSpellsRequest,
    };
    mockRouter.setCurrentUrl('/?page=1&limit=10');

    render(
      <RouterContext.Provider value={mockRouter}>
        <Home cards={mockData} />
      </RouterContext.Provider>
    );

    expect(screen.getAllByTestId('card').length).toBe(2);
  });

  test('An appropriate message is displayed if no cards are present', async () => {

    mockRouter.setCurrentUrl('/?page=1&limit=10');

    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResult spells={[]} />
      </RouterContext.Provider>
    );

    const errorMessage = "We couldn't find anything matching your request.";
    const isErrorTitle = screen.getByText(errorMessage);
    expect(isErrorTitle).toBeTruthy();
  });
});
