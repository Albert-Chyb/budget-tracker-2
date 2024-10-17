import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TanstackTablePaginator } from '@/components/ui/tanstack-table/tanstack-table-paginator';
import {
  flexRender,
  RowData,
  Table as TanstackTable,
} from '@tanstack/react-table';
import { useMediaQuery } from '@uidotdev/usehooks';

export function CMSDesktopTable<TData extends RowData>(
  props: CategoriesPageTableProps<TData>
) {
  const { table } = props;
  const isXlBreakpoint = useMediaQuery('(min-width: 1280px) ');

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

      <TanstackTablePaginator
        table={table}
        className='mt-6'
        leftCount={isXlBreakpoint ? 1 : 0}
        rightCount={isXlBreakpoint ? 3 : 2}
      />
    </>
  );
}

export type CategoriesPageTableProps<TData extends RowData> = {
  table: TanstackTable<TData>;
};
