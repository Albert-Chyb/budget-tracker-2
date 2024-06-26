import { zodResolver } from '@hookform/resolvers/zod';
import { EMAIL_ALREADY_IN_USE_MESSAGE } from '@lib/schemas/forms/email';
import {
  SignUpFormValue,
  signUpFormSchema,
} from '@lib/schemas/forms/signUpForm';
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

/*
 * Write tests to this form
 * Write a module with necessary function to authenticate user
 * Use react router actions to handle forms submits
 */

export default function SignUpForm({
  onSignUp,
  serverErrors,
}: SignUpFormProps) {
  const form = useForm<SignUpFormValue>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: DEFAULT_VALUE,
  });

  function handleSubmit(value: SignUpFormValue) {
    onSignUp(value);
  }

  useEffect(() => {
    if (serverErrors?.emailAlreadyInUse) {
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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź hasło</FormLabel>

              <FormControl>
                <Input
                  type='password'
                  placeholder='Wpisz ponownie swoje hasło'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Stwórz konto</Button>
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
};
