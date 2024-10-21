import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSTableFiltersConfig } from '@/components/cms/cms-table-filters';
import {
  CheckboxesFilterForm,
  CheckboxesFilterFormOption,
} from '@/components/cms/filters-forms/checkboxes-filter-form';
import { RadioGroupFilterForm } from '@/components/cms/filters-forms/radio-group-filter-form';
import { TextFieldFilterForm } from '@/components/cms/filters-forms/text-field-filter-form';
import { useURLPaginationState } from '@/hooks/url-pagination-state';
import { TCategory, TCategoryType } from '@/lib/db-schemas/category';
import {
  Column,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactNode } from 'react';
import {
  categoriesPageTableColsFactory,
  NO_COLOR_VALUE,
} from './categories-page.columns';
import { CMSCategoryMobileItem } from './categories-page.layout';
import { useCategoriesPageStore } from './categories-page.store';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

const POSSIBLE_CATEGORIES_TYPES: {
  value: TCategoryType;
  text: ReactNode;
}[] = [
  {
    value: 'income',
    text: 'Przychód',
  },
  {
    value: 'expense',
    text: 'Wydatek',
  },
];

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

  const colorFilterOptions: CheckboxesFilterFormOption[] = [
    {
      value: NO_COLOR_VALUE,
      text: 'Bez koloru',
    },
    ...store.data.categoriesColors.map((color) => ({
      value: String(color.colorId),
      text: color.name,
    })),
  ];

  const { create: createCategory, isPending: isCreatePending } =
    store.useCreate();

  const [pagination, setPagination] = useURLPaginationState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = categoriesPageTableColsFactory(store);
  const table = useReactTable<TCategory>({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const filters: CMSTableFiltersConfig = [
    {
      column: table.getColumn('category-name') as Column<unknown>,
      columnName: 'Nazwa',
      form: <TextFieldFilterForm />,
    },
    {
      column: table.getColumn('category-transactions-type') as Column<unknown>,
      columnName: 'Typ transakcji',
      form: <RadioGroupFilterForm options={POSSIBLE_CATEGORIES_TYPES} />,
    },
    {
      column: table.getColumn('category-color-id') as Column<unknown>,
      columnName: 'Kolor',
      form: <CheckboxesFilterForm options={colorFilterOptions} />,
    },
  ];

  return (
    <CMS
      isLoading={store.isLoading}
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      mobileItems={mobileCategoriesItems}
      table={table}
      filters={filters}
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
