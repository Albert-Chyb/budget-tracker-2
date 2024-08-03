import { getSupabase } from '@/lib/supabase/init';

/**
 * Signs out the user
 */
export async function signOut() {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
