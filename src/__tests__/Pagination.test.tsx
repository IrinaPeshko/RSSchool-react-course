import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { fakeDataCards } from './fakeData/fakeDataToCards';
import { fakeData } from './fakeData/fakeData';
import { routes } from '../router/router';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { findSpells } from '../api/api';
import { store } from '../store/store';
import { Provider } from 'react-redux';

describe('Tests for the SearchCard component', () => {
  beforeAll(() => {
    vi.mock('../api/api', () => {
      return {
        findSpells: vi.fn(async () => {
          return fakeDataCards;
        }),
        getSpell: vi.fn(() => {
          return fakeData;
        }),
      };
    });
  });
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Make sure that API called with other number after change the page', () => {
    const setPageMock = vi.fn();
    render(<Pagination />);
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    expect(setPageMock).toBeCalledWith('3');
  });

  test('Make sure the component updates URL query parameter when page changes', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['?page=1&limit=5'],
    });

    await act(async () =>
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      )
    );
    expect(router.state.location.search).toBe('?page=3&limit=10');
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    const nextBtn = screen.getByTestId('nextBtn');
    expect(nextBtn).toBeInTheDocument();
    const prevBtn = screen.getByTestId('prevBtn');
    expect(prevBtn).toBeInTheDocument();

    expect(findSpells).toBeCalledTimes(1);

    expect(findSpells).toHaveBeenCalledWith('', '10', '3');

    await waitFor(() => {
      fireEvent.click(nextBtn);
    });

    expect(findSpells).toBeCalledTimes(2);
    expect(findSpells).toHaveBeenCalledWith('', '10', '4');
    expect(router.state.location.search).toBe('?page=4&limit=10');

    await waitFor(() => {
      fireEvent.click(prevBtn);
    });

    expect(findSpells).toBeCalledTimes(2);
    expect(findSpells).toHaveBeenCalledWith('', '10', '3');
  });
});
