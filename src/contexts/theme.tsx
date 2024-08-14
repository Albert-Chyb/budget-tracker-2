import { useLocalStorage } from '@/hooks/local-storage';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { z } from 'zod';

/**
 * The default theme for the application.
 *
 * This theme is used when no other theme is stored in local storage.
 */
export const DEFAULT_THEME: Theme = 'device-theme-sync';

/**
 * React context for managing the application's theme and syncing it with the device's theme.
 * Provides the current theme and function to change the theme.
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
export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
}: ThemeProviderProps) {
  const [appTheme, setAppTheme] = useLocalStorage({
    key: 'theme',
    initialValue: defaultTheme,
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
 * An array of valid CSS class names that correspond to the different themes available and are applied to the `<html>` tag
 * to change the application's theme.
 */
export const THEMES_CSS_CLASSES = [
  'dark',
  'light',
  'device-theme-sync',
] as const;

/**
 * A Zod schema that defines the allowed theme values.
 * The values are also CSS classes that are applied to the `<html>` tag.
 */
export const ThemesEnumSchema = z.enum(THEMES_CSS_CLASSES);

/**
 * Type representing the application's theme.
 */
export type Theme = z.infer<typeof ThemesEnumSchema>;

/**
 * The props for the ThemeProvider component.
 */
export type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme;
}>;

/**
 * The context value type for the ThemeContext.
 */
export type ThemeContextValue = {
  /** Current theme */
  currentTheme: Theme;

  /** Changes the theme */
  setTo: (theme: Theme) => void;
};
