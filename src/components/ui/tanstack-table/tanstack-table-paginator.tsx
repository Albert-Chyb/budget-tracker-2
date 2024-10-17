import { Table } from '@tanstack/react-table';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, buttonVariants } from '../button';
import { TanStackPageSizeSelect } from './tanstack-page-size-select';

function generateVisibleButtonsIndexes(
  currentPageIndex: number,
  pagesLength: number,
  leftCount: number,
  rightCount: number
): { isPlaceholder: boolean; index: number }[] {
  return new Array(leftCount + rightCount + 1)
    .fill(currentPageIndex - leftCount)
    .map((pageIndex, index) => pageIndex + index)
    .map((pageIndex) => ({
      isPlaceholder: !(pageIndex >= 0 && pageIndex < pagesLength),
      index: pageIndex,
    }));
}

function TanstackTablePaginatorButton(
  props: TanstackTablePaginatorButtonProps
) {
  const { isActive, ...btnProps } = props;

  return <Button variant={isActive ? 'outline' : 'ghost'} {...btnProps} />;
}

type TanstackTablePaginatorButtonProps = {
  isActive?: boolean;
} & ComponentProps<'button'>;

function TanstackTablePaginatorPlaceholderBtn(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div
      className={buttonVariants({
        variant: 'ghost',
        className: 'pointer-events-none',
      })}
    >
      {children}
    </div>
  );
}

function TanstackTablePaginatorContent(props: ComponentProps<'ul'>) {
  return <ul {...props} />;
}

function TanstackTablePaginatorItem(props: ComponentProps<'li'>) {
  return <li {...props} />;
}

function TanstackTablePaginatorIndex(props: TanstackTablePaginatorIndexProps) {
  const { pageCount, children } = props;

  const lastIndexCharactersCount = String(pageCount).length;

  return (
    <div
      style={{ minWidth: `${lastIndexCharactersCount}ch` }}
      className='text-center'
    >
      {children}
    </div>
  );
}

type TanstackTablePaginatorIndexProps = PropsWithChildren<{
  pageCount: number;
}>;

function TanstackTablePaginatorPages<TData>({
  table,
  leftCount,
  rightCount,
}: TanstackTablePaginatorPagesProps<TData>) {
  const visibleIndexes = generateVisibleButtonsIndexes(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
    leftCount,
    rightCount
  );

  return visibleIndexes.map(({ index, isPlaceholder }) => {
    if (isPlaceholder) {
      return (
        <TanstackTablePaginatorPlaceholderBtn key={index}>
          <TanstackTablePaginatorIndex pageCount={table.getPageCount()} />
        </TanstackTablePaginatorPlaceholderBtn>
      );
    }

    return (
      <TanstackTablePaginatorItem key={index}>
        <TanstackTablePaginatorButton
          onClick={() => table.setPageIndex(index)}
          aria-label={`Strona ${index + 1}`}
          isActive={table.getState().pagination.pageIndex === index}
          aria-current={
            table.getState().pagination.pageIndex === index ? 'page' : undefined
          }
        >
          <TanstackTablePaginatorIndex pageCount={table.getPageCount()}>
            {index + 1}
          </TanstackTablePaginatorIndex>
        </TanstackTablePaginatorButton>
      </TanstackTablePaginatorItem>
    );
  });
}

type TanstackTablePaginatorPagesProps<TData> = {
  table: Table<TData>;
  leftCount: number;
  rightCount: number;
};

const PAGE_SIZE_OPTIONS = new Set([10, 25, 50, 100]);

export function TanstackTablePaginator<TData>(
  props: TanstackTablePaginatorProps<TData> & ComponentProps<'div'>
) {
  const { table, leftCount, rightCount, className, ...otherProps } = props;

  return (
    <div className={twMerge(className, 'flex justify-center')} {...otherProps}>
      <nav aria-label='pagination'>
        <TanstackTablePaginatorContent className='flex gap-x-2 justify-center'>
          <TanstackTablePaginatorItem>
            <TanstackTablePaginatorButton
              aria-label='Poprzednia strona'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className='mr-2' />
            </TanstackTablePaginatorButton>
          </TanstackTablePaginatorItem>

          <TanstackTablePaginatorItem>
            <TanstackTablePaginatorButton
              aria-label='Pierwsza strona'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
            >
              <ChevronFirst className='mr-2' />
            </TanstackTablePaginatorButton>
          </TanstackTablePaginatorItem>

          <TanstackTablePaginatorPages
            table={table}
            rightCount={rightCount}
            leftCount={leftCount}
          />

          <TanstackTablePaginatorItem>
            <TanstackTablePaginatorButton
              aria-label='Ostatnia strona'
              disabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
            >
              <ChevronLast />
            </TanstackTablePaginatorButton>
          </TanstackTablePaginatorItem>

          <TanstackTablePaginatorItem>
            <TanstackTablePaginatorButton
              aria-label='Następna stron'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight />
            </TanstackTablePaginatorButton>
          </TanstackTablePaginatorItem>
        </TanstackTablePaginatorContent>
      </nav>

      <TanStackPageSizeSelect table={table} options={PAGE_SIZE_OPTIONS} />
    </div>
  );
}

export type TanstackTablePaginatorProps<TData> = {
  table: Table<TData>;
  leftCount: number;
  rightCount: number;
};
