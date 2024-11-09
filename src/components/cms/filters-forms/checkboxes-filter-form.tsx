import { Checkbox } from '@/components/ui/checkbox';
import { Label, labelVariants } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
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
  ColumnFilterContext,
  ColumnFilterContextValue,
} from '../contexts/column-filter';

type CheckboxesContextValue = {
  checkedValues: Set<string>;
  onCheckedChange: (
    value: CheckboxProps['value'],
    newState: CheckedState
  ) => void;
};
const CheckboxesFilterContext = createContext<CheckboxesContextValue>({
  checkedValues: new Set(),
  onCheckedChange() {},
});

export const CheckboxesFilterForm = (props: PropsWithChildren) => {
  const { children } = props;

  const { filterValue, setFilterValue } = useContext(
    ColumnFilterContext
  ) as ColumnFilterContextValue<string[]>;

  const checkedValues = new Set(filterValue ?? []);

  const context: CheckboxesContextValue = {
    checkedValues,
    onCheckedChange(value, newCheckedState) {
      if (newCheckedState === 'indeterminate') {
        return;
      }

      const valueAsString = String(value);

      if (newCheckedState) {
        checkedValues.add(valueAsString);
      } else {
        checkedValues.delete(valueAsString);
      }

      setFilterValue([...checkedValues]);
    },
  };

  return (
    <form onSubmit={($event) => $event.preventDefault()}>
      <fieldset>
        <legend className={`${labelVariants()} mb-3`}>
          Wybierz szukane wartości
        </legend>

        <ScrollArea className='h-72'>
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
    const isChecked = checkedValues.has(value as string);

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
