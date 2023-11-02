import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import CardDetail from '../components/card-detail/CardDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'details/:cardId',
        element: <CardDetail />,
      },
    ],
  },
]);

export default router;
