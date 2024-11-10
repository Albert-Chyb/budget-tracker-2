import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useId,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { ColumnFilter, ColumnFilterProps } from '../column-filter';

export const RadioGroupColumnFilter = forwardRef(
  (
    props: ComponentPropsWithoutRef<typeof RadioGroup> & ColumnFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof RadioGroup>>
  ) => {
    const { className, column, columnName, ...radioGroupProps } = props;

    const filterValue = props.column.getFilterValue();
    const setFilterValue = props.column.setFilterValue;
    const id = useId();

    const radioGroupValue = typeof filterValue === 'string' ? filterValue : '';

    return (
      <ColumnFilter column={column} columnName={columnName}>
        <form onSubmit={($event) => $event.preventDefault()}>
          <Label htmlFor={id} className='inline-block mb-3'>
            Wybierz szukaną wartość
          </Label>

          <RadioGroup
            className={twMerge(className, 'space-y-1')}
            onValueChange={setFilterValue}
            value={radioGroupValue}
            ref={forwardedRef}
            id={id}
            {...radioGroupProps}
          />
        </form>
      </ColumnFilter>
    );
  }
);

export const RadioGroupFilterOption = forwardRef(
  (
    props: RadioGroupFilterOptionProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof RadioGroupItem>>
  ) => {
    const id = useId();
    const { children, ...otherProps } = props;

    return (
      <div className='flex items-center space-x-3'>
        <RadioGroupItem {...otherProps} id={id} ref={forwardedRef} />
        <Label htmlFor={id}>{children}</Label>
      </div>
    );
  }
);

export type RadioGroupFilterOptionProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof RadioGroupItem>
>;
