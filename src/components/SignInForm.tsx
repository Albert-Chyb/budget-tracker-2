import { zodResolver } from '@hookform/resolvers/zod';
import {
  INVALID_CREDENTIALS_MESSAGE,
  SignInFormValue,
  signInFormSchema,
} from '@lib/schemas/forms/signInForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/components/ui/form';
import { Input } from '@shadcn/components/ui/input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormRootMessage from './FormRootMessage';
import { LoadingButton } from './LoadingButton';

export default function SignInForm({
  onSignIn,
  serverErrors,
  isLoading = false,
}: SignInFormProps) {
  const form = useForm<SignInFormValue>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: FORM_DEFAULT_VALUE,
  });

  useEffect(() => {
    if (serverErrors.invalidCredentials) {
      form.setError('root', {
        type: 'server',
        message: INVALID_CREDENTIALS_MESSAGE,
      });
    }
  }, [serverErrors, form]);

  function handleSignIn(formValue: SignInFormValue) {
    onSignIn(formValue);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
        className='flex flex-col gap-4'
        data-testid='sign-in-form'
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

              <FormMessage data-testid='password-error-message' />
            </FormItem>
          )}
        />

        <FormRootMessage />

        <LoadingButton
          data-testid='submit-button'
          type='submit'
          isLoading={isLoading}
        >
          Zaloguj się
        </LoadingButton>
      </form>
    </Form>
  );
}

const FORM_DEFAULT_VALUE: SignInFormValue = {
  email: '',
  password: '',
};

export type SignInFormServerErrors = {
  invalidCredentials: boolean;
};

export type SignInFormProps = {
  onSignIn: (value: SignInFormValue) => void;
  serverErrors: SignInFormServerErrors;
  isLoading?: boolean;
};
