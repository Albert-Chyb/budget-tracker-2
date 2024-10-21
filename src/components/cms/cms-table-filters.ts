import { Column, Updater } from '@tanstack/react-table';
import { createContext, ReactNode } from 'react';

export type CMSTableFiltersConfig = {
  column: Column<unknown, unknown>;
  columnName: string;
  form: ReactNode;
}[];

export type CMSTableFilterContextValue<TFilterValue> = {
  setFilterValue: (value: Updater<TFilterValue | undefined>) => void;
  filterValue: TFilterValue | undefined;
};

export const CMSTableFilterContext = createContext<
  CMSTableFilterContextValue<unknown>
>({
  setFilterValue: () => {},
  filterValue: '',
});
