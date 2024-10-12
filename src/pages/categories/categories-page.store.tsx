import { UserContext } from '@/contexts/user-context';
import { TCreateCategory, TUpdateCategory } from '@/lib/db-schemas/category';
import {
  useCategoriesQuery,
  useCategoryCreateMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
} from '@/lib/db/categories';
import { useCategoriesColorsQuery } from '@/lib/db/categories-colors';
import { useContext, useMemo } from 'react';

export function useCategoriesPageStore() {
  const { getTrustedUser } = useContext(UserContext);

  const { isLoading: isColorsLoading, data: categoriesColors } =
    useCategoriesColorsQuery();
  const { isLoading: isCategoriesLoading, data: categories } =
    useCategoriesQuery();

  const { id: userId } = getTrustedUser();

  return useMemo(
    () => ({
      isLoading: isColorsLoading || isCategoriesLoading,
      data: {
        categoriesColors: categoriesColors ?? [],
        categories: categories ?? [],
      },

      useCreate() {
        const { mutateAsync, isPending } = useCategoryCreateMutation();

        return {
          create(newCategory: TCreateCategory) {
            return mutateAsync({ userId, category: newCategory });
          },
          isPending,
        };
      },

      useDelete(id: number) {
        const { mutateAsync, isPending } = useCategoryDeleteMutation();

        return {
          delete() {
            return mutateAsync({ userId, id });
          },
          isPending,
        };
      },

      useUpdate(id: number) {
        const { mutateAsync, isPending } = useCategoryUpdateMutation();

        return {
          update(updatedCategory: TUpdateCategory) {
            return mutateAsync({ userId, id, category: updatedCategory });
          },
          isPending,
        };
      },
    }),
    [categories, categoriesColors, isCategoriesLoading, isColorsLoading, userId]
  );
}

export type CategoriesPageStore = ReturnType<typeof useCategoriesPageStore>;
