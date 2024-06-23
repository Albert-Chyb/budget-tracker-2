import SignUpForm from '@components/SignUpForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Link } from 'react-router-dom';
import { SignUpFormValue } from '../schemas/forms/signUpForm';

export default function SignUpPage() {
  function handleSignUp(value: SignUpFormValue) {
    console.log(value);
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
        <SignUpForm onSignUp={handleSignUp} />
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
