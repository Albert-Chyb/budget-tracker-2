import { onUserChange } from '@/lib/auth/on-user-change';
import { User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onUserChange((user) => setUser(user));

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export type UserContextProps = PropsWithChildren<object>;
