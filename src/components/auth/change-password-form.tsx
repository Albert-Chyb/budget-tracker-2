import { LoadingButton } from '@/components/LoadingButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  changePasswordFormSchema,
  ChangePasswordFormValue,
} from '@/lib/form-resolvers/change-password-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ChangePasswordForm({
  onPasswordChange,
  isLoading,
}: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function handleSubmit(value: ChangePasswordFormValue) {
    onPasswordChange(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>

              <FormControl>
                <Input
                  data-testid='password-input'
                  type='password'
                  placeholder='Hasło do twojego konta'
                  {...field}
                />
              </FormControl>

              <FormMessage data-testid='password-errors' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź hasło</FormLabel>

              <FormControl>
                <Input
                  data-testid='confirm-password-input'
                  type='password'
                  placeholder='Wpisz ponownie swoje hasło'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type='submit' isLoading={isLoading}>
          Zmień hasło
        </LoadingButton>
      </form>
    </Form>
  );
}

export interface ChangePasswordFormProps {
  onPasswordChange: (value: ChangePasswordFormValue) => void;
  isLoading: boolean;
}
