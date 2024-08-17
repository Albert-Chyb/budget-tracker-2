import {
  Theme,
  ThemeContext,
  ThemeProvider,
  THEMES_CSS_CLASSES,
} from '@/contexts/theme';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('ThemeProvider', () => {
  /** Renders all elements required for testing  */
  let renderThemeProvider: (theme?: Theme) => void;

  /** Reads current theme from a consumer */
  let readCurrentTheme: () => Theme;

  /** Changes the theme from a consumer */
  let changeTheme: (theme: Theme) => void;

  beforeEach(() => {
    renderThemeProvider = (theme?: Theme) => {
      render(
        <ThemeProvider defaultTheme={theme}>
          <ThemeContext.Consumer>
            {({ currentTheme, setTo }) => {
              changeTheme = setTo;

              return (
                <div
                  data-testid='theme-context-consumer'
                  data-current-theme={currentTheme}
                />
              );
            }}
          </ThemeContext.Consumer>
        </ThemeProvider>
      );
    };

    afterEach(() => {
      for (const themeClass of THEMES_CSS_CLASSES) {
        document.documentElement.classList.remove(themeClass);
      }
    });

    readCurrentTheme = () => {
      return screen
        .getByTestId('theme-context-consumer')
        .getAttribute('data-current-theme') as Theme;
    };
  });

  it('should sync to device theme by default', () => {
    renderThemeProvider();

    expect(readCurrentTheme()).toBe('device-theme-sync');
  });

  it('should allow a consumer to read current theme', () => {
    renderThemeProvider('dark');

    expect(readCurrentTheme()).toBe('dark');
  });

  it('should allow a consumer to change the current theme', async () => {
    renderThemeProvider('dark');
    changeTheme('device-theme-sync');

    await waitFor(() => expect(readCurrentTheme()).toBe('device-theme-sync'));
  });

  it('should add a CSS class to the <html> element when the light theme is chosen', async () => {
    renderThemeProvider('light');

    await waitFor(() => expect(document.documentElement).toHaveClass('light'));
  });

  it('should add a CSS class to the <html> element when the dark theme is chosen', async () => {
    renderThemeProvider('dark');

    await waitFor(() => expect(document.documentElement).toHaveClass('dark'));
  });

  it('should add a CSS class to the <html> element when synchronizing with device theme is enabled', async () => {
    renderThemeProvider('device-theme-sync');

    await waitFor(() =>
      expect(document.documentElement).toHaveClass('device-theme-sync')
    );
  });

  it('should remove previous theme`s CSS class when changing to a new theme', async () => {
    renderThemeProvider('dark');
    changeTheme('light');

    await waitFor(() =>
      expect(document.documentElement).not.toHaveClass('dark')
    );
  });
});
