import { Table as TanStackTable } from '@tanstack/react-table';
import { CMSMobileCard, CMSMobileCardProps } from './cms-mobile-card';

export function CMSMobile<TData>(props: CMSMobileProps<TData>) {
  const { table, titleColumnId, actionsColumnId, captionBuilder } = props;

  const columnsHeadersMap = new Map(
    table.getFlatHeaders().map((header) => [header.column.id, header])
  );

  return (
    <ul className='space-y-2'>
      {table.getRowModel().rows.map((row) => {
        return (
          <CMSMobileCard
            key={row.id}
            row={row}
            headers={columnsHeadersMap}
            titleColumnId={titleColumnId}
            actionsColumnId={actionsColumnId}
            captionBuilder={captionBuilder}
          />
        );
      })}
    </ul>
  );
}

export type CMSMobileProps<TData> = {
  table: TanStackTable<TData>;
  titleColumnId: string;
  actionsColumnId: string;
  captionBuilder: CMSMobileCardProps<TData>['captionBuilder'];
};
