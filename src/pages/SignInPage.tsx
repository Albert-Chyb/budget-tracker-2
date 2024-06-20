import { Button } from '@shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Link } from 'react-router-dom';
import SignInForm, {
  FormValue as SignInFormValue,
} from '../components/SignInForm';

export default function SignInPage() {
  function handleSignIn(formValue: SignInFormValue) {
    console.log(formValue);
  }

  const CreateAccountLink = (
    <Button variant='link' asChild className='m-0 p-0 h-0'>
      <Link to='/sign-up'>złóż je tutaj</Link>
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formularz logowania</CardTitle>
        <CardDescription>
          Ten formularz służy do logowania na istniejące już konto. Jeżeli nie
          masz jeszcze konta - {CreateAccountLink}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm onSignIn={handleSignIn} />
      </CardContent>
    </Card>
  );
}
