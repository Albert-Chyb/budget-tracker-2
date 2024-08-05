import { onUserChange } from '@/lib/auth/on-user-change';
import { User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const UserContext = createContext<UserContextValue>({
  user: null,
  isInitialized: false,
});

export function UserProvider({ children }: UserContextProps) {
  const [value, setValue] = useState<UserContextValue>({
    user: null,
    isInitialized: false,
  });

  useEffect(() => {
    const unsubscribe = onUserChange((user) =>
      setValue({ user, isInitialized: true })
    );

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export type UserContextProps = PropsWithChildren<object>;
export interface UserContextValue {
  user: User | null;
  isInitialized: boolean;
}
