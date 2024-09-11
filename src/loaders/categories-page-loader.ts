import { getCategoriesColors } from '@/lib/db/categories-colors';
import { LoaderFunction } from 'react-router-dom';

export const categoryPageLoader = (async () => {
  return {
    categoriesColors: await getCategoriesColors(),
  };
}) satisfies LoaderFunction;

export type CategoriesPageLoaderData = Awaited<
  ReturnType<typeof categoryPageLoader>
>;
