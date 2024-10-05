import { QueryKey, useQuery } from '@tanstack/react-query';
import { getSupabase } from '../supabase/init';

export const USER_QUERY_KEY: QueryKey = ['user'];

export async function getUser() {
  const {
    data: { user },
    error,
  } = await getSupabase().auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

export function useUserQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => getUser(),
    staleTime: Infinity,
  });
}
