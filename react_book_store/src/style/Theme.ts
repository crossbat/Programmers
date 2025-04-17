import { DefaultTheme } from "styled-components";
import { ThemeName } from "./styled";

export const light: DefaultTheme = {
  name: 'light',
  colors: {
    primary: 'brown',
    background: 'lightgray',
    secondary: 'blue',
    third: 'green'
  },
};

export const dark: DefaultTheme = {
  name: 'dark',
  colors: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    third: 'darkgreen'
  },
};

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
}
