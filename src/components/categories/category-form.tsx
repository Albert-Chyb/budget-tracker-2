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
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '../loading-button';
import { Input } from '../ui/input';
import CategoryColorSelect from './category-color-select';
import CategoryTypeRadio from './category-type-radio';

export default function CategoryForm({
  category,
  colors,
  method,
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema, {
      errorMap: categoryFormErrorMap,
    }),
    defaultValues: category ?? createCategoryFormValue(),
  });
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formValue: CategoryFormValue) {
    onSubmit(formValue, formRef.current);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4'
        method={method}
      >
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

        <LoadingButton type='submit' className='w-full' isLoading={isLoading}>
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}

export type CategoryFormProps = {
  isLoading: boolean;
  category?: TCategory;
  colors: Tables<'categories_colors'>[];
  method: 'post' | 'put';
  onSubmit: (value: CategoryFormValue, target: HTMLFormElement | null) => void;
};
