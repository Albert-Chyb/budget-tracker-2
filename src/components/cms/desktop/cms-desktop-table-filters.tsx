import { CMSTableFiltersConfig } from '../cms-table-filters';
import { CMSDesktopTableFilterTrigger } from './cms-desktop-table-filter-trigger';

export function CMSDesktopTableFilters(props: CMSDesktopTableFiltersProps) {
  const { filters } = props;

  return (
    <section className='space-y-4'>
      <header>
        <h3 className='leading-none text-xl font-semibold'>Filtry</h3>
        <p className='text-muted-foreground text-sm'>
          Użyj poniższych filtrów, aby zawęzić wyniki w tabeli
        </p>
      </header>

      <ul className='flex gap-x-2'>
        {filters.map((filter, index) => (
          <li key={index}>
            <CMSDesktopTableFilterTrigger
              column={filter.column}
              columnName={filter.columnName}
            >
              {filter.form}
            </CMSDesktopTableFilterTrigger>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type CMSDesktopTableFiltersProps = {
  filters: CMSTableFiltersConfig;
};
