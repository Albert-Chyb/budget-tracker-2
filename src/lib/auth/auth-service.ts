import { getSupabase } from '@lib/supabase/init';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

export async function signUp(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data.user as User;
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data.user;
}

export async function signOut() {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export function onAuthChange(
  cb: (eventName: AuthChangeEvent, session: Session | null) => void
) {
  const supabase = getSupabase();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(cb);

  return subscription.unsubscribe;
}

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
