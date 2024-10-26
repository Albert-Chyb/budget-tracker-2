import { TableState } from '@tanstack/react-table';

export type CMSTableState = Pick<
  TableState,
  'pagination' | 'sorting' | 'columnFilters'
>;
