import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ChildEditorProps } from '../editor';

export default function MobileEditor(props: ChildEditorProps) {
  const {
    trigger,
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
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

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
