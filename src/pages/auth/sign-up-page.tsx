import SignUpForm, {
  SignUpFormServerErrors,
} from '@/components/auth/sign-up-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSignUpMutation } from '@/lib/auth/sign-up';
import { SignUpFormValue } from '@/lib/form-resolvers/sign-up-form';
import { userAlreadyExists } from '@/lib/helpers/supabase-errors';
import { Link, useNavigate } from 'react-router-dom';

export const NO_SERVER_ERRORS: SignUpFormServerErrors = {
  emailAlreadyInUse: false,
};

function deriveServerErrors(error: unknown): SignUpFormServerErrors {
  if (!error) {
    return NO_SERVER_ERRORS;
  }

  if (userAlreadyExists(error)) {
    return {
      emailAlreadyInUse: true,
    };
  } else {
    throw error;
  }
}

export default function SignUpPage() {
  const { mutate: signUp, isPending, error } = useSignUpMutation();
  const navigate = useNavigate();

  function handleSignUp({ email, password }: SignUpFormValue) {
    signUp(
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
        <CardTitle>Zarejestruj się</CardTitle>
        <CardDescription>
          Wypełnij poniższe pola, aby założyć konto.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm
          onSignUp={handleSignUp}
          serverErrors={serverErrors}
          isLoading={isPending}
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
