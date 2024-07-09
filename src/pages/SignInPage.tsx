import SignInForm, { SignInFormServerErrors } from '@components/SignInForm';
import { signIn } from '@lib/auth/signIn';
import { SignInFormValue } from '@lib/form-resolvers/sign-in-form';
import { invalidCredentials } from '@lib/helpers/supabase-errors';
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

const NO_SERVER_ERRORS: SignInFormServerErrors = {
  invalidCredentials: false,
};

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] =
    useState<SignInFormServerErrors>(NO_SERVER_ERRORS);
  const navigate = useNavigate();

  async function handleSignIn({ email, password }: SignInFormValue) {
    setServerErrors(NO_SERVER_ERRORS);

    try {
      setIsLoading(true);
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      if (invalidCredentials(error)) {
        setServerErrors({
          invalidCredentials: true,
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
        <CardTitle>Formularz logowania</CardTitle>
        <CardDescription>
          Ten formularz służy do logowania na istniejące już konto.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm
          onSignIn={handleSignIn}
          serverErrors={serverErrors}
          isLoading={isLoading}
        />
      </CardContent>

      <CardFooter className='justify-center'>
        <p className='text-sm text-muted-foreground'>
          Nie masz jeszcze konta?{' '}
          <Link to='/sign-up' className='text-foreground hover:underline'>
            Załóż konto
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
