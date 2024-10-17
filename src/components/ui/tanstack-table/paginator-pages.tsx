import { Table } from '@tanstack/react-table';
import { TanStackTablePaginatorButton } from './paginator-button';
import { TanStackTablePaginatorItem } from './paginator-item';
import { TanStackTablePaginatorPageIndex } from './paginator-page-index';
import { TanStackTablePaginatorPlaceholderBtn } from './paginator-placeholder-button';

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

export function TanStackTablePaginatorPagesButtons<TData>({
  table,
  leftCount,
  rightCount,
}: TanStackTablePaginatorPagesProps<TData>) {
  const visibleIndexes = generateVisibleButtonsIndexes(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
    leftCount,
    rightCount
  );

  return visibleIndexes.map(({ index, isPlaceholder }) => {
    if (isPlaceholder) {
      return (
        <TanStackTablePaginatorPlaceholderBtn key={index}>
          <TanStackTablePaginatorPageIndex pageCount={table.getPageCount()} />
        </TanStackTablePaginatorPlaceholderBtn>
      );
    }

    return (
      <TanStackTablePaginatorItem key={index}>
        <TanStackTablePaginatorButton
          onClick={() => table.setPageIndex(index)}
          aria-label={`Strona ${index + 1}`}
          isActive={table.getState().pagination.pageIndex === index}
          aria-current={
            table.getState().pagination.pageIndex === index ? 'page' : undefined
          }
        >
          <TanStackTablePaginatorPageIndex pageCount={table.getPageCount()}>
            {index + 1}
          </TanStackTablePaginatorPageIndex>
        </TanStackTablePaginatorButton>
      </TanStackTablePaginatorItem>
    );
  });
}
type TanStackTablePaginatorPagesProps<TData> = {
  table: Table<TData>;
  leftCount: number;
  rightCount: number;
};
