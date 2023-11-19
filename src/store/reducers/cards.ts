import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpellsRequestData } from '../../types/requests-types';

const initialState: { cards: SpellsRequestData[] | undefined } = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<SpellsRequestData[] | undefined>) {
      state.cards = action.payload;
    },
  },
});

export default cardsSlice.reducer;
export const { setCards } = cardsSlice.actions;
