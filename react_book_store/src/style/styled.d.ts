import 'styled-components'

type ColorKey = 'primary' | 'secondary' | 'third' | 'background' | "border" | 'text';

export type HeadingSize = "large" | "medium" | "small";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | 'normal' | 'like';

export type BorderRadius = "default";

export type ThemeName = 'light' | 'dark';
export type LayoutWidth = 'large' | 'medium' | 'small';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    colors: Record<ColorKey, string>;
    heading: {
      [key in HeadingSize]: {
        fontSize: string;
      };
    };
    button: {
      [key in ButtonSize]: {
        fontSize: string;
        padding: string;
      }
    };
    buttonScheme: {
      [key in ButtonScheme]: {
        color: string;
        backgroundColor: string;
      }
    };
    borderRadius: {
      [key in ButtonRadius]: {
        borderRadius: string;
      }
    };
    layout: {
      width: {
        [key in LayoutWidth]: string;
      }
    }
  }
}
