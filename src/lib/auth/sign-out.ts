import { getSupabase } from '@/lib/supabase/init';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from './user';

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

export function useSignOutMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess() {
      client.setQueryData(USER_QUERY_KEY, null);
      client.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
