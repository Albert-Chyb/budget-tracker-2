import { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserQuery } from '../auth/user';
import {
  categorySchema,
  createCategorySchema,
  TCategory,
  TCreateCategory,
  TUpdateCategory,
  updateCategorySchema,
} from '../db-schemas/category';
import { getSupabase } from '../supabase/init';

export async function getCategories(userId: string): Promise<TCategory[]> {
  const supabase = getSupabase();
  const { data: categories, error } = await supabase
    .from('transactions_categories')
    .select('id, name, type, colorId')
    .eq('ownerId', userId)
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return categories.map((category) => categorySchema.parse(category));
}

export async function createCategory(
  userId: string,
  category: TCreateCategory
) {
  const supabase = getSupabase();

  const { error } = await supabase.from('transactions_categories').insert({
    ...createCategorySchema.parse(category),
    ownerId: userId,
  });

  if (error) {
    throw error;
  }
}

export async function updateCategory(
  id: TCategory['id'],
  userId: string,
  category: TUpdateCategory
) {
  const supabase = getSupabase();

  const { error } = await supabase
    .from('transactions_categories')
    .update(updateCategorySchema.parse(category))
    .eq('ownerId', userId)
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function deleteCategory(id: TCategory['id'], userId: string) {
  const supabase = getSupabase();

  const { error } = await supabase
    .from('transactions_categories')
    .delete()
    .eq('ownerId', userId)
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export function useCategoriesQuery() {
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: ['categories'],
    queryFn: () => getCategories((<User>user).id),
  });
}

export type CategoryCreateMutationVariables = {
  userId: string;
  category: TCreateCategory;
};

export function useCategoryCreateMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ category, userId }: CategoryCreateMutationVariables) =>
      createCategory(userId, category),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export type CategoryUpdateMutationVariables = {
  id: TCategory['id'];
  userId: string;
  category: TUpdateCategory;
};

export function useCategoryUpdateMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category, userId }: CategoryUpdateMutationVariables) =>
      updateCategory(id, userId, category),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export type CategoryDeleteMutationVariables = {
  id: TCategory['id'];
  userId: string;
};

export function useCategoryDeleteMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: CategoryDeleteMutationVariables) =>
      deleteCategory(id, userId),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ['categories'],
      }),
  });
}
