import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TCategory } from '@/lib/db-schemas/category';
import { Tables } from '@/lib/db/database.types';
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

export default function CategoryForm({
  category,
  colors,
  onSubmit,
}: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema, {
      errorMap: categoryFormErrorMap,
    }),
    defaultValues: category ?? createCategoryFormValue(),
  });

  function handleSubmit(formValue: CategoryFormValue) {
    onSubmit(formValue);
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
                <CategoryColorSelect field={field} colors={colors} />
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
      </form>
    </Form>
  );
}

export type CategoryFormProps = {
  category?: TCategory;
  colors: Tables<'categories_colors'>[];
  onSubmit: (value: CategoryFormValue) => void;
};
