import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ErrorButton from '../components/error-button/ErrorButton';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

test('Make sure the errorButton is working', async () => {
  const spyError = vi.spyOn(console, 'error');
  spyError.mockImplementation(() => {});
  render(
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );
  const errorBtn = screen.getByTestId('errorBtn');
  await waitFor(() => fireEvent.click(errorBtn));

  expect(spyError).toHaveBeenCalled();
  screen.debug();
  expect(
    screen.getByText("Do you have a problem? I'll help you!")
  ).toBeInTheDocument();
  expect(screen.getByText('Just click here')).toBeInTheDocument();
  spyError.mockRestore();
});
