import { CategoryColorBadge } from '@/components/categories/category-color-badge';
import { CategoryTypeLabel } from '@/components/categories/category-type';
import { TCategory } from '@/lib/db-schemas/category';
import { createColumnHelper } from '@tanstack/react-table';
import { CategoryActions } from './categories-page.layout';
import { CategoriesPageStore } from './categories-page.store';

const columnBuilder = createColumnHelper<TCategory>();

export const categoriesPageTableColsFactory = (store: CategoriesPageStore) => [
  columnBuilder.accessor('name', {
    id: 'category-name',
    header: 'Nazwa',
    cell: (props) => props.renderValue(),
  }),
  columnBuilder.accessor('type', {
    id: 'category-transactions-type',
    header: 'Typ transakcji',
    cell: (props) => {
      const type = props.getValue();

      return <CategoryTypeLabel type={type} />;
    },
  }),
  columnBuilder.accessor((data) => data.color?.name, {
    id: 'category-color-id',
    header: 'Kolor',
    cell: (props) =>
      props.row.original.color !== null ? (
        <CategoryColorBadge color={props.row.original.color} />
      ) : (
        '-'
      ),
  }),
  columnBuilder.display({
    id: 'category-actions',
    header: 'Akcje',
    cell: ({ row }) => (
      <CategoryActions category={row.original} store={store} />
    ),
  }),
];
