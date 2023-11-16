import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface queryParamsState {
  searchParams: string;
  limit: string;
  page: string;
  isLoading: boolean;
  error: string;
}

const initialState: queryParamsState = {
  searchParams: localStorage.getItem('inputValue') || '',
  limit: localStorage.getItem('limit') || '10',
  page: localStorage.getItem('page') || '1',
  isLoading: false,
  error: '',
};

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<string>) {
      state.limit = action.payload;
    },
    setPage(state, action: PayloadAction<string>) {
      state.page = action.payload;
    },
    setSearchParams(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
  },
});

export default queryParamsSlice.reducer;
export const { setLimit, setPage, setSearchParams } = queryParamsSlice.actions;
