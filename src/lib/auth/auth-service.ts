import { getSupabase } from '@lib/supabase/init';
import { User } from '@supabase/supabase-js';

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
