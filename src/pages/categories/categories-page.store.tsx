import { useCMSEditorController } from '@/components/cms/cms-editor-controller';
import { UserContext } from '@/contexts/user-context';
import { TCreateCategory, TUpdateCategory } from '@/lib/db-schemas/category';
import {
  useCategoriesQuery,
  useCategoryCreateMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
} from '@/lib/db/categories';
import { useCategoriesColorsQuery } from '@/lib/db/categories-colors';
import { useContext } from 'react';

export function useCategoriesPageStore() {
  const { getTrustedUser } = useContext(UserContext);

  const editor = useCMSEditorController();
  const { isLoading: isColorsLoading, data: categoriesColors } =
    useCategoriesColorsQuery();
  const { isLoading: isCategoriesLoading, data: categories } =
    useCategoriesQuery();

  const { id: userId } = getTrustedUser();

  return {
    isLoading: isColorsLoading || isCategoriesLoading,
    data: {
      categoriesColors: categoriesColors ?? [],
      categories: categories ?? [],
    },

    useCreate() {
      const { mutateAsync, isPending } = useCategoryCreateMutation();

      return {
        create(newCategory: TCreateCategory) {
          return mutateAsync(
            { userId, category: newCategory },
            {
              onSettled() {
                editor.close();
              },
            }
          );
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
          return mutateAsync(
            { userId, id, category: updatedCategory },
            {
              onSettled() {
                editor.close();
              },
            }
          );
        },
        isPending,
      };
    },
  };
}

export type CategoriesPageStore = ReturnType<typeof useCategoriesPageStore>;
