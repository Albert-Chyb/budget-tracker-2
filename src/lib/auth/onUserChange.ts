import { AuthChangeEvent, User } from '@supabase/supabase-js';
import { onAuthChange } from './onAuthChange';

/**
 * Creates a stream that emits a value every time the user object changes.
 * @returns A function that allows registering listeners to the stream
 */

export function onUserChange() {
  let prevUserId: string | null = null;

  return (cb: (user: User | null, eventName: AuthChangeEvent) => void) => {
    return onAuthChange((eventName, session) => {
      const currentUserId: string | null = session?.user.id ?? null;

      if (prevUserId !== currentUserId || eventName === 'USER_UPDATED') {
        prevUserId = currentUserId;
        cb(session?.user ?? null, eventName);
      }
    });
  };
}
