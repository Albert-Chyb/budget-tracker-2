import SignInForm, {
  SignInFormServerErrors,
} from '@/components/auth/sign-in-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSignInMutation } from '@/lib/auth/sign-in';
import { SignInFormValue } from '@/lib/form-resolvers/sign-in-form';
import { invalidCredentials } from '@/lib/helpers/supabase-errors';
import { Link, useNavigate } from 'react-router-dom';

function deriveServerErrors(error: unknown): SignInFormServerErrors {
  if (!error) {
    return {
      invalidCredentials: false,
    };
  }

  if (invalidCredentials(error)) {
    return {
      invalidCredentials: true,
    };
  } else {
    throw error;
  }
}

export default function SignInPage() {
  const { mutate: signIn, isPending, error } = useSignInMutation();
  const navigate = useNavigate();

  function handleSignIn({ email, password }: SignInFormValue) {
    signIn(
      { email, password },
      {
        onSuccess() {
          navigate('/');
        },
      }
    );
  }

  const serverErrors = deriveServerErrors(error);

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
          isLoading={isPending}
        />
      </CardContent>

      <CardFooter className='justify-center text-center'>
        <ul>
          <li>
            <p className='text-muted-foreground'>
              Nie masz jeszcze konta?{' '}
              <Link to='/sign-up' className='text-foreground hover:underline'>
                Załóż konto
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
