import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchParamsState {
  searchParams: string;
  isLoading: boolean;
  error: string;
};

const initialState: SearchParamsState = {
  searchParams: localStorage.getItem('inputValue') || '',
  isLoading: false,
  error: '',
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
  },
});

export default searchParamsSlice.reducer;
export const { setSearchParams } = searchParamsSlice.actions;
