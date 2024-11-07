import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useContext,
  useId,
} from 'react';
import { twMerge } from 'tailwind-merge';
import {
  CMSTableFilterContext,
  CMSTableFilterContextValue,
} from '../cms-table-filters';

export const RadioGroupFilter = forwardRef(
  (
    props: ComponentPropsWithoutRef<typeof RadioGroup>,
    forwardedRef: ForwardedRef<ComponentRef<typeof RadioGroup>>
  ) => {
    const { className, ...otherProps } = props;
    
    const { filterValue, setFilterValue } = useContext(
      CMSTableFilterContext
    ) as CMSTableFilterContextValue<string>;
    const id = useId();

    const radioGroupValue = typeof filterValue === 'string' ? filterValue : '';

    return (
      <form onSubmit={($event) => $event.preventDefault()}>
        <Label htmlFor={id} className='inline-block mb-3'>
          Wyświetl wartość
        </Label>

        <RadioGroup
          className={twMerge(className, 'space-y-1')}
          onValueChange={setFilterValue}
          value={radioGroupValue}
          {...otherProps}
          ref={forwardedRef}
          id={id}
        />
      </form>
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


