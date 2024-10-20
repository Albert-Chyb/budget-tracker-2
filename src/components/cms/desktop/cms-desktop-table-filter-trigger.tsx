import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Column, flexRender, HeaderContext } from '@tanstack/react-table';
import { PropsWithChildren } from 'react';
import { CMSTableFilterContext } from '../cms-table-filters';

export function CMSDesktopTableFilterTrigger<TData>(
  props: CMSDesktopTableFilterTriggerProps<TData>
) {
  const { column, headerContext, children } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type='button' variant='outline'>
          Filtruj kolumnę: {flexRender(column.columnDef.header, headerContext)}
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
  );
}

export type CMSDesktopTableFilterTriggerProps<TData> = PropsWithChildren<{
  column: Column<TData>;
  headerContext: HeaderContext<TData, unknown>;
}>;
