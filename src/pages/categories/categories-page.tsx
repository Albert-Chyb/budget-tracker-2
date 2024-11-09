import CategoryForm from '@/components/categories/category-form';
import * as CMS from '@/components/cms/cms';
import { ColumnFilter } from '@/components/cms/column-filter';
import { ColumnFilters } from '@/components/cms/column-filters';
import { Editor } from '@/components/cms/editor';
import {
  CheckboxesFilterForm,
  CheckboxFilterOption,
} from '@/components/cms/filters-forms/checkboxes-filter-form';
import {
  RadioGroupFilterForm,
  RadioGroupFilterOption,
} from '@/components/cms/filters-forms/radio-group-filter-form';
import { TextFieldFilterForm } from '@/components/cms/filters-forms/text-field-filter-form';
import { Button } from '@/components/ui/button';
import { categoryTypeLabel, TCategory } from '@/lib/db-schemas/category';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Cell,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import {
  categoriesPageTableColsFactory,
  NO_COLOR_VALUE,
} from './categories-page.columns';
import {
  useCategoriesPageData,
  useCategoryCreate,
} from './categories-page.hooks';

export default function CategoriesPage() {
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
    <ColumnFilters onFiltersReset={table.resetColumnFilters}>
      <ColumnFilter column={table.getColumn('name')!} columnName={'Nazwa'}>
        <TextFieldFilterForm />
      </ColumnFilter>

      <ColumnFilter
        column={table.getColumn('type')!}
        columnName={'Typ transakcji'}
      >
        <RadioGroupFilterForm>
          <RadioGroupFilterOption value={categoryTypeLabel['income']}>
            {categoryTypeLabel['income']}
          </RadioGroupFilterOption>

          <RadioGroupFilterOption value={categoryTypeLabel['expense']}>
            {categoryTypeLabel['expense']}
          </RadioGroupFilterOption>
        </RadioGroupFilterForm>
      </ColumnFilter>

      <ColumnFilter column={table.getColumn('colorId')!} columnName={'Kolor'}>
        <CheckboxesFilterForm>
          {colorFilterOptions.map((option) => (
            <CheckboxFilterOption key={option.id} value={option.value}>
              {option.text}
            </CheckboxFilterOption>
          ))}
        </CheckboxesFilterForm>
      </ColumnFilter>
    </ColumnFilters>
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
    <CMS.Root
      isLoading={isLoading}
      isTablePending={isTableDataRefetching}
      table={table}
      filters={filters}
      mobileTitleColumnId='name'
      mobileActionsColumnId='category-actions'
      mobileCaptionBuilder={mobileCaptionBuilder}
    >
      <CMS.Header>
        <CMS.Hgroup>
          <CMS.Title>Kategorie</CMS.Title>
          <CMS.Description>
            Zarządzaj swoimi kategoriami transakcji
          </CMS.Description>
        </CMS.Hgroup>

        <Editor
          id='editor'
          title='Nowa kategoria'
          description='Po wypełnieniu formularza naciśnij przycisk Zapisz, aby stworzyć nową kategorię.'
          isDismissible={!isCreatePending}
          tooltip='Stwórz nową kategorię'
          trigger={
            <Button
              size='icon'
              variant='ghost'
              aria-label='Dodaj nową kategorie'
            >
              <Plus className='size-6' />
            </Button>
          }
          content={
            <CategoryForm
              colors={categoriesColors}
              onSubmit={(value) => createCategory(value)}
              isLoading={isCreatePending}
            />
          }
        />
      </CMS.Header>
    </CMS.Root>
  );
}
