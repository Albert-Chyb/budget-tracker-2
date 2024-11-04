import CategoryForm from '@/components/categories/category-form';
import CMS from '@/components/cms/cms';
import { CMSTableFilterTrigger } from '@/components/cms/cms-table-filter-trigger';
import { CMSTableFilters } from '@/components/cms/cms-table-filters';
import {
  CheckboxesFilter,
  CheckboxFilterOption,
} from '@/components/cms/filters-forms/checkboxes-filter-form';
import {
  RadioGroupFilter,
  RadioGroupFilterOption,
} from '@/components/cms/filters-forms/radio-group-filter-form';
import { TextFieldFilterForm } from '@/components/cms/filters-forms/text-field-filter-form';
import { categoryTypeLabel, TCategory } from '@/lib/db-schemas/category';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Cell,
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  categoriesPageTableColsFactory,
  NO_COLOR_VALUE,
} from './categories-page.columns';
import {
  useCategoriesPageData,
  useCategoryCreate,
} from './categories-page.hooks';

const CATEGORIES_PAGE_TITLE = 'Kategorie';
const CATEGORIES_PAGE_DESCRIPTION = 'Zarządzaj swoimi kategoriami transakcji';

export default function CategoriesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { categories, categoriesColors, isLoading, isTableDataRefetching } =
    useCategoriesPageData();
  const { create: createCategory, isPending: isCreatePending } =
    useCategoryCreate();
  const columns = useMemo(
    () => categoriesPageTableColsFactory(categoriesColors),
    [categoriesColors]
  );
  const table = useReactTable<TCategory>({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    state: {
      pagination,
      columnFilters,
      sorting,
    },
  });

  const colorFilterOptions = [
    {
      id: NO_COLOR_VALUE,
      value: NO_COLOR_VALUE,
      text: 'Bez koloru',
    },
    ...categoriesColors.map((color) => ({
      id: color.colorId,
      value: color.name,
      text: color.name,
    })),
  ];

  const filters = (
    <CMSTableFilters onFiltersReset={table.resetColumnFilters}>
      <CMSTableFilterTrigger
        column={table.getColumn('name') as Column<unknown>}
        columnName={'Nazwa'}
      >
        <TextFieldFilterForm />
      </CMSTableFilterTrigger>

      <CMSTableFilterTrigger
        column={table.getColumn('type') as Column<unknown>}
        columnName={'Typ transakcji'}
      >
        <RadioGroupFilter>
          <RadioGroupFilterOption value={categoryTypeLabel['income']}>
            {categoryTypeLabel['income']}
          </RadioGroupFilterOption>

          <RadioGroupFilterOption value={categoryTypeLabel['expense']}>
            {categoryTypeLabel['expense']}
          </RadioGroupFilterOption>
        </RadioGroupFilter>
      </CMSTableFilterTrigger>

      <CMSTableFilterTrigger
        column={table.getColumn('colorId') as Column<unknown>}
        columnName={'Kolor'}
      >
        <CheckboxesFilter>
          {colorFilterOptions.map((option) => (
            <CheckboxFilterOption key={option.id} value={option.value}>
              {option.text}
            </CheckboxFilterOption>
          ))}
        </CheckboxesFilter>
      </CMSTableFilterTrigger>
    </CMSTableFilters>
  );

  function mobileCaptionBuilder(cell: Cell<TCategory, unknown>) {
    return (
      <>
        <VisuallyHidden>Szczegóły kategorii: </VisuallyHidden>{' '}
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </>
    );
  }

  return (
    <CMS
      isLoading={isLoading}
      isTablePending={isTableDataRefetching}
      title={CATEGORIES_PAGE_TITLE}
      description={CATEGORIES_PAGE_DESCRIPTION}
      table={table}
      filters={filters}
      newItemEditor={{
        id: 'editor',
        content: (
          <CategoryForm
            colors={categoriesColors}
            onSubmit={(value) => createCategory(value)}
            isLoading={isCreatePending}
          />
        ),
        title: 'Nowa kategoria',
        description:
          'Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.',
        isDismissible: !isCreatePending,
        tooltip: 'Stwórz nową kategorię',
      }}
      mobileTitleColumnId='name'
      mobileActionsColumnId='category-actions'
      mobileCaptionBuilder={mobileCaptionBuilder}
    />
  );
}
