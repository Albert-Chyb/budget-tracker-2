import SignUpForm, { SignUpFormServerErrors } from '@components/SignUpForm';
import { SignUpFormValue } from '@lib/schemas/forms/signUpForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [serverErrors, setServerErrors] = useState<SignUpFormServerErrors>({
    emailAlreadyInUse: false,
  });

  function handleSignUp(value: SignUpFormValue) {
    setServerErrors({
      emailAlreadyInUse: false,
    });

    console.log('Creating an account with ' + value);
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
        <SignUpForm onSignUp={handleSignUp} serverErrors={serverErrors} />
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
