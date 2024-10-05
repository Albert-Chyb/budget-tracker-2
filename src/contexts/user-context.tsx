import { useUserQuery } from '@/lib/auth/user';
import { User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren } from 'react';

export const UserContext = createContext<UserContextValue>({
  user: null,
  isInitialized: false,
  getTrustedUser() {
    throw new Error('The user is not logged.');
  },
});

export function UserProvider({ children }: UserContextProps) {
  const { data: user, isPending } = useUserQuery();

  const value = {
    user: user ?? null,
    isInitialized: !isPending,
    getTrustedUser() {
      if (!user) {
        throw new Error('The user is not logged.');
      }

      return user;
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export type UserContextProps = PropsWithChildren;
export interface UserContextValue {
  user: User | null;
  isInitialized: boolean;

  /** Returns the user object or throws an error if there isn't one. */
  getTrustedUser(): User;
}
