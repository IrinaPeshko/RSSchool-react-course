import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransformedSpellsRequest } from '../../types/requests-types';

const initialState: { cards: TransformedSpellsRequest | undefined } = {
  cards: {
    spells: [],
    page: '1',
    countOfAllItem: '',
    isNextPage: true,
  },
};

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setCards(
      state,
      action: PayloadAction<TransformedSpellsRequest | undefined>
    ) {
      state.cards = action.payload;
    },
  },
});

export default cardsSlice.reducer;
export const { setCards } = cardsSlice.actions;
