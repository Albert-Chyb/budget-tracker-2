import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Updater } from '@tanstack/react-table';
import { Filter, FilterX } from 'lucide-react';
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
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

export type CMSTableFilterContextValue<TFilterValue> = {
  setFilterValue: (value: Updater<TFilterValue | undefined>) => void;
  filterValue: TFilterValue | undefined;
  close: () => void;
};

export const CMSTableFilterContext = createContext<
  CMSTableFilterContextValue<unknown>
>({
  setFilterValue: () => {},
  filterValue: '',
  close: () => {},
});

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

export const CMSTableFilters = (props: CMSTableFiltersProps) => {
  const { onFiltersReset, children } = props;

  const { isMobile } = useContext(CMSContext);

  const body = (
    <ul className={isMobile ? '' : 'flex gap-x-2'} aria-label='Lista filtrów'>
      {children}
    </ul>
  );

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

            {body}

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
    <section className='flex'>
      {body}

      <ResetFiltersBtn onClick={onFiltersReset} className='ml-auto shrink-0' />
    </section>
  );
};

export type CMSTableFiltersProps = PropsWithChildren<{
  onFiltersReset: () => void;
}>;
