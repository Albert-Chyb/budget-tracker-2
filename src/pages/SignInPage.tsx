import SignInForm from '@components/SignInForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Link } from 'react-router-dom';
import { SignInFormValue } from '../schemas/forms/signInForm';

export default function SignInPage() {
  function handleSignIn(formValue: SignInFormValue) {
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
        <SignInForm onSignIn={handleSignIn} />
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
