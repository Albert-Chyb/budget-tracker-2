import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Cell, flexRender, Header } from '@tanstack/react-table';

export const CMSMobileCardEntry = <TData,>(
  props: CMSMobileCardEntryProps<TData>
) => {
  const { cell, header } = props;

  return (
    <TableRow>
      <TableHead>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableHead>

      <TableCell>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    </TableRow>
  );
};

export type CMSMobileCardEntryProps<TData> = {
  header: Header<TData, unknown>;
  cell: Cell<TData, unknown>;
};
