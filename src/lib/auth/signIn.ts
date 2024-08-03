import { getSupabase } from '@/lib/supabase/init';

/**
 * Signs in the user with email and password
 * @param email Email
 * @param password Password
 * @returns Promise with user data
 */
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
