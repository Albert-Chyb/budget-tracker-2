import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import { useCategoriesQuery } from '@/lib/db/categories';
import { useCategoriesColorsQuery } from '@/lib/db/categories-colors';
import { useMemo } from 'react';
import { categoriesPageTableColumnsFactory } from './categories-page.columns';

export function useCategoriesCMSQuery(): {
  isLoading: boolean;
  data: {
    categories: TCategory[];
    categoriesColors: TCategoryColor[];
  };
} {
  const { isLoading: isColorsLoading, data: categoriesColors } =
    useCategoriesColorsQuery();
  const { isLoading: isCategoriesLoading, data: categories } =
    useCategoriesQuery();

  return {
    isLoading: isColorsLoading || isCategoriesLoading,
    data: {
      categoriesColors: categoriesColors ?? [],
      categories: categories ?? [],
    },
  };
}

export function useCategoriesColumnsDef(colors: TCategoryColor[]) {
  return useMemo(() => categoriesPageTableColumnsFactory(colors), [colors]);
}
