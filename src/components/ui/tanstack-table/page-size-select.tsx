import { Label } from '@radix-ui/react-label';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

export function TanStackTablePageSizeSelect<TData>(
  props: TanStackTablePageSizeSelectProps<TData>
) {
  const { table, options } = props;

  return (
    <Label className='text-muted-foreground text-sm flex text-nowrap items-center gap-x-2'>
      Ilość wierszy na stronie:
      <Select
        value={String(table.getState().pagination.pageSize)}
        onValueChange={(newPageSize) => table.setPageSize(Number(newPageSize))}
      >
        <SelectTrigger className='max-w-44'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Array.from(options).map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
}

export type TanStackTablePageSizeSelectProps<TData> = {
  table: Table<TData>;
  options: Set<number>;
};
