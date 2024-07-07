import { getSupabase } from '@lib/supabase/init';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

/**
 * Registers a listener that is called every time an auth event is fired.
 * @param cb Callback function
 * @returns Unsubscribe function
 */
export function onAuthChange(
  cb: (eventName: AuthChangeEvent, session: Session | null) => void
) {
  const supabase = getSupabase();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(cb);

  return subscription.unsubscribe;
}
