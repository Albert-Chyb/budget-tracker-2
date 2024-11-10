import { Column } from '@tanstack/react-table';
import { PropsWithChildren, useContext, useState } from 'react';
import { CMSContext } from './cms-context';
import { DesktopColumnFilter } from './desktop/column-filter';
import { MobileColumnFilter } from './mobile/column-filter';

export const ColumnFilter = (props: PropsWithChildren<ColumnFilterProps>) => {
  const { mobileWrapper = true, desktopWrapper = true } = props;

  const [isOpened, setIsOpened] = useState(false);
  const { isMobile } = useContext(CMSContext);

  const FilterConstructor = isMobile ? MobileColumnFilter : DesktopColumnFilter;
  const filterProps: ChildColumnFilterProps = {
    ...props,
    inWrapper: (isMobile && mobileWrapper) || (!isMobile && desktopWrapper),
    open: isOpened,
    onOpenChange: setIsOpened,
  };

  return (
    <li>
      <FilterConstructor {...filterProps} />
    </li>
  );
};

export type ColumnFilterProps = {
  column: Column<unknown, unknown>;
  columnName: string;
  mobileWrapper?: boolean;
  desktopWrapper?: boolean;
};

export type ChildColumnFilterProps = PropsWithChildren<
  ColumnFilterProps & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    inWrapper: boolean;
  }
>;
