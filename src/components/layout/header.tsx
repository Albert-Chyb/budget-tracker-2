import { UserContext } from '@/contexts/user-context';
import { useSignOutMutation } from '@/lib/auth/sign-out';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignOutAlertDialog from '../auth/sign-out-alert-dialog';
import ThemeSwitcher from '../theme-switcher';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import HeaderNavigationItem from './header-navigation-item';

export function Header() {
  const { mutate: signOut } = useSignOutMutation();
  const { user } = useContext(UserContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <header className='h-[var(--header-height)] px-[var(--screen-edge-spacing)] flex items-center fixed top-0 left-0 right-0 backdrop-blur-lg border-b-2'>
      <Link to='/' className='mr-6'>
        <h1 className='font-bold text-lg'>Monitor budżetu</h1>
      </Link>

      <div className='ml-auto flex gap-x-2'>
        {!user && (
          <NavigationMenu>
            <NavigationMenuList>
              <HeaderNavigationItem to='sign-up' text='Zarejestruj się' />
              <HeaderNavigationItem to='sign-in' text='Zaloguj się' />
              <HeaderNavigationItem to='reset-password' text='Zresetuj hasło' />
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {user && <SignOutAlertDialog onConfirm={handleSignOut} />}

        <ThemeSwitcher />
      </div>
    </header>
  );
}
