import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';

export type CMSTableState = {
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
};
