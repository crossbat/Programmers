import 'styled-components'

type ColorKey = 'primary' | 'secondary' | 'third' | 'background';

export type ThemeName = 'light' | 'dark';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    colors: Record<ColorKey, string>
  }
}
