import SignUpForm, {
  SignUpFormServerErrors,
} from '@/components/auth/SignUpForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signUp } from '@/lib/auth/signUp';
import { SignUpFormValue } from '@/lib/form-resolvers/sign-up-form';
import { userAlreadyExists } from '@/lib/helpers/supabase-errors';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NO_SERVER_ERRORS: SignUpFormServerErrors = {
  emailAlreadyInUse: false,
};

export default function SignUpPage() {
  const [serverErrors, setServerErrors] = useState(NO_SERVER_ERRORS);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp({ email, password }: SignUpFormValue) {
    try {
      setServerErrors({
        emailAlreadyInUse: false,
      });
      setIsLoading(true);
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      if (userAlreadyExists(error)) {
        setServerErrors({
          emailAlreadyInUse: true,
        });
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarejestruj się</CardTitle>
        <CardDescription>
          Wypełnij poniższe pola, aby założyć konto.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm
          onSignUp={handleSignUp}
          serverErrors={serverErrors}
          isLoading={isLoading}
        />
      </CardContent>

      <CardFooter className='justify-center text-center'>
        <ul>
          <li>
            <p className='text-muted-foreground'>
              Masz już konto ?{' '}
              <Link to='/sign-in' className='text-foreground hover:underline'>
                Zaloguj się
              </Link>
              .
            </p>
          </li>
          <li>
            <p className='text-muted-foreground'>
              Nie pamiętasz hasła?{' '}
              <Link
                to='/reset-password'
                className='text-foreground hover:underline'
              >
                Zresetuj hasło
              </Link>
              .
            </p>
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}
