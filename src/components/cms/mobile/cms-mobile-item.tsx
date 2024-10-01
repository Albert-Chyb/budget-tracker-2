import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { PropsWithChildren } from 'react';
import CMSEditorTrigger, { CMSEditorTriggerProps } from '../cms-editor-trigger';

export default function CMSMobileItem(props: CMSMobileItemProps) {
  const { children, isBeingDeleted, onDelete, editor } = props;

  return (
    <li className='border-2 rounded-sm'>
      <CMSEditorTrigger {...editor}>
        <Button
          variant='ghost'
          className='rounded-none w-full'
          disabled={isBeingDeleted}
        >
          {children}
        </Button>
      </CMSEditorTrigger>

      <div className='px-2 pb-2'>
        <LoadingButton
          type='submit'
          variant='destructive'
          className='w-full'
          isLoading={isBeingDeleted}
          onClick={onDelete}
        >
          Usuń
        </LoadingButton>
      </div>
    </li>
  );
}

export type CMSMobileItemProps = PropsWithChildren<{
  editor: CMSEditorTriggerProps;
  isBeingDeleted: boolean;
  onDelete: () => void;
}>;
