import { CategoryColorBadge } from '@/components/categories/category-color-badge';
import { CategoryTypeLabel } from '@/components/categories/category-type';
import { categoryTypeLabel, TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-colors';
import { isInArray } from '@/lib/utils/tanstack-table-filter-functions';
import { createColumnHelper } from '@tanstack/react-table';
import { CategoryActions } from './categories-page.layout';

const columnBuilder = createColumnHelper<TCategory>();

export const NO_COLOR_VALUE = '-';

export const categoriesPageTableColsFactory = (colors: TCategoryColor[]) => [
  columnBuilder.accessor('name', {
    id: 'name',
    header: 'Nazwa',
    cell: (props) => props.renderValue(),
    filterFn: 'includesString',
  }),
  columnBuilder.accessor((data) => categoryTypeLabel[data.type], {
    id: 'type',
    header: 'Typ transakcji',
    cell: (props) => {
      return <CategoryTypeLabel type={props.row.original.type} />;
    },
    filterFn: 'equals',
  }),
  columnBuilder.accessor((data) => data.color?.name ?? NO_COLOR_VALUE, {
    id: 'colorId',
    header: 'Kolor',
    cell: (props) =>
      props.row.original.color !== null ? (
        <CategoryColorBadge color={props.row.original.color} />
      ) : (
        NO_COLOR_VALUE
      ),
    filterFn: isInArray,
  }),
  columnBuilder.display({
    id: 'category-actions',
    header: 'Akcje',
    cell: ({ row }) => (
      <CategoryActions category={row.original} colors={colors} />
    ),
  }),
];
