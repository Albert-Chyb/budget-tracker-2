import { AuthRouteGuard } from '@/lib/routes/auth-route-guard';
import { ResetPasswordPage } from '@/pages/auth/reset-password-page';
import SignInPage from '@/pages/auth/sign-in-page';
import SignUpPage from '@/pages/auth/sign-up-page';
import CategoriesPage from '@/pages/categories/categories-page';
import ErrorPage from '@/pages/error-page';
import NotFoundPage from '@/pages/not-found-page';
import RootPage from '@/pages/root-page';
import { createBrowserRouter } from 'react-router-dom';
import { categoriesPageLoader } from './loaders/categories-page-loader';
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
        path: 'categories',
        loader: categoriesPageLoader,
        element: (
          <AuthRouteGuard
            redirectTo='/sign-in'
            canAccess={({ isSignIn }) => isSignIn}
          >
            <CategoriesPage />
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
