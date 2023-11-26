import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '../pages/index';
import { TransformSpellsRequest } from './_fakeData';

const mockData = {
  data: TransformSpellsRequest,
};
vi.mock('next/router', () => require('next-router-mock'));
test('Make sure the component updates URL query parameter when page changes', async () => {
  mockRouter.setCurrentUrl('/?page=1&limit=10');
  render(
    <RouterContext.Provider value={mockRouter}>
      <Home cards={mockData} />
    </RouterContext.Provider>
  );

  const nextBtn = screen.getByTestId('nextBtn');
  const prevBtn = screen.getByTestId('prevBtn');
  const pagination = screen.getByTestId('pagination');

  expect(pagination).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(prevBtn).toBeInTheDocument();
  expect(mockRouter.query).toEqual({ page: '1', limit: '10' });

  fireEvent.click(nextBtn);
  expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
  fireEvent.click(nextBtn);
  expect(mockRouter.query).toEqual({ page: '3', limit: '10' });
  fireEvent.click(prevBtn);
  expect(mockRouter.query).toEqual({ page: '2', limit: '10' });
});
