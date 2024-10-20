import { Table } from '@tanstack/react-table';
import { CMSTableFiltersConfig } from '../cms-table-filters';
import { CMSDesktopTableFilterTrigger } from './cms-desktop-table-filter-trigger';

export function CMSDesktopTableFilters<TData>(
  props: CMSDesktopTableFiltersProps<TData>
) {
  const { table, filters } = props;

  return (
    <section className='space-y-4'>
      <header>
        <h3 className='leading-none text-xl font-semibold'>Filtry</h3>
        <p className='text-muted-foreground text-sm'>
          Użyj poniższych filtrów, aby zawęzić wyniki w tabeli
        </p>
      </header>

      <ul className='flex gap-x-2'>
        {table.getHeaderGroups().map(({ headers }) =>
          headers
            .filter(({ column }) => column.getCanFilter())
            .map(({ id, column, getContext }) => {
              if (column.id in filters === false) {
                throw new Error(
                  `Column with id: ${column.id} did not receive a filter form, but was marked as filterable.`
                );
              }

              const filterForm = filters[column.id] as JSX.Element;

              return (
                <li key={id}>
                  <CMSDesktopTableFilterTrigger
                    column={column}
                    headerContext={getContext()}
                  >
                    {filterForm}
                  </CMSDesktopTableFilterTrigger>
                </li>
              );
            })
        )}
      </ul>
    </section>
  );
}

export type CMSDesktopTableFiltersProps<TData> = {
  table: Table<TData>;
  filters: CMSTableFiltersConfig;
};
