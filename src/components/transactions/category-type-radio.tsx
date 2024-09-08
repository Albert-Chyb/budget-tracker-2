import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { TCategoryType } from '@/lib/db-schemas/category';
import { ControllerRenderPropsWithValue } from '@/lib/types/controller-render-props-with-value';
import { FieldValues, Path } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export default function CategoryTypeRadio<
  TFields extends FieldValues,
  TFieldPath extends Path<TFields>
>({ field }: CategoryTypeRadioProps<TFields, TFieldPath>) {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      ref={field.ref}
      onBlur={field.onBlur}
      name={field.name}
      disabled={field.disabled}
    >
      <CategoryTypeRadioGroupItem value='expense' label='Wydatek' />
      <CategoryTypeRadioGroupItem value='income' label='Przychód' />
    </RadioGroup>
  );
}

export type CategoryTypeRadioProps<
  TFields extends FieldValues,
  TFieldPath extends Path<TFields>
> = {
  field: ControllerRenderPropsWithValue<TFields, TFieldPath, TCategoryType>;
};

function CategoryTypeRadioGroupItem({
  value,
  label,
}: {
  value: TCategoryType;
  label: string;
}) {
  return (
    <FormItem className='flex items-center space-y-0 space-x-4'>
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>

      <FormLabel className='font-normal'>{label}</FormLabel>
    </FormItem>
  );
}
