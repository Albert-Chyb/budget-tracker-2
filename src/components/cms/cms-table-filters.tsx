import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Updater } from '@tanstack/react-table';
import { FilterX } from 'lucide-react';
import { createContext, PropsWithChildren } from 'react';
import { Button } from '../ui/button';

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
  const { onFiltersReset, children } = props;

  return (
    <section className='flex'>
      <ul className='flex gap-x-2' aria-label='Lista filtrów'>
        {children}
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

export type CMSTableFiltersProps = PropsWithChildren<{
  onFiltersReset: () => void;
}>;
