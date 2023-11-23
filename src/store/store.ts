import { SpellsApi } from '../store/api/SpellsApi';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import queryParamsReducer from './reducers/queryParams';
import isLoading from './reducers/isLoading';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  [SpellsApi.reducerPath]: SpellsApi.reducer,
  queryParamsReducer,
  isLoading,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SpellsApi.middleware),
});
const makeStore: MakeStore<AppStore> = () => store;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
