import { Link, To, useMatch } from 'react-router-dom';
import { Button } from '../ui/button';
import { NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu';

export default function HeaderNavigationItem({
  to,
  text,
}: HeaderNavigationItemProps) {
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

export interface HeaderNavigationItemProps {
  to: To;
  text: string;
}
