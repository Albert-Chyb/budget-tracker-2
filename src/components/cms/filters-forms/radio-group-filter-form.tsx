import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import { ReactNode, useContext, useId } from 'react';
import {
  CMSTableFilterContext,
  CMSTableFilterContextValue,
} from '../cms-table-filters';

export function RadioGroupFilterForm(props: RadioGroupFilterFormProps) {
  const { options } = props;

  const { filterValue, setFilterValue } = useContext(
    CMSTableFilterContext
  ) as CMSTableFilterContextValue<string>;
  const id = useId();

  const radioGroupValue = typeof filterValue === 'string' ? filterValue : '';
  const optionsWithReset = [{ value: '', text: 'Wszystko' }, ...options];

  return (
    <form onSubmit={($event) => $event.preventDefault()}>
      <Label
        htmlFor={id}
        className='inline-block leading-none text-sm font-medium mb-2'
      >
        Wyświetl wartość
      </Label>
      <RadioGroup
        onValueChange={setFilterValue}
        value={radioGroupValue}
        id={id}
      >
        {optionsWithReset.map((option, index) => (
          <RadioGroupOption key={index} option={option} />
        ))}
      </RadioGroup>
    </form>
  );
}

export type TRadioGroupFilterFormOption = { value: string; text: ReactNode };

export type RadioGroupFilterFormProps = {
  options: TRadioGroupFilterFormOption[];
};

function RadioGroupOption(props: RadioGroupOptionProps) {
  const id = useId();
  const { option } = props;

  return (
    <div className='flex items-center space-x-3'>
      <RadioGroupItem value={option.value} id={id} />
      <Label htmlFor={id}>{option.text}</Label>
    </div>
  );
}

type RadioGroupOptionProps = {
  option: TRadioGroupFilterFormOption;
};
