import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEnsuredUser } from '../auth/get-user';
import {
  categorySchema,
  createCategorySchema,
  TCategory,
  TCreateCategory,
  TUpdateCategory,
  updateCategorySchema,
} from '../db-schemas/category';
import { getSupabase } from '../supabase/init';

export async function getCategories(): Promise<TCategory[]> {
  const supabase = getSupabase();
  const user = await getEnsuredUser();
  const { data: categories, error } = await supabase
    .from('transactions_categories')
    .select('id, name, type, colorId')
    .eq('ownerId', user.id)
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return categories.map((category) => categorySchema.parse(category));
}

export async function createCategory(category: TCreateCategory) {
  const supabase = getSupabase();
  const user = await getEnsuredUser();

  const { error } = await supabase.from('transactions_categories').insert({
    ...createCategorySchema.parse(category),
    ownerId: user.id,
  });

  if (error) {
    throw error;
  }
}

export async function updateCategory(
  id: TCategory['id'],
  category: TUpdateCategory
) {
  const supabase = getSupabase();
  const user = await getEnsuredUser();

  const { error } = await supabase
    .from('transactions_categories')
    .update(updateCategorySchema.parse(category))
    .eq('ownerId', user.id)
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function deleteCategory(id: TCategory['id']) {
  const supabase = getSupabase();
  const user = await getEnsuredUser();

  const { error } = await supabase
    .from('transactions_categories')
    .delete()
    .eq('ownerId', user.id)
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}

export type CategoryCreateMutationVariables = {
  category: TCreateCategory;
};

export function useCategoryCreateMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ category }: CategoryCreateMutationVariables) =>
      createCategory(category),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export type CategoryUpdateMutationVariables = {
  id: TCategory['id'];
  category: TUpdateCategory;
};

export function useCategoryUpdateMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: CategoryUpdateMutationVariables) =>
      updateCategory(id, category),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export type CategoryDeleteMutationVariables = {
  id: TCategory['id'];
};

export function useCategoryDeleteMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: CategoryDeleteMutationVariables) => deleteCategory(id),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ['categories'],
      }),
  });
}
