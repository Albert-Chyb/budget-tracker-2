import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { FilterX } from 'lucide-react';
import { CMSTableFiltersConfig } from '../cms-table-filters';
import { CMSDesktopTableFilterTrigger } from './cms-desktop-table-filter-trigger';

export function CMSDesktopTableFilters(props: CMSDesktopTableFiltersProps) {
  const { filters, onFiltersReset } = props;

  return (
    <section>
      <VisuallyHidden.Root>
        <header>
          <h3 className='leading-none text-xl font-semibold'>Filtry</h3>
          <p className='text-muted-foreground text-sm'>
            Użyj poniższych filtrów, aby zawęzić wyniki w tabeli
          </p>
        </header>
      </VisuallyHidden.Root>

      <div className='flex'>
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

        <Button
          type='button'
          className='ml-auto'
          aria-label='Wyczyść filtry'
          size='icon'
          onClick={() => onFiltersReset()}
        >
          <FilterX className='size-5' />
        </Button>
      </div>
    </section>
  );
}

export type CMSDesktopTableFiltersProps = {
  filters: CMSTableFiltersConfig;
  onFiltersReset: () => void;
};
