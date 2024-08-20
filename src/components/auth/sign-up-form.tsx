import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EMAIL_ALREADY_IN_USE_MESSAGE } from '@/lib/form-resolvers/email-field';
import {
  SignUpFormValue,
  signUpFormSchema,
} from '@/lib/form-resolvers/sign-up-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '../loading-button';

export default function SignUpForm({
  onSignUp,
  serverErrors,
  isLoading = false,
}: SignUpFormProps) {
  const form = useForm<SignUpFormValue>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: DEFAULT_VALUE,
  });

  function handleSubmit(value: SignUpFormValue) {
    onSignUp(value);
  }

  useEffect(() => {
    if (serverErrors.emailAlreadyInUse) {
      form.setError('email', {
        type: 'server',
        message: EMAIL_ALREADY_IN_USE_MESSAGE,
      });
    }
  }, [form, serverErrors?.emailAlreadyInUse]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-y-4'
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

              <FormMessage data-testid='email-errors' />
            </FormItem>
          )}
        />

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

        <LoadingButton
          data-testid='submit-btn'
          type='submit'
          isLoading={isLoading}
        >
          Stwórz konto
        </LoadingButton>
      </form>
    </Form>
  );
}

const DEFAULT_VALUE: SignUpFormValue = {
  email: '',
  password: '',
  confirmPassword: '',
};

export type SignUpFormServerErrors = {
  emailAlreadyInUse: boolean;
};

export type SignUpFormProps = {
  onSignUp: (formValue: SignUpFormValue) => void;
  serverErrors: SignUpFormServerErrors;
  isLoading?: boolean;
};
