import CMS from '@/components/cms/cms';
import { TCategory } from '@/lib/db-schemas/category';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { categoriesPageTableColsFactory } from './categories-page.columns';
import {
  CMSCategoryCreateForm,
  CMSCategoryMobileItem,
} from './categories-page.layout';
import { useCategoriesPageResolver } from './categories-page.resolver';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const resolver = useCategoriesPageResolver();

  const categories = resolver.data.categories;

  const mobileCategoriesItems = categories.map((category) => (
    <CMSCategoryMobileItem
      category={category}
      resolver={resolver}
      key={category.id}
    />
  ));

  const columns = useMemo(
    () => categoriesPageTableColsFactory(resolver),
    [resolver]
  );

  const table = useReactTable<TCategory>({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CMS
      isLoading={resolver.isLoading}
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      table={table}
      newItemEditor={{
        id: 'editor',
        content: <CMSCategoryCreateForm resolver={resolver} />,
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
