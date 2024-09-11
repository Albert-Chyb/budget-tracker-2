import { getSupabase } from '../supabase/init';

export async function getCategoriesColors() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('categories_colors')
    .select('colorId, name, rgb');

  if (error) {
    throw error;
  }

  return data;
}
