import { UserContext } from '@contexts/user-context';
import {
  AuthRouteGuard,
  AuthRouteGuardProps,
} from '@lib/routes/auth-route-guard';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock,
}));

describe('AuthRouteGuard', () => {
  let renderProtectedPage: (props: AuthRouteGuardProps) => void;

  beforeEach(() => {
    renderProtectedPage = (props: AuthRouteGuardProps) =>
      render(
        <UserContext.Provider value={null}>
          <AuthRouteGuard {...props}>
            <div data-testid='protected-page'></div>
          </AuthRouteGuard>
        </UserContext.Provider>,
        { wrapper: MemoryRouter }
      );
  });

  it('should render the child route if the canAccess() function returns true', () => {
    renderProtectedPage({
      canAccess: vi.fn().mockReturnValue(true),
      redirectTo: '',
    });

    expect(screen.getByTestId('protected-page')).toBeInTheDocument();
  });

  it('should not render the protected page if the canAccess() function returns false', () => {
    renderProtectedPage({
      canAccess: vi.fn().mockReturnValue(false),
      redirectTo: '',
    });

    expect(screen.queryByTestId('protected-page')).not.toBeInTheDocument();
  });

  it('should navigate to the route specified in the redirectTo prop if the canAccess() function returns false', () => {
    const to = '/some-route';

    renderProtectedPage({
      canAccess: vi.fn().mockReturnValue(false),
      redirectTo: to,
    });

    expect(navigateMock).toHaveBeenCalledOnce();
    expect(navigateMock).toHaveBeenCalledWith(
      to,
      expect.objectContaining({
        replace: true,
      })
    );
  });

  it('should call the canAccess() function with data properly derived from the user context', () => {
    const canAccessMock = vi.fn().mockReturnValue(true);

    renderProtectedPage({
      canAccess: canAccessMock,
      redirectTo: '',
    });

    expect(canAccessMock).toHaveBeenCalledWith({
      user: null,
      isSignIn: false,
      isSignOut: true,
    });
  });
});
