import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TanStackTablePaginator } from '@/components/ui/tanstack-table/paginator';
import { pseudoPendingIndicator } from '@/lib/utils/pseudo-pending-indicator';
import {
  flexRender,
  RowData,
  Table as TanstackTable,
} from '@tanstack/react-table';
import { CMSTableFiltersConfig } from '../cms-table-filters';
import { CMSDesktopTableFilters } from './cms-desktop-table-filters';
import { CMSTableHead } from './cms-desktop-table-head';

export function CMSDesktopTable<TData extends RowData>(
  props: CategoriesPageTableProps<TData>
) {
  const { table, filters, isPending } = props;

  const tableHeaderRows = table.getHeaderGroups().map(({ id, headers }) => (
    <TableRow key={id}>
      {headers.map((header) => (
        <CMSTableHead header={header} key={header.id} />
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

  const { className: pendingIndicatorClasses } =
    pseudoPendingIndicator(isPending);

  return (
    <>
      <CMSDesktopTableFilters
        filters={filters}
        onFiltersReset={() => table.resetColumnFilters()}
      />

      <div className='rounded-md border mt-6'>
        <Table>
          <TableHeader>{tableHeaderRows}</TableHeader>
          <TableBody className={pendingIndicatorClasses}>{tableRows}</TableBody>
        </Table>
      </div>

      <TanStackTablePaginator table={table} className='mt-6' />
    </>
  );
}

export type CategoriesPageTableProps<TData extends RowData> = {
  table: TanstackTable<TData>;
  filters: CMSTableFiltersConfig;
  isPending: boolean;
};
