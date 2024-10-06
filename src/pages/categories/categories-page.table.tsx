import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TCategory } from '@/lib/db-schemas/category';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { categoriesPageTableColumns } from './categories-page.columns';

export function CategoriesPageTable(props: CategoriesPageTableProps) {
  const { data } = props;

  const table = useReactTable({
    columns: categoriesPageTableColumns,
    getCoreRowModel: getCoreRowModel(),
    data,
  });

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
    <div className='rounded-md border'>
      <Table>
        <TableHeader>{tableHeaderRows}</TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </div>
  );
}

export type CategoriesPageTableProps = { data: TCategory[] };
