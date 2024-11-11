import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Column, SortDirection } from '@tanstack/react-table';
import { ArrowUpDown, Eraser } from 'lucide-react';
import { PropsWithChildren, ReactNode, useId } from 'react';

export type SortingProps = PropsWithChildren<{
  onSortingReset: () => void;
}>;

export const Sorting = (props: SortingProps) => {
  const { children, onSortingReset } = props;

  return (
    <section>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            className='mr-2 shrink-0'
            onClick={onSortingReset}
          >
            <Eraser aria-hidden='true' />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Resetuj sortowanie</TooltipContent>
      </Tooltip>

      <Sheet>
        <SheetTrigger asChild>
          <Button type='button'>
            <ArrowUpDown aria-hidden='true' className='mr-2' />
            Sortuj
          </Button>
        </SheetTrigger>

        <SheetContent className='max-sm:w-full'>
          <SheetHeader className='mb-6'>
            <SheetTitle>Sortuj dane</SheetTitle>
            <SheetDescription>
              Użyj poniższych opcji, aby posortować dane według wybranych
              kryteriów.
            </SheetDescription>
          </SheetHeader>

          <ul className='space-y-2'>{children}</ul>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export type SortingOptionProps = {
  column: Column<unknown>;
  label: ReactNode;
};

function getToggleGroupValue(column: Column<unknown>) {
  const sortingDirection = column.getIsSorted();

  if (sortingDirection === false) {
    return 'default';
  }

  return sortingDirection;
}

const TOGGLE_GROUP_ITEMS: {
  value: SortDirection | 'default';
  label: ReactNode;
}[] = [
  {
    value: 'default',
    label: 'Domyślne',
  },
  {
    value: 'asc',
    label: 'Rosnąco',
  },
  {
    value: 'desc',
    label: 'Malejąco',
  },
];

export const SortingOption = ({ label, column }: SortingOptionProps) => {
  const headingId = useId();

  const value = getToggleGroupValue(column);

  function handleValueChange(value: string) {
    switch (value) {
      case 'default':
        column.clearSorting();
        break;

      case 'asc':
        column.toggleSorting(false, column.getCanMultiSort());
        break;

      case 'desc':
        column.toggleSorting(true, column.getCanMultiSort());
        break;

      default:
        throw new Error('Unknown sorting option');
    }
  }

  return (
    <li className='border py-2 px-4 rounded-md'>
      <section className=''>
        <h3 id={headingId} className='mb-2'>
          {label}
        </h3>

        <ToggleGroup
          aria-labelledby={headingId}
          type='single'
          variant='outline'
          className='justify-start'
          value={value}
          onValueChange={handleValueChange}
        >
          {TOGGLE_GROUP_ITEMS.map(({ value, label }) => (
            <ToggleGroupItem value={value} key={value} className='basis-full'>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>
    </li>
  );
};
