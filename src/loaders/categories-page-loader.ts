import { TCategory } from '@/lib/db-schemas/category';
import { getCategoriesColors } from '@/lib/db/categories-colors';
import { LoaderFunction } from 'react-router-dom';

const DUMMY_CATEGORIES: TCategory[] = [
  {
    id: 1,
    name: 'Paliwo',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 2,
    name: 'Codzienne zakupy',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 3,
    name: 'Elektronika',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 4,
    name: 'Kosmetyki',
    colorId: 3,
    type: 'expense',
  },
  {
    id: 5,
    name: 'Kieszonkowe',
    colorId: 3,
    type: 'income',
  },
  {
    id: 6,
    name: 'Inne',
    colorId: 3,
    type: 'expense',
  },
];

export const categoriesPageLoader = (async () => {
  return {
    categoriesColors: await getCategoriesColors(),
    categories: DUMMY_CATEGORIES,
  };
}) satisfies LoaderFunction;

export type CategoriesPageLoaderData = Awaited<
  ReturnType<typeof categoriesPageLoader>
>;
