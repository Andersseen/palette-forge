import { Injectable, signal, computed } from '@angular/core';
import { Theme, HSLColor, ColorSwatch, ThemeMode, OklabColor } from '../types/theme.types';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private currentTheme = signal<Theme>({
    bg: '#ffffff',
    fg: '#1a1a1a',
    primary: '#3b82f6',
    secondary: '#10b981'
  });

  private themeMode = signal<ThemeMode>('light');

  // Public computed signals
  theme = computed(() => this.currentTheme());
  mode = computed(() => this.themeMode());

  constructor() {
    // Auto-detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setThemeMode(prefersDark ? 'dark' : 'light');
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.setThemeMode(e.matches ? 'dark' : 'light');
    });
  }

  /**
   * Converts HSL to HEX color format
   */
  private hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  /**
   * Converts HEX to HSL color format
   */
  private hexToHsl(hex: string): HSLColor {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  /**
   * Converts HEX to Oklab color format
   */
  private hexToOklab(hex: string): OklabColor {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    // Convert to linear RGB
    const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    r = linear(r);
    g = linear(g);
    b = linear(b);

    // Convert to LMS
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    return {
      l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
      a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
      b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    };
  }

  /**
   * Calculates contrast ratio between two colors
   */
  private calculateContrast(color1: string, color2: string): number {
    const getLuminance = (hex: string) => {
      const rgb = [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
      ].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Generates a harmonious color palette using HSL color theory
   */
  generatePalette(): void {
    // Generate base hue (0-360)
    const baseHue = Math.floor(Math.random() * 360);
    
    // Create complementary and triadic colors for harmony
    const primaryHue = baseHue;
    const secondaryHue = (baseHue + 120) % 360; // Triadic harmony
    
    let bgColor: string;
    let fgColor: string;
    let primaryColor: string;
    let secondaryColor: string;

    if (this.themeMode() === 'light') {
      // Light mode: light background, dark text
      bgColor = this.hslToHex(baseHue, 10, 98); // Very light, subtle hue
      fgColor = this.hslToHex(baseHue, 20, 15); // Very dark with slight hue tint
      primaryColor = this.hslToHex(primaryHue, 70, 50);
      secondaryColor = this.hslToHex(secondaryHue, 65, 45);

      // Ensure WCAG AA contrast (4.5:1 minimum)
      while (this.calculateContrast(bgColor, fgColor) < 4.5) {
        const fgHsl = this.hexToHsl(fgColor);
        fgColor = this.hslToHex(fgHsl.h, fgHsl.s, Math.max(fgHsl.l - 5, 0));
      }
    } else {
      // Dark mode: dark background, light text
      bgColor = this.hslToHex(baseHue, 20, 8); // Very dark with subtle hue
      fgColor = this.hslToHex(baseHue, 15, 95); // Very light with slight hue tint
      primaryColor = this.hslToHex(primaryHue, 60, 65);
      secondaryColor = this.hslToHex(secondaryHue, 55, 60);

      // Ensure WCAG AA contrast
      while (this.calculateContrast(bgColor, fgColor) < 4.5) {
        const fgHsl = this.hexToHsl(fgColor);
        fgColor = this.hslToHex(fgHsl.h, fgHsl.s, Math.min(fgHsl.l + 5, 100));
      }
    }

    this.currentTheme.set({
      bg: bgColor,
      fg: fgColor,
      primary: primaryColor,
      secondary: secondaryColor
    });

    this.updateCSSVariables();
  }

  /**
   * Toggles between light and dark theme modes
   */
  toggleThemeMode(): void {
    const newMode = this.themeMode() === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  /**
   * Sets the theme mode and regenerates the palette
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    this.generatePalette();
  }

  /**
   * Updates CSS custom properties with current theme
   */
  private updateCSSVariables(): void {
    const theme = this.currentTheme();
    const root = document.documentElement;
    
    // Convert hex to RGB values for better CSS variable usage
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r} ${g} ${b}`;
    };

    root.style.setProperty('--bg', hexToRgb(theme.bg));
    root.style.setProperty('--fg', hexToRgb(theme.fg));
    root.style.setProperty('--primary', hexToRgb(theme.primary));
    root.style.setProperty('--secondary', hexToRgb(theme.secondary));
  }

  /**
   * Gets color swatches for display
   */
  getColorSwatches(): ColorSwatch[] {
    const theme = this.currentTheme();
    return [
      {
        name: 'Background',
        hex: theme.bg,
        hsl: this.formatHSL(this.hexToHsl(theme.bg)),
        oklab: this.formatOklab(this.hexToOklab(theme.bg)),
        cssVar: '--bg'
      },
      {
        name: 'Foreground',
        hex: theme.fg,
        hsl: this.formatHSL(this.hexToHsl(theme.fg)),
        oklab: this.formatOklab(this.hexToOklab(theme.fg)),
        cssVar: '--fg'
      },
      {
        name: 'Primary',
        hex: theme.primary,
        hsl: this.formatHSL(this.hexToHsl(theme.primary)),
        oklab: this.formatOklab(this.hexToOklab(theme.primary)),
        cssVar: '--primary'
      },
      {
        name: 'Secondary',
        hex: theme.secondary,
        hsl: this.formatHSL(this.hexToHsl(theme.secondary)),
        oklab: this.formatOklab(this.hexToOklab(theme.secondary)),
        cssVar: '--secondary'
      }
    ];
  }

  /**
   * Formats HSL values for display
   */
  private formatHSL(hsl: HSLColor): string {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  /**
   * Formats Oklab values for display
   */
  private formatOklab(oklab: OklabColor): string {
    return `oklab(${oklab.l.toFixed(3)} ${oklab.a.toFixed(3)} ${oklab.b.toFixed(3)})`;
  }

  /**
   * Gets Tailwind config extension object
   */
  getTailwindConfig(): string {
    const theme = this.currentTheme();
    const config = {
      theme: {
        extend: {
          colors: {
            'theme-bg': 'rgb(var(--bg) / <alpha-value>)',
            'theme-fg': 'rgb(var(--fg) / <alpha-value>)',
            'theme-primary': 'rgb(var(--primary) / <alpha-value>)',
            'theme-secondary': 'rgb(var(--secondary) / <alpha-value>)'
          }
        }
      }
    };
    return JSON.stringify(config, null, 2);
  }
}