import { Column } from '@tanstack/react-table';
import { PropsWithChildren, useContext, useState } from 'react';
import { CMSContext } from './cms-context';
import { DesktopColumnFilter } from './desktop/column-filter';
import { MobileColumnFilter } from './mobile/column-filter';

export const ColumnFilter = (props: ColumnFilterProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { isMobile } = useContext(CMSContext);

  const FilterConstructor = isMobile ? MobileColumnFilter : DesktopColumnFilter;
  const filterProps: ChildColumnFilterProps = {
    ...props,
    open: isOpened,
    onOpenChange: setIsOpened,
  };

  return (
    <li>
      <FilterConstructor {...filterProps} />
    </li>
  );
};

export type ColumnFilterProps = PropsWithChildren<{
  column: Column<unknown, unknown>;
  columnName: string;
}>;

export type ChildColumnFilterProps = ColumnFilterProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
