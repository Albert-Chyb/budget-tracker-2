import { getCategoriesColors } from '@/lib/db/categories-colors';
import { LoaderFunction } from 'react-router-dom';

export const categoriesPageLoader = (async () => {
  return {
    categoriesColors: await getCategoriesColors(),
  };
}) satisfies LoaderFunction;

export type CategoriesPageLoaderData = Awaited<
  ReturnType<typeof categoriesPageLoader>
>;
