import { fireEvent, render, screen } from '@testing-library/react';
import SearchPage from '../components/search-page/SearchPage';
import { BrowserRouter } from 'react-router-dom';

describe('Search component tests', () => {
  afterEach(() => {
    localStorage.setItem('searchInput', '');
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('inputValue', 'test');
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('searchInput').getAttribute('value')).toBe(
      'test'
    );
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    const input = screen.getByTestId('searchInput');
    const searchBtn = screen.getByTestId('searchBtn');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(searchBtn);
    setTimeout(() => {
      const localStorageValue = localStorage.getItem('inputValue');
      expect(localStorageValue).toBe('test');
    }, 200);
  });
});
