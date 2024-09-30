import { useQuery } from '@tanstack/react-query';
import { getEnsuredUser } from '../auth/get-user';
import { TCategory } from '../db-schemas/category';
import { getSupabase } from '../supabase/init';

export async function getCategories(): Promise<TCategory[]> {
  const supabase = getSupabase();
  const user = await getEnsuredUser();
  const { data, error } = await supabase
    .from('transactions_categories')
    .select('id, name, type, colorId')
    .eq('ownerId', user.id);

  if (error) {
    throw error;
  }

  return data;
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}
