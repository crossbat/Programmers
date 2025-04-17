import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/Layout/Layout';
import Detail from './pages/Detail';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { light, dark, getTheme } from './style/Theme';
import { ThemeName } from './style/styled';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';

function App() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
