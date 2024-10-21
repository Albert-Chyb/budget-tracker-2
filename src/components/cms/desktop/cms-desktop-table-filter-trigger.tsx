import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Column } from '@tanstack/react-table';
import { CirclePlus } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { CMSTableFilterContext } from '../cms-table-filters';

export function CMSDesktopTableFilterTrigger<TData>(
  props: CMSDesktopTableFilterTriggerProps<TData>
) {
  const { column, children, columnName } = props;

  return (
    <div className='flex items-center '>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type='button'
            variant='outline'
            aria-label={`Wyświetl filtry dla kolumny: ${columnName}`}
          >
            <CirclePlus className='mr-2' />
            {columnName}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <CMSTableFilterContext.Provider
            value={{
              setFilterValue: column.setFilterValue,
              filterValue: column.getFilterValue(),
            }}
          >
            {children}
          </CMSTableFilterContext.Provider>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export type CMSDesktopTableFilterTriggerProps<TData> = PropsWithChildren<{
  column: Column<TData, unknown>;
  columnName: string;
}>;
