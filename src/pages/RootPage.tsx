import { Button } from '@shadcn/components/ui/button';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function RootPage() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button onClick={() => setCount((oldCount) => oldCount + 1)}>
        Test {count}
      </Button>

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
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
