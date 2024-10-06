import {
  ColumnDef,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { JSXElementConstructor, ReactElement, useContext } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { CMSContext } from './cms-context';
import CMSEditorTrigger, { CMSEditorTriggerProps } from './cms-editor-trigger';
import { CMSDesktopTable } from './desktop/cms-desktop-table';
import { CMSMobile } from './mobile/cms-mobile';
import { CMSMobileItemProps } from './mobile/cms-mobile-item';
import CMSMobileLoadingSkeleton from './mobile/cms-mobile-loading-skeleton';

export default function CMS<TData extends RowData>(props: CMSProps<TData>) {
  const { isMobile } = useContext(CMSContext);
  const {
    title,
    description,
    mobileItems,
    newItemEditor,
    isLoading,
    data,
    columnsDef,
  } = props;

  const table = useReactTable({
    data,
    columns: columnsDef,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return isMobile ? <CMSMobileLoadingSkeleton /> : 'Pobieram dane ...';
  }

  return (
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
        {isMobile ? (
          <CMSMobile>{mobileItems}</CMSMobile>
        ) : (
          <CMSDesktopTable table={table} />
        )}
      </CardContent>
    </Card>
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

  data: TData[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnsDef: ColumnDef<TData, any>[];
};
