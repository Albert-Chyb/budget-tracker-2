import { getSupabase } from '@/lib/supabase/init';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from './user';

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

export type SignInMutationVariables = {
  email: string;
  password: string;
};

export function useSignInMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: SignInMutationVariables) =>
      signIn(email, password),

    onSuccess(user) {
      client.setQueryData(USER_QUERY_KEY, user);
      client.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
