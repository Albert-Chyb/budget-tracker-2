import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CMSChildEditorTriggerProps } from '../cms-editor-trigger';

export function CMSDesktopEditorTrigger(props: CMSDesktopEditorTriggerProps) {
  const {
    children,
    title,
    description,
    isOpened,
    handleOpenChange,
    content,
    tooltip,
  } = props;

  return (
    <Sheet open={isOpened} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>{children}</SheetTrigger>
        </TooltipTrigger>

        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>

      <SheetContent>
        <SheetHeader className='mb-4'>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {content}
      </SheetContent>
    </Sheet>
  );
}

export type CMSDesktopEditorTriggerProps = CMSChildEditorTriggerProps;
