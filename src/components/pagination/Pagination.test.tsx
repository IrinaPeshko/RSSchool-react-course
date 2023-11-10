import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('component updates URL query parameter when page changes', () => {
  const setPageMock = vi.fn();

  render(<Pagination page="2" setPage={setPageMock} isNextPageActive={true} />);

  // Click next button
  const nextButton = screen.getByText('next');
  fireEvent.click(nextButton);

  // Expect the setPage function to be called with the new page value
  expect(setPageMock).toHaveBeenCalledWith('3');

  // Expect the localStorage to be updated with the new page value
  expect(localStorage.getItem('page')).toBe('3');
});
