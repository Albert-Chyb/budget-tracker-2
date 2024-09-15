import { PropsWithChildren } from 'react';
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
  open,
  onOpenChange,
  children,
}: CmsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent onTransitionEnd={() => console.log('Animation ended')}>
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;
