import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Cell, flexRender, Header } from '@tanstack/react-table';

export const CMSMobileCardActions = <TData,>(
  props: CMSMobileCardActions<TData>
) => {
  const { header, cell } = props;

  return (
    <TableRow>
      <TableHead aria-hidden='false' className='hidden'>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableHead>

      <TableCell colSpan={2}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    </TableRow>
  );
};

export type CMSMobileCardActions<TData> = {
  header: Header<TData, unknown>;
  cell: Cell<TData, unknown>;
};
