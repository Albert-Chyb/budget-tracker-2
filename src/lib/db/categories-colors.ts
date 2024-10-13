import { useQuery } from '@tanstack/react-query';
import { categoryColorsSchema } from '../db-schemas/category-colors';
import { getSupabase } from '../supabase/init';

export async function getCategoriesColors() {
  const supabase = getSupabase();
  const { data: colors, error } = await supabase
    .from('categories_colors')
    .select('colorId, name, rgb')
    .order('name');

  if (error) {
    throw error;
  }

  return colors.map((color) => categoryColorsSchema.parse(color));
}

export function useCategoriesColorsQuery() {
  return useQuery({
    queryKey: ['categories-colors'],
    queryFn: () => getCategoriesColors(),
  });
}
