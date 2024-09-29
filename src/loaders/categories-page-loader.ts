import { TCategory } from '@/lib/db-schemas/category';
import { getCategoriesColors } from '@/lib/db/categories-colors';
import { defer, LoaderFunction } from 'react-router-dom';

function getDummyCategories(): Promise<TCategory[]> {
  return new Promise((resolve) =>
    resolve([
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
    ])
  );
}

async function buildDataPromise() {
  const data = await Promise.all([
    getCategoriesColors(),
    getDummyCategories(),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]);

  return {
    categoriesColors: data[0],
    categories: data[1],
  };
}

export const categoriesPageLoader = (() => {
  return defer({ data: buildDataPromise() });
}) satisfies LoaderFunction;

export type CategoriesPageLoaderData = Awaited<
  ReturnType<typeof buildDataPromise>
>;
