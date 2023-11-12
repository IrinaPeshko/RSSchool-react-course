import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

test('Make sure the component updates URL query parameter when page changes', () => {
  const setPageMock = vi.fn();
  render(<Pagination page="2" setPage={setPageMock} isNextPageActive={true} />);
  const nextButton = screen.getByText('next');
  fireEvent.click(nextButton);
  expect(setPageMock).toBeCalledWith('3');
});
