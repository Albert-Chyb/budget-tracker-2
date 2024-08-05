import { UserContext } from '@/contexts/user-context';
import { User } from '@supabase/supabase-js';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { To, useNavigate } from 'react-router-dom';

export function AuthRouteGuard({
  children,
  redirectTo,
  canAccess,
}: AuthRouteGuardProps) {
  const { user, isInitialized } = useContext(UserContext);
  const navigate = useNavigate();

  const canAccessResult = canAccess({
    user,
    isSignIn: user !== null,
    isSignOut: user === null,
  });

  useEffect(() => {
    if (isInitialized && !canAccessResult) {
      navigate(redirectTo, { replace: true });
    }
  }, [canAccessResult, navigate, redirectTo, isInitialized]);

  return canAccessResult ? children : null;
}

export type CanAccessFn = (context: {
  user: User | null;
  isSignIn: boolean;
  isSignOut: boolean;
}) => boolean;

export type AuthRouteGuardProps = PropsWithChildren<{
  redirectTo: To;
  canAccess: CanAccessFn;
}>;
