import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { useURLPaginationState } from '@/hooks/url-pagination-state';
import { TCategory } from '@/lib/db-schemas/category';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { categoriesPageTableColsFactory } from './categories-page.columns';
import { CMSCategoryMobileItem } from './categories-page.layout';
import { useCategoriesPageStore } from './categories-page.store';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const store = useCategoriesPageStore();

  const categories = store.data.categories;

  const mobileCategoriesItems = categories.map((category) => (
    <CMSCategoryMobileItem
      category={category}
      store={store}
      key={category.id}
    />
  ));

  const { create: createCategory, isPending: isCreatePending } =
    store.useCreate();

  const [pagination, setPagination] = useURLPaginationState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo(() => categoriesPageTableColsFactory(store), [store]);
  const table = useReactTable<TCategory>({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <CMS
      isLoading={store.isLoading}
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      table={table}
      newItemEditor={{
        id: 'editor',
        content: (
          <CategoryForm
            colors={store.data.categoriesColors}
            onSubmit={(value) => createCategory(value)}
            isLoading={isCreatePending}
          />
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
        isDismissible: !isCreatePending,
      }}
    />
  );
}
