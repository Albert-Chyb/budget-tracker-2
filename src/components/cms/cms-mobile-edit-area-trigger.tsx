import { PropsWithChildren } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { CMSEditAreaTriggerProps } from './cms-edit-area-trigger-props';

export default function CMSMobileEditAreaTrigger(
  props: CMSMobileEditAreaTriggerProps
) {
  const { children, title, description, editElement } = props;

  return (
    <Drawer>
      <DrawerTrigger className='block w-full p-2' asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='mx-[var(--screen-edge-spacing)] space-y-2'>
          {editElement}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export type CMSMobileEditAreaTriggerProps =
  PropsWithChildren<CMSEditAreaTriggerProps>;
