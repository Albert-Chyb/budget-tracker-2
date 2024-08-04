import { UserContext } from '@/contexts/user-context';
import { useContext } from 'react';
import { Link, To, useMatch } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

export function Header() {
  const user = useContext(UserContext);

  let navigationMenuList: JSX.Element;

  if (!user) {
    navigationMenuList = (
      <NavigationMenuList>
        <HeaderNavigationItem to='sign-up' text='Zarejestruj się' />
        <HeaderNavigationItem to='sign-in' text='Zaloguj się' />
        <HeaderNavigationItem to='reset-password' text='Zresetuj hasło' />
      </NavigationMenuList>
    );
  } else {
    navigationMenuList = (
      <NavigationMenuList>
        <HeaderNavigationItem to='sign-out' text='Wyloguj się' />
      </NavigationMenuList>
    );
  }

  return (
    <header className='h-[number:var(--header-height)] p-6 flex items-center fixed top-0 left-0 right-0 backdrop-blur-lg border-b-2'>
      <Link to='/' className='mr-6'>
        <h1 className='font-bold text-lg'>Monitor budżetu</h1>
      </Link>

      <NavigationMenu className='ml-auto'>{navigationMenuList}</NavigationMenu>
    </header>
  );
}

function HeaderNavigationItem({ to, text }: HeaderNavigationItemProps) {
  const matchPath = useMatch(to as string);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Button
          asChild
          variant='ghost'
          className={!matchPath ? 'text-muted-foreground' : ''}
        >
          <Link to={to}>{text}</Link>
        </Button>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

interface HeaderNavigationItemProps {
  to: To;
  text: string;
}
