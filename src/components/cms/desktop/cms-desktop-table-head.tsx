import { Button } from '@/components/ui/button';
import { TableHead } from '@/components/ui/table';
import { flexRender, Header } from '@tanstack/react-table';
import { ChevronsUpDown } from 'lucide-react';
import { PropsWithChildren } from 'react';

export function CMSTableHead<TData>(props: TableHeadWithSortingProps<TData>) {
  const { header } = props;

  if (header.column.getCanSort()) {
    let label: string;
    const sortDirection = header.column.getNextSortingOrder();

    if (typeof sortDirection === 'boolean') {
      label = 'Wyłącz sortowanie';
    } else if (sortDirection === 'asc') {
      label = 'Sortuj rosnąco';
    } else {
      label = 'Sortuj malejąco';
    }

    return (
      <TableHead>
        <Button
          variant='ghost'
          type='button'
          aria-label={label}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}

          <ChevronsUpDown className='ml-2 size-4' />
        </Button>
      </TableHead>
    );
  }

  return (
    <TableHead>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
}

export type TableHeadWithSortingProps<TData> = PropsWithChildren<{
  header: Header<TData, unknown>;
}>;
