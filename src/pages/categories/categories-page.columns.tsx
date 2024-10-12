import { TCategory } from '@/lib/db-schemas/category';
import { createColumnHelper } from '@tanstack/react-table';
import { CategoryActions } from './categories-page.layout';
import { CategoriesPageResolver } from './categories-page.resolver';

const columnBuilder = createColumnHelper<TCategory>();

export const categoriesPageTableColsFactory = (
  resolver: CategoriesPageResolver
) => [
  columnBuilder.accessor('name', {
    id: 'category-name',
    header: 'Nazwa',
    cell: (props) => props.renderValue(),
  }),
  columnBuilder.accessor('type', {
    id: 'category-transactions-type',
    header: 'Typ transakcji',
    cell: (props) => (props.getValue() === 'income' ? 'Przychód' : 'Wydatek'),
  }),
  columnBuilder.accessor('colorId', {
    id: 'category-color-id',
    header: 'Kolor',
    cell: (props) => props.renderValue(),
  }),
  columnBuilder.display({
    id: 'category-actions',
    header: 'Akcje',
    cell: ({ row }) => (
      <CategoryActions category={row.original} resolver={resolver} />
    ),
  }),
];
