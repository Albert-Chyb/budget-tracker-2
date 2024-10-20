import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@radix-ui/react-label';
import { ReactNode, useContext, useId } from 'react';
import {
  CMSTableFilterContext,
  CMSTableFilterContextValue,
} from '../cms-table-filters';

function insertCheckboxValueToFilter(
  filters: string[],
  value: string
): string[] {
  const set = new Set([...filters]);

  set.add(value);

  return [...set];
}

function removeCheckboxValueFromFilter(
  filters: string[],
  value: string
): string[] {
  return filters.filter((i) => i !== value);
}

export function CheckboxesFilterForm(props: CheckboxesFilterFormProps) {
  const { options } = props;

  const { filterValue, setFilterValue } = useContext(
    CMSTableFilterContext
  ) as CMSTableFilterContextValue<string[]>;

  const checkedOptions = filterValue ?? [];

  function handleCheckedChange(value: string, newCheckedState: boolean) {
    if (newCheckedState) {
      setFilterValue((prevCheckedItems) =>
        insertCheckboxValueToFilter(prevCheckedItems ?? [], value)
      );
    } else {
      setFilterValue((prevCheckedItems) => {
        if (prevCheckedItems) {
          return removeCheckboxValueFromFilter(prevCheckedItems, value);
        }
      });
    }
  }

  function handleReset() {
    setFilterValue([]);
  }

  return (
    <form onSubmit={($event) => $event.preventDefault()}>
      <fieldset>
        <legend className='leading-none text-sm font-medium'>
          Wybierz wartości
        </legend>
        <ScrollArea className='h-72 mt-4'>
          <div className='space-y-3'>
            {options.map((option, index) => (
              <CheckboxOption
                key={index}
                option={option}
                isChecked={checkedOptions.includes(option.value)}
                onCheckedChange={(newCheckedState) =>
                  handleCheckedChange(option.value, newCheckedState)
                }
              />
            ))}
          </div>
        </ScrollArea>
      </fieldset>

      <Button
        className='w-full'
        type='button'
        variant='outline'
        onClick={handleReset}
      >
        Wyczyść
      </Button>
    </form>
  );
}

export type CheckboxesFilterFormOption = {
  value: string;
  text: ReactNode;
};

export type CheckboxesFilterFormProps = {
  options: CheckboxesFilterFormOption[];
};

function CheckboxOption(props: OptionProps) {
  const { option, isChecked, onCheckedChange } = props;

  const id = useId();

  return (
    <div className='flex items-center space-x-3'>
      <Checkbox
        value={option.value}
        id={id}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id}>{option.text}</Label>
    </div>
  );
}

type OptionProps = {
  option: CheckboxesFilterFormOption;
  isChecked: boolean;
  onCheckedChange: (newState: boolean) => void;
};
