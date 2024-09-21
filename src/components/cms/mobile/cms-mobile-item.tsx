import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import CMSEditorTrigger from '../cms-editor-trigger';
import { CMSEditorTriggerProps } from '../cms-editor-trigger';

export default function CMSMobileItem(props: CMSMobileItemProps) {
  const { children, editElement, title, description, onDelete } = props;

  function handleDeleteClick() {
    onDelete();
  }

  return (
    <li className='border-2 rounded-sm'>
      <CMSEditorTrigger
        title={title}
        description={description}
        editElement={editElement}
      >
        <Button variant='ghost' className='rounded-none w-full'>
          {children}
        </Button>
      </CMSEditorTrigger>

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
