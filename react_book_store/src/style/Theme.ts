import { DefaultTheme } from "styled-components";
import { ThemeName } from "./styled";
import { HeadingSize } from "./styled";

export const light: DefaultTheme = {
  name: 'light',
  colors: {
    primary: '#ff5800',
    background: 'lightgray',
    secondary: '#5f5f5f',
    third: 'green',
    border: 'gray',
    text: 'black'
  },
  heading: {
    large: {
      fontSize: "2rem"
    },
    medium: {
      fontSize: "1.5rem"
    },
    small: {
      fontSize: "1rem"
    },
  },
  button: {
    large: {
      fontSize: "1.5rem",
      padding: '1rem 2rem',
    },
    medium: {
      fontSize: "1rem",
      padding: '0.5rem 1rem',
    },
    small: {
      fontSize: "0.75rem",
      padding: '0.25rem 0.5rem',
    },
  },
  buttonScheme: {
    primary: {
      color: 'white',
      backgroundColor: 'midnightblue'
    },
    normal: {
      color: 'black',
      backgroundColor: 'lightgray'
    },
    like: {
      color: 'white',
      backgroundColor: 'coral'
    },
  },
  borderRadius: {
    default: {
      borderRadius: '4px'
    }
  },
  layout: {
    width: {
      large: '1020px',
      medium: '760px',
      small: '320px'
    }
  }
};

export const dark: DefaultTheme = {
  ...light,
  name: 'dark',
  colors: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    third: 'darkgreen',
    border: 'gray',
    text: 'black'
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
