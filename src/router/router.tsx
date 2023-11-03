import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import CardDetail from '../components/card-detail/CardDetail';
import { getSpell } from '../api/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'details/:cardId',
        element: <CardDetail />,
        loader: async ({ params }) => {
          if (params.cardId) {
            return getSpell(params.cardId);
          }
        },
      },
    ],
  },
]);

export default router;
