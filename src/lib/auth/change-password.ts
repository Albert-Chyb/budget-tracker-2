import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabase } from '../supabase/init';
import { USER_QUERY_KEY } from './user';

export async function changePassword(newPassword: string) {
  const supabase = getSupabase();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}

export type ChangePasswordMutationVariables = {
  password: string;
};
export function useChangePasswordMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ password }: ChangePasswordMutationVariables) =>
      changePassword(password),
    onSuccess(updatedUser) {
      client.setQueryData(USER_QUERY_KEY, updatedUser);
      client.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
