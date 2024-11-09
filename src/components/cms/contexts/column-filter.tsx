import { Updater } from '@tanstack/react-table';
import { createContext } from 'react';

export type ColumnFilterContextValue<TFilterValue> = {
  setFilterValue: (value: Updater<TFilterValue | undefined>) => void;
  filterValue: TFilterValue | undefined;
};

export const ColumnFilterContext = createContext<
  ColumnFilterContextValue<unknown>
>({
  setFilterValue: () => {},
  filterValue: '',
});
