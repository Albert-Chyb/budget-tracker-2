import ResetPasswordConfirmationDialog from '@/components/auth/reset-password-confirmation-dialog';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { resetPassword } from '@/lib/auth/reset-password';
import { ResetPasswordFormValue } from '@/lib/form-resolvers/reset-password-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  async function handleResetPassword(value: ResetPasswordFormValue) {
    setIsLoading(true);
    setIsDialogOpened(false);

    await resetPassword(value.email);

    setIsDialogOpened(true);
    setIsLoading(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Zresetuj hasło</CardTitle>
          <CardDescription>
            Na podany adres email zostanie przesłana wiadomość z linkiem
            umożliwiającym odzyskanie dostępu do konta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm
            onResetPassword={handleResetPassword}
            isLoading={isLoading}
          />
        </CardContent>

        <CardFooter className='justify-center text-center'>
          <ul>
            <li>
              <p className='text-muted-foreground'>
                Pamiętasz hasło?{' '}
                <Link to='/sign-in' className='text-foreground hover:underline'>
                  Zaloguj się
                </Link>
              </p>
            </li>

            <li>
              <p className='text-muted-foreground'>
                Nie masz jeszcze konta?{' '}
                <Link to='/sign-up' className='text-foreground hover:underline'>
                  Załóż konto
                </Link>
              </p>
            </li>
          </ul>
        </CardFooter>
      </Card>

      <ResetPasswordConfirmationDialog
        isOpened={isDialogOpened}
        onOpenChange={setIsDialogOpened}
      />
    </>
  );
}
