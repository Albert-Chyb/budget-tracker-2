import { Column, Updater } from '@tanstack/react-table';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CMSContext } from './cms-context';
import { CMSDesktopTableFilterTrigger } from './desktop/cms-desktop-table-filter-trigger';
import { CMSMobileTableFilterTrigger } from './mobile/cms-mobile-table-filter-trigger';

export type CMSTableFilterContextValue<TFilterValue> = {
  setFilterValue: (value: Updater<TFilterValue | undefined>) => void;
  filterValue: TFilterValue | undefined;
  close: () => void;
};

export const CMSTableFilterContext = createContext<
  CMSTableFilterContextValue<unknown>
>({
  setFilterValue: () => {},
  filterValue: '',
  close: () => {},
});

export const CMSTableFilterTrigger = (props: CMSTableFilterTriggerProps) => {
  const { column } = props;

  const [isOpened, setIsOpened] = useState(false);
  const { isMobile } = useContext(CMSContext);

  const FilterTriggerConstructor = isMobile
    ? CMSMobileTableFilterTrigger
    : CMSDesktopTableFilterTrigger;
  const filterProps: CMSChildTableFilterTriggerProps = {
    ...props,
    open: isOpened,
    onOpenChange: setIsOpened,
  };
  const contextValue: CMSTableFilterContextValue<unknown> = {
    setFilterValue: column.setFilterValue,
    filterValue: column.getFilterValue(),
    close: handleFilterTriggerClose,
  };

  function handleFilterTriggerClose() {
    setIsOpened(false);
  }

  return (
    <li>
      <CMSTableFilterContext.Provider value={contextValue}>
        <FilterTriggerConstructor {...filterProps} />
      </CMSTableFilterContext.Provider>
    </li>
  );
};

export type CMSTableFilterTriggerProps = PropsWithChildren<{
  column: Column<unknown, unknown>;
  columnName: string;
}>;

export type CMSChildTableFilterTriggerProps = CMSTableFilterTriggerProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
