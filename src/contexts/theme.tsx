import { useLocalStorage } from '@/hooks/local-storage';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { z } from 'zod';

/**
 * The default theme for the application.
 */
const DEFAULT_THEME: Theme = 'dark';

/**
 * React context for managing the application's theme and syncing it with the device's theme.
 * Provides the current theme, sync state, and functions to change the theme or enable/disable sync.
 */
export const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: DEFAULT_THEME,
  setTo() {},
});

/**
 * A React provider component that manages the theme of the application.
 * The provider also handles adding/removing the theme class to/from the document's root element.
 *
 * @param props The component's props, including children to be rendered within the provider.
 * @returns The ThemeContext provider component with the application theme state.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [appTheme, setAppTheme] = useLocalStorage({
    key: 'theme',
    initialValue: DEFAULT_THEME,
    zodSchema: ThemesEnumSchema,
  });

  useEffect(() => {
    document.documentElement.classList.add(appTheme);

    return () => {
      document.documentElement.classList.remove(appTheme);
    };
  }, [appTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: appTheme,
        setTo: setAppTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * A Zod schema that defines the allowed theme values.
 * The values are also CSS classes that are applied to the `<html>` tag.
 */
export const ThemesEnumSchema = z.enum(['dark', 'light', 'device-theme-sync']);
/**
 * Type representing the application's theme.
 */
export type Theme = z.infer<typeof ThemesEnumSchema>;

/**
 * The context value type for the ThemeContext.
 */
export type ThemeContextValue = {
  /** Current theme */
  currentTheme: Theme;

  /** Changes the theme */
  setTo: (theme: Theme) => void;
};
