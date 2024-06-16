import ErrorPage from '@pages/ErrorPage';
import NotFoundPage from '@pages/NotFoundPage';
import RootPage from '@pages/RootPage';
import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
