export interface Theme {
  bg: string;
  fg: string;
  primary: string;
  secondary: string;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hsl: string;
  cssVar: string;
}

export type ThemeMode = 'light' | 'dark';