import { RowData, Table } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { JSXElementConstructor, ReactElement } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { CMSContext, CMSContextProvider } from './cms-context';
import CMSEditorTrigger, { CMSEditorTriggerProps } from './cms-editor-trigger';
import { CMSLoadingSkeleton } from './cms-loading-skeleton';
import { CMSDesktopTable } from './desktop/cms-desktop-table';
import { CMSMobile } from './mobile/cms-mobile';
import { CMSMobileItemProps } from './mobile/cms-mobile-item';

export default function CMS<TData extends RowData>(props: CMSProps<TData>) {
  const { title, description, mobileItems, newItemEditor, table, isLoading } =
    props;

  return (
    <CMSContextProvider>
      {isLoading ? (
        <CMSLoadingSkeleton />
      ) : (
        <Card>
          <div className='p-6 flex justify-between items-center gap-x-2'>
            <CardHeader className='p-0'>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <div className='shrink-0'>
              <CMSEditorTrigger {...newItemEditor}>
                <Button size='icon' variant='ghost'>
                  <Plus className='size-6' />
                </Button>
              </CMSEditorTrigger>
            </div>
          </div>

          <CardContent>
            <CMSContext.Consumer>
              {({ isMobile }) =>
                isMobile ? (
                  <CMSMobile>{mobileItems}</CMSMobile>
                ) : (
                  <CMSDesktopTable table={table} />
                )
              }
            </CMSContext.Consumer>
          </CardContent>
        </Card>
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
};
