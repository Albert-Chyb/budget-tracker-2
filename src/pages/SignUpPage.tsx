import SignUpForm, { SignUpFormServerErrors } from '@components/SignUpForm';
import { signUp } from '@lib/auth/signUp';
import { SignUpFormValue } from '@lib/form-resolvers/sign-up-form';
import { userAlreadyExists } from '@lib/helpers/supabase-errors';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [serverErrors, setServerErrors] = useState<SignUpFormServerErrors>({
    emailAlreadyInUse: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp({ email, password }: SignUpFormValue) {
    setServerErrors({
      emailAlreadyInUse: false,
    });

    try {
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

      <CardFooter className='justify-center'>
        <p className='text-sm text-muted-foreground'>
          Masz już konto ?{' '}
          <Link to='/sign-in' className='text-foreground hover:underline'>
            Zaloguj się
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
