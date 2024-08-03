import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import { AuthRouteGuard } from '@lib/routes/auth-route-guard';
import ErrorPage from '@pages/ErrorPage';
import NotFoundPage from '@pages/NotFoundPage';
import RootPage from '@pages/RootPage';
import SignInPage from '@pages/auth/SignInPage';
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
