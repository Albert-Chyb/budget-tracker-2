import { Button } from '@/components/ui/button';
import { useFetcher } from 'react-router-dom';
import CMSEditorTrigger, { CMSEditorTriggerProps } from '../cms-editor-trigger';

export default function CMSMobileItem(props: CMSMobileItemProps) {
  const fetcher = useFetcher();
  const { children, id, ...editorProps } = props;

  return (
    <li className='border-2 rounded-sm'>
      <CMSEditorTrigger id={id} {...editorProps}>
        <Button variant='ghost' className='rounded-none w-full'>
          {children}
        </Button>
      </CMSEditorTrigger>

      <div className='px-2 pb-2'>
        <fetcher.Form method='delete'>
          <input type='text' name='id' value={id} readOnly hidden />

          <Button type='submit' variant='destructive' className='w-full'>
            Usuń
          </Button>
        </fetcher.Form>
      </div>
    </li>
  );
}

export type CMSMobileItemProps = CMSEditorTriggerProps;
