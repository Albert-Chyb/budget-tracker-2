import { getSupabase } from '@/lib/supabase/init';

export async function resetPassword(email: string) {
  const supabase = getSupabase();
  const redirectUrl = new URL(`${location.origin}/change-password`);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl.href,
  });

  if (error) {
    throw error;
  }
}
