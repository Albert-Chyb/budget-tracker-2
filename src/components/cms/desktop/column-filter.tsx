import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PopoverClose } from '@radix-ui/react-popover';
import { CirclePlus } from 'lucide-react';
import { ChildColumnFilterProps } from '../column-filter';

export function DesktopColumnFilter(props: ChildColumnFilterProps) {
  const { children, columnName, onOpenChange, open, column } = props;

  return (
    <div className='flex items-center'>
      <Popover modal={true} open={open} onOpenChange={onOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button type='button' variant='outline'>
                <CirclePlus className='mr-2' />
                {columnName}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>

          <TooltipContent>Filtruj kolumnę: {columnName}</TooltipContent>
        </Tooltip>

        <PopoverContent>
          {children}

          <PopoverClose asChild>
            <Button
              type='button'
              variant='secondary'
              onClick={() => column.setFilterValue(undefined)}
              className='w-full mt-4'
            >
              Wyczyść
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
}
