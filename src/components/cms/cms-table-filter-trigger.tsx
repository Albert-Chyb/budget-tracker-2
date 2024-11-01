import { useContext, useState } from 'react';
import { CMSContext } from './cms-context';
import {
  CMSTableFilterConfig,
  CMSTableFilterContext,
} from './cms-table-filters';
import { CMSDesktopTableFilterTrigger } from './desktop/cms-desktop-table-filter-trigger';
import { CMSMobileTableFilterTrigger } from './mobile/cms-mobile-table-filter-trigger';

export const CMSTableFilterTrigger = (props: CMSTableFilterTriggerProps) => {
  const { column } = props;

  const [isOpened, setIsOpened] = useState(false);
  const { isMobile } = useContext(CMSContext);

  function handleFilterTriggerClose() {
    setIsOpened(false);
  }

  return (
    <CMSTableFilterContext.Provider
      value={{
        setFilterValue: column.setFilterValue,
        filterValue: column.getFilterValue(),
        close: handleFilterTriggerClose,
      }}
    >
      {isMobile ? (
        <CMSMobileTableFilterTrigger
          {...props}
          open={isOpened}
          onOpenChange={setIsOpened}
        />
      ) : (
        <CMSDesktopTableFilterTrigger
          {...props}
          open={isOpened}
          onOpenChange={setIsOpened}
        />
      )}
    </CMSTableFilterContext.Provider>
  );
};

export type CMSTableFilterTriggerProps = CMSTableFilterConfig;
export type CMSChildTableFilterTriggerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
