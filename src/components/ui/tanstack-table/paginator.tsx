import { Table } from '@tanstack/react-table';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { TanStackTablePageSizeSelect } from './page-size-select';
import { TanStackTablePaginatorButton } from './paginator-button';
import { TanStackTablePaginatorContent } from './paginator-content';
import { TanStackTablePaginatorItem } from './paginator-item';
import { TanStackTablePaginatorPageIndex } from './paginator-page-index';

const PAGE_SIZE_OPTIONS = new Set([10, 25, 50, 100]);

export function TanStackTablePaginator<TData>(
  props: TanStackTablePaginatorProps<TData> & ComponentProps<'div'>
) {
  const { table, className, ...otherProps } = props;

  return (
    <div className={twMerge(className, 'flex justify-center')} {...otherProps}>
      <nav aria-label='pagination'>
        <TanStackTablePaginatorContent className='flex gap-x-2 justify-center items-center'>
          <TanStackTablePaginatorItem>
            <TanStackTablePaginatorButton
              aria-label='Poprzednia strona'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className='mr-2' />
            </TanStackTablePaginatorButton>
          </TanStackTablePaginatorItem>

          <TanStackTablePaginatorItem>
            <TanStackTablePaginatorButton
              aria-label='Pierwsza strona'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
            >
              <ChevronFirst className='mr-2' />
            </TanStackTablePaginatorButton>
          </TanStackTablePaginatorItem>

          <span className='text-muted-foreground text-sm'>
            Strona{' '}
            <TanStackTablePaginatorPageIndex pageCount={table.getPageCount()}>
              {table.getState().pagination.pageIndex + 1}
            </TanStackTablePaginatorPageIndex>{' '}
            z {table.getPageCount()}
          </span>

          <TanStackTablePaginatorItem>
            <TanStackTablePaginatorButton
              aria-label='Ostatnia strona'
              disabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
            >
              <ChevronLast />
            </TanStackTablePaginatorButton>
          </TanStackTablePaginatorItem>

          <TanStackTablePaginatorItem>
            <TanStackTablePaginatorButton
              aria-label='Następna stron'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight />
            </TanStackTablePaginatorButton>
          </TanStackTablePaginatorItem>
        </TanStackTablePaginatorContent>
      </nav>

      <TanStackTablePageSizeSelect table={table} options={PAGE_SIZE_OPTIONS} />
    </div>
  );
}

export type TanStackTablePaginatorProps<TData> = {
  table: Table<TData>;
};
