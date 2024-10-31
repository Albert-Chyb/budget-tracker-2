import { LoadingButton } from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { PropsWithChildren } from 'react';
import CMSEditorTrigger, { CMSEditorTriggerProps } from '../cms-editor-trigger';

export default function CMSMobileItem(props: CMSMobileItemProps) {
  const { children, isBeingDeleted, onDelete, editor } = props;

  return (
    <li className='border-2 rounded-sm'>
      <section>
        {children}

        <footer className='flex gap-x-2 p-2'>
          <LoadingButton
            type='submit'
            variant='destructive'
            className='w-full'
            isLoading={isBeingDeleted}
            onClick={onDelete}
            size='sm'
          >
            Usuń
          </LoadingButton>

          <CMSEditorTrigger {...editor}>
            <Button
              variant='ghost'
              className='rounded-none w-full'
              disabled={isBeingDeleted}
              size='sm'
            >
              Edytuj
            </Button>
          </CMSEditorTrigger>
        </footer>
      </section>
    </li>
  );
}

export type CMSMobileItemProps = PropsWithChildren<{
  editor: CMSEditorTriggerProps;
  isBeingDeleted: boolean;
  onDelete: () => void;
}>;
