import { spellsRequest } from './spellsRequest';

export const initialState = {
  cardsSlice: {
    cards: spellsRequest,
  },
  isLoading: {
    isDetailsLoading: false,
    isMainLoading: false,
  },
  queryParamsReducer: {
    searchParams: '',
    limit: '10',
    page: '1',
    isNextPage: true,
    isLoading: false,
    error: '',
  },
};
