import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useContext,
  useId,
} from 'react';
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

type CheckboxesContextValue = {
  checkedValues: string[];
  onCheckedChange: (
    value: CheckboxProps['value'],
    newState: CheckedState
  ) => void;
};
const CheckboxesFilterContext = createContext<CheckboxesContextValue>({
  checkedValues: [],
  onCheckedChange() {},
});

export const CheckboxesFilter = (props: PropsWithChildren) => {
  const { children } = props;

  const { filterValue, setFilterValue } = useContext(
    CMSTableFilterContext
  ) as CMSTableFilterContextValue<string[]>;

  const checkedOptions = filterValue ?? [];

  const context: CheckboxesContextValue = {
    checkedValues: checkedOptions,
    onCheckedChange(value, newCheckedState) {
      if (newCheckedState === 'indeterminate') {
        return;
      }

      const valueAsString = String(value);

      if (newCheckedState) {
        setFilterValue((prevCheckedItems) =>
          insertCheckboxValueToFilter(prevCheckedItems ?? [], valueAsString)
        );
      } else {
        setFilterValue((prevCheckedItems) => {
          if (prevCheckedItems) {
            return removeCheckboxValueFromFilter(
              prevCheckedItems,
              valueAsString
            );
          }
        });
      }
    },
  };

  return (
    <form onSubmit={($event) => $event.preventDefault()}>
      <fieldset>
        <legend className='leading-none text-sm font-medium'>
          Wybierz wartości
        </legend>

        <ScrollArea className='h-72 mt-4'>
          <CheckboxesFilterContext.Provider value={context}>
            <div className='space-y-3'>{children}</div>
          </CheckboxesFilterContext.Provider>
        </ScrollArea>
      </fieldset>
    </form>
  );
};

export const CheckboxFilterOption = forwardRef(
  (
    props: PropsWithChildren<ComponentPropsWithoutRef<typeof Checkbox>>,
    forwardedRef: ForwardedRef<ComponentRef<typeof Checkbox>>
  ) => {
    const { children, value, ...otherProps } = props;
    const checkboxId = useId();
    const checkboxesContext = useContext(CheckboxesFilterContext);

    if (!checkboxesContext) {
      throw new Error(
        'CheckboxFilterOption component can only be used inside CheckboxesFilterContext'
      );
    }

    const { checkedValues, onCheckedChange } = checkboxesContext;
    const isChecked = checkedValues.includes(value as string);

    return (
      <div className='flex items-center space-x-3'>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(newState) => onCheckedChange(value, newState)}
          ref={forwardedRef}
          id={checkboxId}
          {...otherProps}
        />

        <Label htmlFor={checkboxId}>{children}</Label>
      </div>
    );
  }
);
