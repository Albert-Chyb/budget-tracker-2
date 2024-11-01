import { RowData, Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { CMSContext, CMSContextProvider } from './cms-context';
import CMSEditorTrigger, { CMSEditorTriggerProps } from './cms-editor-trigger';
import { CMSLoadingSkeleton } from './cms-loading-skeleton';
import { CMSTableFilters, CMSTableFiltersConfig } from './cms-table-filters';
import { CMSDesktopTable } from './desktop/cms-desktop-table';
import { CMSMobile, CMSMobileProps } from './mobile/cms-mobile';

export default function CMS<TData extends RowData>(props: CMSProps<TData>) {
  const {
    title,
    description,
    newItemEditor,
    table,
    isLoading,
    filters,
    onServerSideProcessingChange,
    serverSideProcessing,
    isTablePending,
    mobileActionsColumnId,
    mobileTitleColumnId,
    mobileCaptionBuilder,
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
                <Button
                  size='icon'
                  variant='ghost'
                  aria-label='Dodaj nową kategorie'
                >
                  <Plus className='size-6' />
                </Button>
              </CMSEditorTrigger>
            </div>
          </header>

          <div className='space-y-2'>
            <CMSTableFilters
              filters={filters}
              onFiltersReset={() => table.resetColumnFilters()}
            />

            <CMSContext.Consumer>
              {({ isMobile }) =>
                isMobile ? (
                  <CMSMobile
                    table={table}
                    actionsColumnId={mobileActionsColumnId}
                    titleColumnId={mobileTitleColumnId}
                    captionBuilder={mobileCaptionBuilder}
                  />
                ) : (
                  <CMSDesktopTable table={table} isPending={isTablePending} />
                )
              }
            </CMSContext.Consumer>
          </div>
        </section>
      )}
    </CMSContextProvider>
  );
}

export type CMSProps<TData extends RowData> = {
  isLoading: boolean;
  isTablePending: boolean;
  title: string;
  description: string;
  newItemEditor: CMSEditorTriggerProps;
  table: Table<TData>;
  filters: CMSTableFiltersConfig;
  onServerSideProcessingChange(isServerSide: boolean): void;
  serverSideProcessing: boolean;
  mobileTitleColumnId: string;
  mobileActionsColumnId: string;
  mobileCaptionBuilder: CMSMobileProps<TData>['captionBuilder'];
};
