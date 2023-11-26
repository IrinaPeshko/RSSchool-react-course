import React from 'react'; // Добавляем импорт React
import mockRouter from 'next-router-mock';
import Home from '@/pages';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { TransformSpellsRequest } from './_fakeData';
import { expect, test, vi } from 'vitest';

test('Make sure that limit input is working correct', () => {
  vi.mock('next/router', () => require('next-router-mock'));

  const mockData = {
    data: TransformSpellsRequest,
  };
  mockRouter.setCurrentUrl('/?page=1&limit=10');

  render(
    <RouterContext.Provider value={mockRouter}>
      <Home cards={mockData} />
    </RouterContext.Provider>
  );

  const limit = screen.getByTestId('limitInput');
  const acceptBtn = screen.getByTestId('limitAcceptBtn');
  const value = limit.getAttribute('value');

  expect(limit).toBeInstanceOf(HTMLInputElement);
  expect(limit).toBeInTheDocument();
  expect(value).toBe('10');
  expect(mockRouter.query).toEqual({ page: '1', limit: '10' });

  fireEvent.change(limit, { target: { value: '5' } });
  fireEvent.click(acceptBtn);

  expect(mockRouter.query).toEqual({ page: '1', limit: '5' });
});
