import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  RowData,
  Table as TanstackTable,
} from '@tanstack/react-table';

function clampPaginationButtons(
  currentPageIndex: number,
  pagesLength: number,
  leftCount: number,
  rightCount: number
): number[] {
  return new Array(leftCount + rightCount + 1)
    .fill(currentPageIndex - leftCount)
    .map((pageIndex, index) => pageIndex + index)
    .filter((index) => index >= 0 && index < pagesLength);
}

export function CMSDesktopTable<TData extends RowData>(
  props: CategoriesPageTableProps<TData>
) {
  const { table } = props;

  const tableHeaderRows = table.getHeaderGroups().map(({ id, headers }) => (
    <TableRow key={id}>
      {headers.map((header) => (
        <TableHead key={header.id}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
      ))}
    </TableRow>
  ));

  const tableRows = table.getRowModel().rows.map((row) => (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>{tableHeaderRows}</TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>

      <div className='flex gap-x-2'>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Poprzednia
        </button>

        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.firstPage()}
        >
          Pierwsza
        </button>

        {clampPaginationButtons(
          table.getState().pagination.pageIndex,
          table.getPageCount(),
          1,
          3
        ).map((index) => {
          return (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={
                table.getState().pagination.pageIndex === index
                  ? 'border-red-500 border-2'
                  : ''
              }
            >
              {index + 1}
            </button>
          );
        })}

        <select
          style={{ colorScheme: 'dark' }}
          name='page-size'
          value={table.getState().pagination.pageSize}
          onChange={($event) => table.setPageSize(Number($event.target.value))}
        >
          <option value='1'>1</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
        </select>

        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.lastPage()}
        >
          Ostatnia
        </button>

        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Następna
        </button>
      </div>
    </>
  );
}

export type CategoriesPageTableProps<TData extends RowData> = {
  table: TanstackTable<TData>;
};
