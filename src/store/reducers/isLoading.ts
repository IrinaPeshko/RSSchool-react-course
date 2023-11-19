import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isDetailsLoading: false,
  isMainLoading: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isDetailsLoading = action.payload;
    },
    setIsMainLoading(state, action: PayloadAction<boolean>) {
      state.isMainLoading = action.payload;
    },
  },
});

export default isLoadingSlice.reducer;

export const { setIsDetailsLoading, setIsMainLoading } = isLoadingSlice.actions;
