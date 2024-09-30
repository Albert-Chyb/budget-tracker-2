import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tables } from '@/lib/db/database.types';
import { ControllerRenderPropsWithValue } from '@/lib/types/controller-render-props-with-value';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { Button } from '../ui/button';

export default function CategoryColorSelect<
  TFields extends FieldValues,
  TFieldPath extends Path<TFields>
>({ colors, field }: CategoryColorSelectProps<TFields, TFieldPath>) {
  const [selectValue, setSelectValue] = useState<CategoryColorSelectValue>(
    field.value
  );

  useEffect(() => {
    field.onChange(selectValue);
  }, [field, selectValue]);

  function handleClear() {
    setSelectValue(null);
  }

  function handleSelectValueChange(colorId: string) {
    const colorIdAsNumber = Number(colorId);

    if (isNaN(colorIdAsNumber)) {
      throw new Error(
        'Colors ids inside select items has to be transformable to number'
      );
    }

    setSelectValue(colorIdAsNumber);
  }

  // The select needs an empty string to reset its value
  const safeSelectValue = selectValue?.toString() ?? '';

  return (
    <div className='flex gap-x-2'>
      <Select
        value={safeSelectValue}
        onValueChange={handleSelectValueChange}
        name={field.name}
      >
        <SelectTrigger onBlur={field.onBlur} ref={field.ref}>
          <SelectValue placeholder='Przypisz kolor do kategorii' />
        </SelectTrigger>

        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color.colorId} value={String(color.colorId)}>
              {color.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type='button'
        size='icon'
        variant='secondary'
        aria-label='Wyczyść kolor kategorii'
        onClick={handleClear}
        disabled={!selectValue || field.disabled}
      >
        <X className='size-4' />
      </Button>
    </div>
  );
}

export type CategoryColorSelectValue =
  | Tables<'categories_colors'>['colorId']
  | null;
export type CategoryColorSelectProps<
  TFields extends FieldValues,
  TFieldPath extends Path<TFields>
> = {
  colors: Tables<'categories_colors'>[];
  field: ControllerRenderPropsWithValue<
    TFields,
    TFieldPath,
    CategoryColorSelectValue
  >;
};
