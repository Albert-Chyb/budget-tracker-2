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
    <tr key={id}>
      {headers.map((header) => (
        <th key={header.id}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  ));

  const tableRows = table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>{tableHeaderRows}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export type CategoriesPageTableProps = { data: TCategory[] };
