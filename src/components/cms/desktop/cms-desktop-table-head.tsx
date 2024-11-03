import { Button } from '@/components/ui/button';
import { TableHead } from '@/components/ui/table';
import { flexRender, Header } from '@tanstack/react-table';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, X } from 'lucide-react';
import { PropsWithChildren, ReactElement } from 'react';

export function CMSTableHead<TData>(props: TableHeadWithSortingProps<TData>) {
  const { header } = props;

  if (header.column.getCanSort()) {
    let label: string;
    let icon: ReactElement;
    const sortDirection = header.column.getNextSortingOrder();

    if (typeof sortDirection === 'boolean') {
      label = 'Wyłącz sortowanie';
      icon = <X />;
    } else if (sortDirection === 'asc') {
      label = 'Sortuj rosnąco';
      icon = <ArrowUpNarrowWide />;
    } else {
      label = 'Sortuj malejąco';
      icon = <ArrowDownWideNarrow />;
    }

    return (
      <TableHead>
        <div className='flex items-center'>
          <Button
            variant='ghost'
            type='button'
            aria-label={label}
            onClick={header.column.getToggleSortingHandler()}
            size='icon'
            className='mr-2'
          >
            {icon}
          </Button>

          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
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
