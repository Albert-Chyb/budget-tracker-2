import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TCategory } from '@/lib/db-schemas/category';
import { TCategoryColor } from '@/lib/db-schemas/category-color';
import {
  categoryFormErrorMap,
  categoryFormSchema,
  CategoryFormValue,
  createCategoryFormValue,
} from '@/lib/form-resolvers/category-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CategoryColorSelect from './category-color-select';
import CategoryTypeRadio from './category-type-radio';

const DUMMY_COLORS: TCategoryColor[] = [
  {
    id: 1,
    rgb: '255255255',
    name: 'Pomarańczowy',
  },
  {
    id: 2,
    rgb: '255255255',
    name: 'Niebieski',
  },
  {
    id: 3,
    rgb: '255255255',
    name: 'Zielony',
  },
];

export default function CategoryForm({ category }: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema, {
      errorMap: categoryFormErrorMap,
    }),
    defaultValues: category ?? createCategoryFormValue(),
  });

  function handleSubmit(formValue: CategoryFormValue) {
    console.log(formValue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>

              <FormControl>
                <Input
                  type='text'
                  autoComplete='off'
                  {...field}
                  placeholder='Nazwa kategorii'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='colorId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kolor</FormLabel>

              <FormControl>
                <CategoryColorSelect field={field} colors={DUMMY_COLORS} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ transakcji</FormLabel>

              <FormControl>
                <CategoryTypeRadio field={field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Zapisz
        </Button>

        <pre>{JSON.stringify(form.getValues(), null, '\t')}</pre>
      </form>
    </Form>
  );
}

export type CategoryFormProps = {
  category?: TCategory;
};
