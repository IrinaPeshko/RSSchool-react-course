import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '@/pages/404';
import { describe, expect, test } from 'vitest';

describe('404 Page', () => {
  test('should display the 404 error message', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/404 - Not found page/i);
    expect(heading).toBeInTheDocument();
  });
});
