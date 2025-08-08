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

export interface OklabColor {
  l: number;
  a: number;
  b: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hsl: string;
  oklab: string;
  cssVar: string;
}

export type ThemeMode = 'light' | 'dark';