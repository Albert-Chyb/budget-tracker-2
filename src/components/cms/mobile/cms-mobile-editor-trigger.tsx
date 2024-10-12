import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { PropsWithChildren } from 'react';
import {
  CMSChildEditorTriggerProps,
  CMSEditorTriggerProps,
} from '../cms-editor-trigger';

export default function CMSMobileEditorTrigger(
  props: CMSMobileEditorTriggerProps
) {
  const {
    children,
    title,
    description,
    content,
    isOpened,
    handleOpenChange,
    dismissible,
  } = props;

  return (
    <Drawer
      open={isOpened}
      onOpenChange={handleOpenChange}
      dismissible={dismissible}
    >
      <DrawerTrigger className='block w-full p-2' asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='mx-[var(--screen-edge-spacing)] space-y-2'>
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export type CMSMobileEditorTriggerProps =
  PropsWithChildren<CMSEditorTriggerProps> & CMSChildEditorTriggerProps;
