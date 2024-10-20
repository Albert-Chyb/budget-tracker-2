import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CMSTableFilterContext,
  CMSTableFilterContextValue,
} from '../cms-table-filters';

const formSchema = z.object({
  phrase: z.string(),
});
type FormValue = z.infer<typeof formSchema>;

export function TextFieldFilterForm() {
  const { setFilterValue, filterValue } = useContext(
    CMSTableFilterContext
  ) as CMSTableFilterContextValue<string>;

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phrase: typeof filterValue === 'string' ? filterValue : '',
    },
  });

  function handleSubmit(formValue: FormValue) {
    setFilterValue(formValue.phrase);
  }

  function handleReset() {
    setFilterValue('');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='phrase'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Szukana fraza</FormLabel>

              <FormControl>
                <Input type='text' {...field} placeholder='Szukana fraza' />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex gap-x-2'>
          <PopoverClose asChild>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={handleReset}
            >
              Wyczyść
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button type='submit' className='w-full'>
              Zastosuj
            </Button>
          </PopoverClose>
        </div>
      </form>
    </Form>
  );
}
