import { AuthRouteGuard } from '@/lib/routes/auth-route-guard';
import ErrorPage from '@/pages/ErrorPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RootPage from '@/pages/RootPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import { createBrowserRouter } from 'react-router-dom';
import ChangePasswordPage from './pages/auth/change-password-page';

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
        path: 'change-password',
        element: (
          <AuthRouteGuard
            redirectTo='/sign-in'
            canAccess={({ isSignIn }) => isSignIn}
          >
            <ChangePasswordPage />
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
