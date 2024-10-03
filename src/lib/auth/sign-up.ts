import { getSupabase } from '@/lib/supabase/init';
import { User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from './user';

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

export type SignUpMutationVariables = {
  email: string;
  password: string;
};

export function useSignUpMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: SignUpMutationVariables) =>
      signUp(email, password),

    onSuccess(user) {
      client.setQueryData(USER_QUERY_KEY, user);
      client.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
