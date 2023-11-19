import { reduxApi } from '../api/reduxApi';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import queryParamsReducer from './reducers/queryParams';
import isLoading from './reducers/isLoading';
import cardsSlice from './reducers/cards';

export const rootReducer = combineReducers({
  [reduxApi.reducerPath]: reduxApi.reducer,
  queryParamsReducer,
  isLoading,
  cardsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
