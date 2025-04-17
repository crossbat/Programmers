import { createContext, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";
import { ThemeName } from "../style/styled";
import { getTheme, light } from "../style/Theme";

const THEME_LOCALSTORAGE_KEY = 'book_store_theme'

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => { }
}

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === 'light' ? 'dark' : 'light')
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
    setThemeName(savedThemeName || 'light');
  }, [])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <GlobalStyle themeName={themeName} />
      <ThemeProvider theme={getTheme(themeName)}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
