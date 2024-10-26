import { RowData, Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { JSXElementConstructor, ReactElement } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
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
    onServerSideProcessingChange,
    serverSideProcessing,
  } = props;

  return (
    <CMSContextProvider>
      {isLoading ? (
        <CMSLoadingSkeleton />
      ) : (
        <section>
          <header className='flex items-center gap-x-2 py-6'>
            <div>
              <h2 className='text-2xl font-semibold'>{title}</h2>
              <p className='text-muted-foreground'>{description}</p>
            </div>

            <div className='ml-auto flex items-center gap-x-2'>
              <Label className='inline-flex items-center gap-2 '>
                Przetwarzanie na serwerze
                <Switch
                  checked={serverSideProcessing}
                  onCheckedChange={onServerSideProcessingChange}
                />
              </Label>

              <CMSEditorTrigger {...newItemEditor}>
                <Button size='icon' variant='ghost'>
                  <Plus className='size-6' />
                </Button>
              </CMSEditorTrigger>
            </div>
          </header>

          <CMSContext.Consumer>
            {({ isMobile }) =>
              isMobile ? (
                <CMSMobile>{mobileItems}</CMSMobile>
              ) : (
                <CMSDesktopTable table={table} filters={filters} />
              )
            }
          </CMSContext.Consumer>
        </section>
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
  onServerSideProcessingChange(isServerSide: boolean): void;
  serverSideProcessing: boolean;
};
