import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.js';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';
import { setupStore } from './store/store';
const { increment } = userSlice.actions;
const store = setupStore();

const App: React.FC = () => {
  const { count } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment(10))}></button>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
