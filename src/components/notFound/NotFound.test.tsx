import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/invalid-route']} initialIndex={0}>
      <Routes>
        <Route path="invalid-route" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
  const notFound = screen.getByText(/Not found/i);
  expect(notFound).toBeInTheDocument();
});
