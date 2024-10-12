import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CMSChildEditorTriggerProps } from '../cms-editor-trigger';

export function CMSDesktopEditorTrigger(props: CMSDesktopEditorTriggerProps) {
  const { children, title, description, isOpened, handleOpenChange, content } =
    props;

  return (
    <Sheet open={isOpened} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {content}
      </SheetContent>
    </Sheet>
  );
}

export type CMSDesktopEditorTriggerProps = CMSChildEditorTriggerProps;
