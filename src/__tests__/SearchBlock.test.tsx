import SearchBlock from '@/components/search-block/SearchBlock';
import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import React from 'react';
import { expect, test, vi } from 'vitest';

vi.mock('next/router', () => require('next-router-mock'));

test('Search Block with different value', async () => {
  mockRouter.setCurrentUrl('/?page=1&limit=10');
  render(
    <RouterContext.Provider value={mockRouter}>
      <SearchBlock />
    </RouterContext.Provider>
  );

  const searchInput = screen.getByTestId('searchInput');
  const searchBtn = screen.getByTestId('searchBtn');
  const value = searchInput.getAttribute('value');
  const img = screen.getByAltText('magnifier-glass');

  expect(searchInput).toBeInstanceOf(HTMLInputElement);
  expect(searchInput).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(value).toBe('');
  expect(mockRouter.query).toEqual({ page: '1', limit: '10' });

  fireEvent.change(searchInput, { target: { value: 'ce' } });
  fireEvent.click(searchBtn);

  expect(mockRouter.query).toEqual({ page: '1', limit: '10', search: 'ce' });
  fireEvent.change(searchInput, { target: { value: '' } });
  fireEvent.click(searchBtn);
  expect(mockRouter.query).toEqual({ page: '1', limit: '10' });
});
