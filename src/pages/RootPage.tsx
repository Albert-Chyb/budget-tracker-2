import { Button } from '@/components/ui/button';
import { UserContext } from '@contexts/user-context';
import { signOut } from '@lib/auth/signOut';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function RootPage() {
  const user = useContext(UserContext);

  function handleSignOutClick() {
    signOut();
  }

  return (
    <>
      {!user && (
        <nav>
          <ul>
            <li>
              <Button asChild variant='link'>
                <Link to='sign-up'>Zarejestruj się</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant='link'>
                <Link to='sign-in'>Zaloguj się</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant='link'>
                <Link to='reset-password'>Zresetuj hasło</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}

      {user && <Button onClick={handleSignOutClick}>Wyloguj się</Button>}

      <main className='container'>
        <Outlet />

        <pre>{JSON.stringify(user, undefined, '\t')}</pre>
      </main>
    </>
  );
}
