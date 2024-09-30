import { User } from '@supabase/supabase-js';
import { getSupabase } from '../supabase/init';

export async function getEnsuredUser(): Promise<User> {
  const supabase = getSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('User is not logged in !');
  }

  return user;
}
