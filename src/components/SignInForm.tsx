import { zodResolver } from '@hookform/resolvers/zod';
import { EMAIL_NOT_FOUND_MESSAGE } from '@lib/schemas/forms/email';
import { PASSWORD_INVALID_MESSAGE } from '@lib/schemas/forms/password';
import {
  SignInFormValue,
  signInFormSchema,
} from '@lib/schemas/forms/signInForm';
import { Button } from '@shadcn/components/ui/button';
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

export default function SignInForm({
  onSignIn,
  serverErrors,
}: SignInFormProps) {
  const form = useForm<SignInFormValue>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: FORM_DEFAULT_VALUE,
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && serverErrors?.emailNotFound) {
      form.setError('email', {
        type: 'server',
        message: EMAIL_NOT_FOUND_MESSAGE,
      });
    }

    if (form.formState.isSubmitSuccessful && serverErrors?.passwordIsInvalid) {
      form.setError('password', {
        type: 'server',
        message: PASSWORD_INVALID_MESSAGE,
      });
    }
  }, [serverErrors, form.formState.isSubmitSuccessful, form]);

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

        <Button data-testid='submit-button' type='submit'>
          Zaloguj się
        </Button>
      </form>
    </Form>
  );
}

const FORM_DEFAULT_VALUE: SignInFormValue = {
  email: '',
  password: '',
};

export type FormErrors = Partial<{
  /** Shows an error with information that the submitted email does not exist in the database */
  emailNotFound: boolean;

  /** Shows an error with information that the submitted password is invalid for submitted email */
  passwordIsInvalid: boolean;
}>;

export type SignInFormProps = {
  onSignIn: (value: SignInFormValue) => void;
  serverErrors?: FormErrors;
};
