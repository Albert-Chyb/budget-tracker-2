import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Column, Updater } from '@tanstack/react-table';
import { FilterX } from 'lucide-react';
import { createContext, ReactNode } from 'react';
import { Button } from '../ui/button';
import { CMSTableFilterTrigger } from './cms-table-filter-trigger';

export type CMSTableFilterConfig = {
  column: Column<unknown, unknown>;
  columnName: string;
  form: ReactNode;
};

export type CMSTableFiltersConfig = CMSTableFilterConfig[];

export type CMSTableFilterContextValue<TFilterValue> = {
  setFilterValue: (value: Updater<TFilterValue | undefined>) => void;
  filterValue: TFilterValue | undefined;
  close: () => void;
};

export const CMSTableFilterContext = createContext<
  CMSTableFilterContextValue<unknown>
>({
  setFilterValue: () => {},
  filterValue: '',
  close: () => {},
});

export const CMSTableFilters = (props: CMSTableFiltersProps) => {
  const { filters, onFiltersReset } = props;

  return (
    <section className='flex'>
      <ul className='flex gap-x-2' aria-label='Lista filtrów'>
        {filters.map((filter) => (
          <li key={filter.column.id}>
            <CMSTableFilterTrigger {...filter} />
          </li>
        ))}
      </ul>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            className='ml-auto'
            size='icon'
            onClick={() => onFiltersReset()}
          >
            <FilterX className='size-5' />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Wyczyść filtry</TooltipContent>
      </Tooltip>
    </section>
  );
};

export type CMSTableFiltersProps = {
  filters: CMSTableFiltersConfig;
  onFiltersReset: () => void;
};
