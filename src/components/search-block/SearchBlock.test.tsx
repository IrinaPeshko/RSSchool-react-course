import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchPage from '../search-page/SearchPage';
import { BrowserRouter } from 'react-router-dom';

describe('Search component tests', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const input = screen.getByTestId('searchInput');
    const searchBtn = screen.getByTestId('searchBtn');
    fireEvent.change(input, { target: { value: 'test' } });
    screen.debug();
    fireEvent.click(searchBtn);
    await waitFor(() => {
      const localStorageValue = localStorage.getItem('inputValue');
      expect(localStorageValue).toBe('test');
    });
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', 'one');
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('searchInput').getAttribute('value')).toBe('one');
  });
});
