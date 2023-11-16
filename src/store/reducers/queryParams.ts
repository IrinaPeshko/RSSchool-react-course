import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface queryParamsState {
  limit: string;
  page: string;
  isLoading: boolean;
  error: string;
}

const initialState: queryParamsState = {
  limit: '10',
  page: '1',
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
  },
});

export default queryParamsSlice.reducer;
export const { setLimit, setPage } = queryParamsSlice.actions;
