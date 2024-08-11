import { Theme, ThemeContext } from '@/contexts/theme';
import { Monitor, Moon, Sun, SunMoon } from 'lucide-react';
import { useContext } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type ThemeOption = {
  name: Theme;
  text: string;
  Icon: JSX.Element;
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    name: 'light',
    text: 'Jasny',
    Icon: <Sun className='mr-2 size-4' />,
  },
  {
    name: 'dark',
    text: 'Ciemny',
    Icon: <Moon className='mr-2 size-4' />,
  },
  {
    name: 'device-theme-sync',
    text: 'Domyślny urządzenia',
    Icon: <Monitor className='mr-2 size-4' />,
  },
];

export default function ThemeSwitcher() {
  const theme = useContext(ThemeContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <SunMoon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Motyw aplikacji</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={theme.currentTheme}
          onValueChange={(themeName) => theme.setTo(themeName as Theme)}
        >
          {THEME_OPTIONS.map(({ name, text, Icon }) => (
            <DropdownMenuRadioItem value={name} key={name}>
              {Icon}
              <span>{text}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
