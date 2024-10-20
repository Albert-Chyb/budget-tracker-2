import { RowData, Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { JSXElementConstructor, ReactElement } from 'react';
import { Button } from '../ui/button';
import { CMSContext, CMSContextProvider } from './cms-context';
import CMSEditorTrigger, { CMSEditorTriggerProps } from './cms-editor-trigger';
import { CMSLoadingSkeleton } from './cms-loading-skeleton';
import { CMSTableFiltersConfig } from './cms-table-filters';
import { CMSDesktopTable } from './desktop/cms-desktop-table';
import { CMSMobile } from './mobile/cms-mobile';
import { CMSMobileItemProps } from './mobile/cms-mobile-item';

export default function CMS<TData extends RowData>(props: CMSProps<TData>) {
  const {
    title,
    description,
    mobileItems,
    newItemEditor,
    table,
    isLoading,
    filters,
  } = props;

  return (
    <CMSContextProvider>
      {isLoading ? (
        <CMSLoadingSkeleton />
      ) : (
        <>
          <div className='flex justify-between items-center gap-x-2 py-6'>
            <div>
              <h2 className='text-2xl font-semibold'>{title}</h2>
              <p className='text-muted-foreground'>{description}</p>
            </div>

            <div className='shrink-0'>
              <CMSEditorTrigger {...newItemEditor}>
                <Button size='icon' variant='ghost'>
                  <Plus className='size-6' />
                </Button>
              </CMSEditorTrigger>
            </div>
          </div>

          <CMSContext.Consumer>
            {({ isMobile }) =>
              isMobile ? (
                <CMSMobile>{mobileItems}</CMSMobile>
              ) : (
                <CMSDesktopTable table={table} filters={filters} />
              )
            }
          </CMSContext.Consumer>
        </>
      )}
    </CMSContextProvider>
  );
}

export type CMSProps<TData extends RowData> = {
  isLoading: boolean;
  title: string;
  description: string;
  newItemEditor: CMSEditorTriggerProps;
  mobileItems: ReactElement<
    CMSMobileItemProps,
    JSXElementConstructor<CMSMobileItemProps>
  >[];
  table: Table<TData>;
  filters: CMSTableFiltersConfig;
};
