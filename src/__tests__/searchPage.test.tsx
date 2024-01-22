import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router/router';
import { act, render } from '@testing-library/react';
import { findSpells } from '../api/api';

describe('Search page tests', () => {
  beforeEach(() => {
    vi.mock('../api/api', () => {
      return {
        findSpells: vi.fn(async () => {}),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks(), vi.resetAllMocks();
  });

  test('Visuall all page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=1&limit=5'],

      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));
    expect(findSpells).toBeCalledTimes(1);
  });
});
