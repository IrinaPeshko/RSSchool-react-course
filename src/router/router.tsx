import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import CardDetail from '../components/card-detail/CardDetail';
import NotFound from '../components/notFound/NotFound';

const router = createBrowserRouter(
  [
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
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: '/RSSchool-react-course',
  }
);

export default router;
