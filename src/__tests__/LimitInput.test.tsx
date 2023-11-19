import { render, screen } from '@testing-library/react';
import LimitInput from '../components/limitPerPageInput/LimitInput';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/store';
import { initialState } from './fakeData/initialSliceState';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

test('Make sure that limit input is working correct', () => {
   const mockStore = configureStore({
     reducer: rootReducer,
     preloadedState: initialState,
   });

   render(
     <Provider store={mockStore}>
       <MemoryRouter>
         <LimitInput />
       </MemoryRouter>
     </Provider>
   );

  const limit = screen.getByTestId('limitInput');
  expect(limit).instanceOf(HTMLInputElement);
  expect(limit).toBeInTheDocument();
  const value = limit.getAttribute('value');
  expect(value).toBe('10');
});
