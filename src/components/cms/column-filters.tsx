import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Filter, FilterX } from 'lucide-react';
import { ComponentProps, PropsWithChildren, useContext } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  ScrollableSheetContent,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { CMSContext } from './cms-context';

const ResetFiltersBtn = (props: ComponentProps<typeof Button>) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button type='button' size='icon' {...props}>
        <FilterX className='size-5' />
      </Button>
    </TooltipTrigger>

    <TooltipContent>Wyczyść filtry</TooltipContent>
  </Tooltip>
);

const LIST_LABEL = 'Lista filtrów';

export const ColumnFilters = (props: ColumnFiltersProps) => {
  const { onFiltersReset, children } = props;

  const { isMobile } = useContext(CMSContext);

  if (isMobile) {
    return (
      <section className='flex'>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Filter className='mr-2' aria-hidden='true' />
              Filtruj dane
            </Button>
          </SheetTrigger>

          <ScrollableSheetContent className='w-full space-y-2'>
            <SheetHeader>
              <SheetTitle>Filtry</SheetTitle>
              <SheetDescription>
                Użyj poniższych filtrów, aby zawęzić wyświetlane wyniki
              </SheetDescription>

              <Separator decorative={true} />
            </SheetHeader>

            <ul aria-label={LIST_LABEL}>{children}</ul>

            <SheetFooter className='gap-y-2 flex-col'>
              <SheetClose asChild>
                <Button type='button'>Zamknij</Button>
              </SheetClose>
            </SheetFooter>
          </ScrollableSheetContent>
        </Sheet>

        <ResetFiltersBtn
          onClick={onFiltersReset}
          className='ml-auto shrink-0'
        />
      </section>
    );
  }

  return (
    <section className='flex items-end'>
      <ul className='flex gap-x-2 items-end' aria-label={LIST_LABEL}>
        {children}
      </ul>

      <ResetFiltersBtn onClick={onFiltersReset} className='ml-auto shrink-0' />
    </section>
  );
};

export type ColumnFiltersProps = PropsWithChildren<{
  onFiltersReset: () => void;
}>;
