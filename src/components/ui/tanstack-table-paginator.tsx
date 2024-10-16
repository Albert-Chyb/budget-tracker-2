import { Table } from '@tanstack/react-table';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ComponentProps, PropsWithChildren } from 'react';
import { Button, buttonVariants } from './button';

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
}: TanstackTablePaginatorPagesProps<TData>) {
  const visibleIndexes = generateVisibleButtonsIndexes(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
    1,
    3
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
};

export function TanstackTablePaginator<TData>(
  props: TanstackTablePaginatorProps<TData> & ComponentProps<'nav'>
) {
  const { table, ...navProps } = props;

  return (
    <nav {...navProps} aria-label='pagination'>
      <TanstackTablePaginatorContent className='flex gap-x-2 justify-center'>
        <TanstackTablePaginatorItem>
          <TanstackTablePaginatorButton
            aria-label='Poprzednia strona'
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className='mr-2' />
            Poprzednia
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

        <TanstackTablePaginatorPages table={table} />

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
            Następna
            <ChevronRight />
          </TanstackTablePaginatorButton>
        </TanstackTablePaginatorItem>
      </TanstackTablePaginatorContent>
    </nav>
  );
}

export type TanstackTablePaginatorProps<TData> = {
  table: Table<TData>;
};
