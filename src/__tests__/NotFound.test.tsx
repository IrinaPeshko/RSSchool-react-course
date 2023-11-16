import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router/router';

test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/randomlink'],
  });

  await act(async () => render(<RouterProvider router={router} />));

  const notFound = screen.getByText(/Not found/i);
  expect(notFound).toBeInTheDocument();
});
