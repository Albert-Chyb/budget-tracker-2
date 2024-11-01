import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CirclePlus } from 'lucide-react';
import { CMSChildTableFilterTriggerProps } from '../cms-table-filter-trigger';

export const CMSMobileTableFilterTrigger = (
  props: CMSChildTableFilterTriggerProps
) => {
  const { columnName, children, open, onOpenChange } = props;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button type='button' variant='outline'>
          <CirclePlus aria-hidden='true' className='mr-2' />
          {columnName}
        </Button>
      </DrawerTrigger>

      <DrawerContent className='px-[var(--screen-edge-spacing)] pb-2'>
        <DrawerHeader>
          <DrawerTitle>Filtrujesz kolumnę: {columnName}</DrawerTitle>
          <DrawerDescription>
            Wypełnij poniższy formularz, aby zastosować filtr.
          </DrawerDescription>
        </DrawerHeader>

        {children}
      </DrawerContent>
    </Drawer>
  );
};
