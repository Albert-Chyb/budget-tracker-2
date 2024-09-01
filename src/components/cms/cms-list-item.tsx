import { PropsWithChildren } from 'react';
import { Link, To } from 'react-router-dom';
import { Button } from '../ui/button';

export default function CmsListItem({
  children,
  to,
  deleteBtnText,
  onDelete,
}: CmsListItemProps) {
  function handleDeleteBtnClick() {
    onDelete();
  }

  return (
    <li className='flex flex-col border rounded-sm'>
      <Link to={to} className='p-2'>
        {children}
      </Link>

      <Button
        onClick={handleDeleteBtnClick}
        variant='destructive'
        className='m-2 mt-0'
      >
        {deleteBtnText}
      </Button>
    </li>
  );
}

export type CmsListItemProps = PropsWithChildren<{
  to: To;
  deleteBtnText: string;
  onDelete: () => void;
}>;
