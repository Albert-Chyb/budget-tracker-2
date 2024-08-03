import { AuthChangeEvent, User } from '@supabase/supabase-js';
import { onAuthChange } from './onAuthChange';

let prevUserId: string | null = null;

/**
 * Allows to listen on changes to the user object
 * @returns An unsubscribe function
 */

export function onUserChange(
  cb: (user: User | null, eventName: AuthChangeEvent) => void
) {
  return onAuthChange((eventName, session) => {
    const currentUserId: string | null = session?.user.id ?? null;

    if (prevUserId !== currentUserId || eventName === 'USER_UPDATED') {
      prevUserId = currentUserId;
      cb(session?.user ?? null, eventName);
    }
  });
}
