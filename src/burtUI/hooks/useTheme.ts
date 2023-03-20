import { useEffect } from 'react';
import defaultTheme from '../styles/themes';

type ThemeType = Record<string, string>;

const useTheme = (theme: ThemeType = {}) => {
  useEffect(() => {
    const fullTheme = {
      ...defaultTheme,
      ...theme,
    }

    // Update CSS custom properties for the current theme
    for (const [key, value] of Object.entries(fullTheme)) {
      document.documentElement.style.setProperty(`${key}`, value);
    }
  }, [theme]);
}

export default useTheme;

