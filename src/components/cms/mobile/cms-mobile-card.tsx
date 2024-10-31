import { Table, TableBody } from '@/components/ui/table';
import { Cell, Header, Row } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { CMSMobileCardActions } from './cms-mobile-card-actions';
import { CMSMobileCardEntry } from './cms-mobile-card-entry';
import { CMSMobileCardTitle } from './cms-mobile-card-title';

function findCell<TData>(row: Row<TData>, columnId: string) {
  let foundCell: Cell<TData, unknown> | undefined = undefined;

  for (const cell of row.getVisibleCells()) {
    if (cell.column.id === columnId) {
      foundCell = cell;
    }
  }

  if (!foundCell) {
    throw new Error(
      `Could not find the cell in a column with id of ${columnId}`
    );
  }

  return foundCell;
}

export const CMSMobileCard = <TData,>(props: CMSMobileCardProps<TData>) => {
  const { titleColumnId, actionsColumnId, captionBuilder, headers, row } =
    props;

  const titleCell = findCell(row, titleColumnId);
  const actionsHeader = headers.get(actionsColumnId)!;
  const actionsCell = findCell(row, actionsColumnId);
  const detailsCells = row
    .getVisibleCells()
    .filter(
      (cell) => ![titleColumnId, actionsColumnId].includes(cell.column.id)
    );

  return (
    <li className='border-2 rounded'>
      <Table className='caption-top'>
        <CMSMobileCardTitle>{captionBuilder(titleCell)}</CMSMobileCardTitle>

        <TableBody>
          {detailsCells.map((cell) => {
            const cellHeader = headers.get(cell.column.id)!;

            return <CMSMobileCardEntry cell={cell} header={cellHeader} key={cell.id}/>;
          })}

          <CMSMobileCardActions cell={actionsCell} header={actionsHeader} />
        </TableBody>
      </Table>
    </li>
  );
};

export type CMSMobileCardProps<TData> = {
  headers: Map<string, Header<TData, unknown>>;
  row: Row<TData>;
  titleColumnId: string;
  actionsColumnId: string;
  captionBuilder: (cell: Cell<TData, unknown>) => ReactNode;
};
