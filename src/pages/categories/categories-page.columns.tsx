import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import { createColumnHelper } from '@tanstack/react-table';
import { CMSCategoryActions } from './categories-page.layout';

const columnBuilder = createColumnHelper<TCategory>();

export const categoriesPageTableColumnsFactory = (colors: TCategoryColor[]) => [
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
      <CMSCategoryActions category={row.original} colors={colors} />
    ),
  }),
];
