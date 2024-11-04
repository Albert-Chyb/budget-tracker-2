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

export function useCategoriesPageData() {
  const { isLoading: isColorsLoading, data: colors } =
    useCategoriesColorsQuery();

  const {
    isLoading: isCategoriesLoading,
    data: categoriesQueryResult,
    isRefetching,
  } = useCategoriesQuery();

  return {
    categoriesCount: categoriesQueryResult?.count || 0,
    categories: categoriesQueryResult?.categories ?? [],
    categoriesColors: colors ?? [],
    isLoading: isColorsLoading || isCategoriesLoading,
    isTableDataRefetching: isRefetching,
  };
}

export function useCategoryCreate() {
  const { getTrustedUser } = useContext(UserContext);
  const editor = useCMSEditorController();
  const { mutateAsync, isPending } = useCategoryCreateMutation();

  const userId = getTrustedUser().id;

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
}

export function useCategoryUpdate(id: number) {
  const { getTrustedUser } = useContext(UserContext);
  const editor = useCMSEditorController();
  const { mutateAsync, isPending } = useCategoryUpdateMutation();

  const userId = getTrustedUser().id;

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
}

export function useCategoryDelete(id: number) {
  const { getTrustedUser } = useContext(UserContext);
  const { mutateAsync, isPending } = useCategoryDeleteMutation();

  const userId = getTrustedUser().id;

  return {
    delete() {
      return mutateAsync({ userId, id });
    },
    isPending,
  };
}
