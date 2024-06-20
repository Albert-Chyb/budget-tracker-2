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
    if (serverErrors?.emailNotFound) {
      form.setError('email', {
        type: 'server',
        message: 'Nie istnieje konto powiązane z podanym adresem email',
      });
    }

    if (serverErrors?.passwordIsInvalid) {
      form.setError('password', {
        type: 'server',
        message: 'Hasło jest niepoprawne',
      });
    }
  }, [serverErrors]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSignIn)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input type='email' placeholder='Twój adres email' {...field} />
              </FormControl>

              <FormMessage />
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
                  type='password'
                  placeholder='Hasło do twojego konta'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Zaloguj się</Button>
      </form>
    </Form>
  );
}

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email jest wymagany' })
    .email({ message: 'To nie jest poprawny email' }),
  password: z
    .string()
    .min(6, { message: 'Hasło musi zawierać co najmniej 6 znaków' }),
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
