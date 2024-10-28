import { CMSTableState } from '@/components/cms/types/cms-table-state';
import { NO_COLOR_VALUE } from '@/pages/categories/categories-page.columns';
import { User } from '@supabase/supabase-js';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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

export async function getCategories(userId: string, config?: CMSTableState) {
  const supabase = getSupabase();
  const query = supabase
    .from('transactions_categories')
    .select('id, name, type, colorId, color:categories_colors(*)', {
      count: 'exact',
    })
    .eq('ownerId', userId);

  if (config) {
    const {
      pagination: { pageIndex, pageSize },
      columnFilters,
      sorting,
    } = config;

    for (const columnFilter of columnFilters) {
      const { id: columnName, value: filterValue } = columnFilter;

      if (columnName === 'name') {
        query.ilike('name', `%${filterValue}%`);
      } else if (columnName === 'type') {
        query.eq('type', String(filterValue));
      } else if (columnName === 'colorId') {
        if (Array.isArray(filterValue) && filterValue.length > 0) {
          const filterValueWithoutEmptyColor = filterValue.filter(
            (v) => v !== NO_COLOR_VALUE
          );
          const filtersContainsEmptyColor =
            filterValueWithoutEmptyColor.length !== filterValue.length;

          if (filtersContainsEmptyColor) {
            query.or(
              `colorId.in.(${filterValueWithoutEmptyColor}),colorId.is.null`
            );
          } else {
            query.in('colorId', filterValueWithoutEmptyColor);
          }
        }
      }
    }

    for (const sortedColumn of sorting) {
      const { id: columnName, desc } = sortedColumn;

      query.order(columnName, { ascending: !desc });
    }

    const from = pageIndex * pageSize;
    const to = from + pageSize - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    count,
    categories: data.map((category) => categorySchema.parse(category)),
  };
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

export function useCategoriesQuery(queryConfig?: CMSTableState) {
  const { data: user } = useUserQuery();

  const serverSideTableStateQuery = useQuery({
    enabled: !!user && !!queryConfig,
    queryKey: ['categories', queryConfig],
    queryFn: () => getCategories((<User>user).id, queryConfig),
    placeholderData: keepPreviousData,
  });

  const clientSideTableStateQuery = useQuery({
    enabled: !!user && !queryConfig,
    queryKey: ['categories'],
    queryFn: () => getCategories((<User>user).id, queryConfig),
  });

  return queryConfig ? serverSideTableStateQuery : clientSideTableStateQuery;
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
