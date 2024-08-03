import { getSupabase } from '@/lib/supabase/init';
import { User } from '@supabase/supabase-js';

/**
 * Creates a new account with email and password.
 * @param email Email
 * @param password Password
 * @returns Promise with user data
 */
export async function signUp(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data.user as User;
}
