import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSContext } from '@/components/cms/cms-context';
import { TCategory } from '@/lib/db-schemas/category';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { categoriesPageTableColsFactory } from './categories-page.columns';
import { CMSCategoryMobileItem } from './categories-page.layout';
import { useCategoriesPageResolver } from './categories-page.resolver';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const resolver = useCategoriesPageResolver();
  const { create, isPending: isCreatePending } = resolver.useCreate();

  const categories = resolver.data.categories;
  const categoriesColors = resolver.data.categoriesColors;

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
        content: (
          <CMSContext.Consumer>
            {({ handleEditorMutation }) => (
              <CategoryForm
                colors={categoriesColors}
                onSubmit={(value) => handleEditorMutation(create(value))}
                isLoading={isCreatePending}
              />
            )}
          </CMSContext.Consumer>
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
      }}
    />
  );
}
