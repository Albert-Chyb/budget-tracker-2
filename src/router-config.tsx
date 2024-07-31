import { AuthRouteGuard } from '@lib/routes/auth-route-guard';
import ErrorPage from '@pages/ErrorPage';
import NotFoundPage from '@pages/NotFoundPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
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
        element: (
          <AuthRouteGuard
            redirectTo='/'
            canAccess={({ isSignOut }) => isSignOut}
          >
            <SignUpPage />
          </AuthRouteGuard>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <AuthRouteGuard
            redirectTo='/'
            canAccess={({ isSignOut }) => isSignOut}
          >
            <SignInPage />
          </AuthRouteGuard>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <AuthRouteGuard
            redirectTo='/'
            canAccess={({ isSignOut }) => isSignOut}
          >
            <ResetPasswordPage />
          </AuthRouteGuard>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
