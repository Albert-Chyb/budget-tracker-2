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
import { CirclePlus } from 'lucide-react';
import { CMSChildTableFilterTriggerProps } from '../cms-table-filter-trigger';
import { CMSTableFilterConfig } from '../cms-table-filters';

export function CMSDesktopTableFilterTrigger(
  props: CMSDesktopTableFilterTriggerProps
) {
  const { form, columnName, onOpenChange, open } = props;

  return (
    <div className='flex items-center '>
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

        <PopoverContent>{form}</PopoverContent>
      </Popover>
    </div>
  );
}

export type CMSDesktopTableFilterTriggerProps = Omit<
  CMSTableFilterConfig,
  'column'
> &
  CMSChildTableFilterTriggerProps;
