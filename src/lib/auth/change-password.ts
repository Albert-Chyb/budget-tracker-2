import { getSupabase } from '../supabase/init';

export async function changePassword(newPassword: string) {
  const supabase = getSupabase();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}
