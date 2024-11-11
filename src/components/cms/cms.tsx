import { RowData, Table } from '@tanstack/react-table';
import { PropsWithChildren, ReactElement } from 'react';

import { TanStackTablePaginator } from '../ui/tanstack-table/paginator';
import { CMSContext, CMSContextProvider } from './cms-context';
import { CMSLoadingSkeleton } from './cms-loading-skeleton';
import { CMSDesktopTable } from './desktop/cms-desktop-table';
import { CMSMobile, CMSMobileProps } from './mobile/cms-mobile';

type Props<TData extends RowData> = PropsWithChildren<{
  isLoading: boolean;
  isTablePending: boolean;
  table: Table<TData>;
  filters: ReactElement;
  sorting: ReactElement;
  mobileTitleColumnId: string;
  mobileActionsColumnId: string;
  mobileCaptionBuilder: CMSMobileProps<TData>['captionBuilder'];
}>;

function Root<TData extends RowData>(props: Props<TData>) {
  const {
    table,
    isLoading,
    filters,
    sorting,
    isTablePending,
    mobileActionsColumnId,
    mobileTitleColumnId,
    mobileCaptionBuilder,
    children,
  } = props;

  return (
    <CMSContextProvider>
      <CMSContext.Consumer>
        {({ isMobile }) => {
          if (isLoading) {
            return <CMSLoadingSkeleton />;
          }

          const dataView = isMobile ? (
            <CMSMobile
              table={table}
              actionsColumnId={mobileActionsColumnId}
              titleColumnId={mobileTitleColumnId}
              captionBuilder={mobileCaptionBuilder}
            />
          ) : (
            <CMSDesktopTable table={table} isPending={isTablePending} />
          );

          const pagination = (
            <TanStackTablePaginator table={table} compact={isMobile} />
          );

          return (
            <section>
              {children}

              <div className='space-y-2'>
                {isMobile ? (
                  <div className='flex justify-between gap-8'>
                    {filters}
                    {sorting}
                  </div>
                ) : (
                  filters
                )}
                {dataView}
                {pagination}
              </div>
            </section>
          );
        }}
      </CMSContext.Consumer>
    </CMSContextProvider>
  );
}

const Hgroup = ({ children }: PropsWithChildren) => (
  <hgroup className='mr-auto'>{children}</hgroup>
);

const Header = ({ children }: PropsWithChildren) => (
  <header className='flex items-center gap-x-2 py-6'>{children}</header>
);

const Title = ({ children }: PropsWithChildren) => (
  <h2 className='text-2xl font-semibold'>{children}</h2>
);

const Description = ({ children }: PropsWithChildren) => (
  <p className='text-muted-foreground'>{children}</p>
);

export { Description, Header, Hgroup, Root, Title };
