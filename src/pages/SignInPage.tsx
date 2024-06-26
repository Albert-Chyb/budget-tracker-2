import SignInForm, { SignInFormServerErrors } from '@components/SignInForm';
import { SignInFormValue } from '@lib/schemas/forms/signInForm';
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

const NO_SERVER_ERRORS: SignInFormServerErrors = {
  emailNotFound: false,
  passwordIsInvalid: false,
};

export default function SignInPage() {
  const [serverErrors, setServerErrors] =
    useState<SignInFormServerErrors>(NO_SERVER_ERRORS);

  function handleSignIn(formValue: SignInFormValue) {
    setServerErrors(NO_SERVER_ERRORS);
    console.log(formValue);
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
        <SignInForm onSignIn={handleSignIn} serverErrors={serverErrors} />
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
