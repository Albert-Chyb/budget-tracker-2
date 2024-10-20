import { Updater } from '@tanstack/react-table';
import { createContext } from 'react';

export type CMSTableFiltersConfig = Record<string, JSX.Element>;

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
