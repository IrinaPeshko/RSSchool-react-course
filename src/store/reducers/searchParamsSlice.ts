import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchParamsState {
  searchParams: string;
  isLoading: boolean;
  error: string;
}

// interface iUser {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserState {
//   users: iUser[];
//   isLoading: boolean;
//   error: string;
//   count: number;
// }
const chooseInitialSearchParams: () => string = () => {
  const localStorageItem = localStorage.getItem('inputValue');
  return localStorageItem ? localStorageItem : '';
};
const initialState: SearchParamsState = {
  searchParams: chooseInitialSearchParams(),
  isLoading: false,
  error: '',
};
// const initialState: UserState = {
//   users: [],
//   isLoading: false,
//   error: '',
//   count: 0,
// };

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
