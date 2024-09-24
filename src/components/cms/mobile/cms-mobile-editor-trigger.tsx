import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { PropsWithChildren } from 'react';
import { useCMSEditorOpenState } from '../cms-editor-open-state';
import { CMSEditorTriggerProps } from '../cms-editor-trigger';

export default function CMSMobileEditorTrigger(
  props: CMSMobileEditorTriggerProps
) {
  const { children, title, description, editorContentElement, id } = props;
  const [isOpened, setIsOpened] = useCMSEditorOpenState(id);

  return (
    <Drawer open={isOpened} onOpenChange={setIsOpened}>
      <DrawerTrigger className='block w-full p-2' asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='mx-[var(--screen-edge-spacing)] space-y-2'>
          {editorContentElement}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export type CMSMobileEditorTriggerProps =
  PropsWithChildren<CMSEditorTriggerProps>;
