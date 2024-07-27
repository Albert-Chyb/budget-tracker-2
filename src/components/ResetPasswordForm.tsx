import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordFormSchema,
  ResetPasswordFormValue,
} from '@lib/form-resolvers/reset-password-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/components/ui/form';
import { Input } from '@shadcn/components/ui/input';
import { useForm } from 'react-hook-form';
import { LoadingButton } from './LoadingButton';

export default function ResetPasswordForm({
  onResetPassword,
  isLoading = false,
}: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  function handleSubmit(value: ResetPasswordFormValue) {
    onResetPassword?.(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  data-testid='email-input'
                  type='email'
                  placeholder='Twój adres email'
                  {...field}
                />
              </FormControl>

              <FormMessage data-testid='email-error-message' />
            </FormItem>
          )}
        />

        <LoadingButton
          type='submit'
          isLoading={isLoading}
          data-testid='submit-btn'
        >
          Zresetuj hasło
        </LoadingButton>
      </form>
    </Form>
  );
}

export type ResetPasswordFormProps = {
  onResetPassword?: (value: ResetPasswordFormValue) => void;
  isLoading?: boolean;
};
