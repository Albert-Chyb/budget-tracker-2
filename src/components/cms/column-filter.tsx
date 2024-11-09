import { Column } from '@tanstack/react-table';
import { PropsWithChildren, useContext, useState } from 'react';
import { CMSContext } from './cms-context';
import {
  ColumnFilterContext,
  ColumnFilterContextValue,
} from './contexts/column-filter';
import { DesktopColumnFilter } from './desktop/column-filter';
import { MobileColumnFilter } from './mobile/column-filter';

export const ColumnFilter = <TData,>(props: ColumnFilterProps<TData>) => {
  const { column } = props;

  const [isOpened, setIsOpened] = useState(false);
  const { isMobile } = useContext(CMSContext);

  const FilterConstructor = isMobile ? MobileColumnFilter : DesktopColumnFilter;
  const filterProps: ChildColumnFilterProps<TData> = {
    ...props,
    open: isOpened,
    onOpenChange: setIsOpened,
  };
  const contextValue: ColumnFilterContextValue<unknown> = {
    setFilterValue: column.setFilterValue,
    filterValue: column.getFilterValue(),
  };

  return (
    <li>
      <ColumnFilterContext.Provider value={contextValue}>
        <FilterConstructor {...filterProps} />
      </ColumnFilterContext.Provider>
    </li>
  );
};

export type ColumnFilterProps<TData> = PropsWithChildren<{
  column: Column<TData, unknown>;
  columnName: string;
}>;

export type ChildColumnFilterProps<TData> = ColumnFilterProps<TData> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
