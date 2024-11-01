import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CirclePlus } from 'lucide-react';
import { CMSChildTableFilterTriggerProps } from '../cms-table-filter-trigger';

export const CMSMobileTableFilterTrigger = (
  props: CMSChildTableFilterTriggerProps
) => {
  const { columnName, children, open, onOpenChange, column } = props;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button type='button' variant='outline'>
          <CirclePlus aria-hidden='true' className='mr-2' />
          {columnName}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtrujesz kolumnę: {columnName}</DrawerTitle>
          <DrawerDescription>
            Wypełnij poniższy formularz, aby zastosować filtr.
          </DrawerDescription>
        </DrawerHeader>

        <div className='px-[var(--screen-edge-spacing)]'>{children}</div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              type='button'
              variant='secondary'
              onClick={() => column.setFilterValue(undefined)}
            >
              Wyczyść
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
