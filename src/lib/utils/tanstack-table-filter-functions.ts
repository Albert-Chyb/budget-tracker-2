import { FilterFn } from '@tanstack/react-table';

export const isInArray: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: unknown[]
) => {
  return filterValue.length > 0
    ? filterValue.includes(row.getValue(columnId))
    : true;
};
