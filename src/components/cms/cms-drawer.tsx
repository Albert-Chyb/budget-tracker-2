import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';

export default function CmsDrawer({
  title,
  description,
  children,
  ...props
}: CmsDrawerProps) {
  return (
    <Drawer {...props}>
      <DrawerContent>
        <DrawerHeader className='px-[var(--screen-edge-spacing)]'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='px-[var(--screen-edge-spacing)]'>{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

export type CmsDrawerProps = PropsWithChildren<{
  title: string;
  description: string;
}> &
  ComponentPropsWithoutRef<typeof Drawer>;
