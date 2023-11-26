import React from 'react';
import ErrorButton from '../components/error-button/ErrorButton';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

test('Make sure the errorButton is working', async () => {
  const spyError = vi.spyOn(console, 'error');
  render(
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );
  const errorBtn = screen.getByTestId('errorBtn');
  await waitFor(() => fireEvent.click(errorBtn));

  expect(spyError).toHaveBeenCalled();
  expect(screen.getByText('This is an example error')).toBeInTheDocument();
  expect(screen.getByText('Reset')).toBeInTheDocument();
});
