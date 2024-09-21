import { PropsWithChildren } from 'react';
import { Button } from '../ui/button';
import { CMSEditorTriggerProps } from './cms-editor-trigger-props';
import CMSMobileEditAreaTrigger from './cms-mobile-editor-trigger';

export default function CMSMobileItem(props: CMSMobileItemProps) {
  const { children, editElement, title, description, onDelete } = props;

  function handleDeleteClick() {
    onDelete();
  }

  return (
    <li className='border-2 rounded-sm'>
      <CMSMobileEditAreaTrigger
        title={title}
        description={description}
        editElement={editElement}
      >
        <Button variant='ghost' className='rounded-none w-full'>
          {children}
        </Button>
      </CMSMobileEditAreaTrigger>

      <div className='px-2 pb-2'>
        <Button
          onClick={handleDeleteClick}
          type='button'
          variant='destructive'
          className='w-full'
        >
          Usuń
        </Button>
      </div>
    </li>
  );
}

export type CMSMobileItemProps = PropsWithChildren<{
  onDelete: () => void;
}> &
  CMSEditorTriggerProps;
