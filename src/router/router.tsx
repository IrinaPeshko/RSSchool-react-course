import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import CardDetail from '../components/card-detail/CardDetail';
import NotFound from '../components/notFound/NotFound';

export const routes = [
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
];

const router = createBrowserRouter(routes, {
  basename: '/RSSchool-react-course',
});
export default router;
