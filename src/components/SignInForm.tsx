import { zodResolver } from '@hookform/resolvers/zod';
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
import { z } from 'zod';

export default function SignInForm({
  onSignIn,
  serverErrors,
}: SignInFormProps) {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
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

  function handleSignIn(formValue: FormValue) {
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

export const EMAIL_REQUIRED_MESSAGE = 'Email jest wymagany';
export const EMAIL_INVALID_MESSAGE = 'To nie jest poprawny email';
export const EMAIL_NOT_FOUND_MESSAGE =
  'Nie istnieje konto powiązane z podanym adresem email';

export const PASSWORD_MIN_LENGTH_MESSAGE =
  'Hasło musi zawierać co najmniej 6 znaków';
export const PASSWORD_REQUIRED_MESSAGE = 'Hasło jest wymagane';
export const PASSWORD_INVALID_MESSAGE = 'Hasło jest niepoprawne';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: EMAIL_REQUIRED_MESSAGE })
    .email({ message: EMAIL_INVALID_MESSAGE }),
  password: z
    .string()
    .min(1, { message: PASSWORD_REQUIRED_MESSAGE })
    .min(6, { message: PASSWORD_MIN_LENGTH_MESSAGE }),
});

const FORM_DEFAULT_VALUE: FormValue = {
  email: '',
  password: '',
};

export type FormValue = z.infer<typeof formSchema>;

export type FormErrors = Partial<{
  /** Shows an error with information that the submitted email does not exist in the database */
  emailNotFound: boolean;

  /** Shows an error with information that the submitted password is invalid for submitted email */
  passwordIsInvalid: boolean;
}>;

export type SignInFormProps = {
  onSignIn: (value: FormValue) => void;
  serverErrors?: FormErrors;
};
