import { Injectable, signal, computed } from "@angular/core";
import type {
  Theme,
  HSLColor,
  ColorSwatchType,
  ThemeMode,
  OklabColor,
} from "@shared/types";
import {
  calculateContrast,
  hexToHsl,
  hexToOklab,
  hexToRgb,
  hslToHex,
} from "@shared/utils";

@Injectable()
export default class ColorPalette {
  private currentTheme = signal<Theme>({
    bg: "#ffffff",
    fg: "#1a1a1a",
    primary: "#3b82f6",
    secondary: "#10b981",
  });

  private themeMode = signal<ThemeMode>("light");

  // Public computed signals
  theme = computed(() => this.currentTheme());
  mode = computed(() => this.themeMode());

  constructor() {
    // Auto-detect system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    this.setThemeMode(prefersDark ? "dark" : "light");

    // Listen for system preference changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.setThemeMode(e.matches ? "dark" : "light");
      });
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

    if (this.themeMode() === "light") {
      // Light mode: light background, dark text
      bgColor = hslToHex(baseHue, 10, 98); // Very light, subtle hue
      fgColor = hslToHex(baseHue, 20, 15); // Very dark with slight hue tint
      primaryColor = hslToHex(primaryHue, 70, 50);
      secondaryColor = hslToHex(secondaryHue, 65, 45);

      // Ensure WCAG AA contrast (4.5:1 minimum)
      while (calculateContrast(bgColor, fgColor) < 4.5) {
        const fgHsl = hexToHsl(fgColor);
        fgColor = hslToHex(fgHsl.h, fgHsl.s, Math.max(fgHsl.l - 5, 0));
      }
    } else {
      // Dark mode: dark background, light text
      bgColor = hslToHex(baseHue, 20, 8); // Very dark with subtle hue
      fgColor = hslToHex(baseHue, 15, 95); // Very light with slight hue tint
      primaryColor = hslToHex(primaryHue, 60, 65);
      secondaryColor = hslToHex(secondaryHue, 55, 60);

      // Ensure WCAG AA contrast
      while (calculateContrast(bgColor, fgColor) < 4.5) {
        const fgHsl = hexToHsl(fgColor);
        fgColor = hslToHex(fgHsl.h, fgHsl.s, Math.min(fgHsl.l + 5, 100));
      }
    }

    this.currentTheme.set({
      bg: bgColor,
      fg: fgColor,
      primary: primaryColor,
      secondary: secondaryColor,
    });

    this.updateCSSVariables();
  }

  /**
   * Toggles between light and dark theme modes
   */
  toggleThemeMode(): void {
    const newMode = this.themeMode() === "light" ? "dark" : "light";
    this.setThemeMode(newMode);
  }

  /**
   * Sets the theme mode and regenerates the palette
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
    this.generatePalette();
  }

  /**
   * Updates CSS custom properties with current theme
   */
  private updateCSSVariables(): void {
    const theme = this.currentTheme();
    const root = document.documentElement;

    root.style.setProperty("--bg", hexToRgb(theme.bg));
    root.style.setProperty("--fg", hexToRgb(theme.fg));
    root.style.setProperty("--primary", hexToRgb(theme.primary));
    root.style.setProperty("--secondary", hexToRgb(theme.secondary));
  }

  /**
   * Gets color swatches for display
   */
  getColorSwatches(): ColorSwatchType[] {
    const theme = this.currentTheme();
    return [
      {
        name: "Background",
        hex: theme.bg,
        hsl: this.formatHSL(hexToHsl(theme.bg)),
        oklab: this.formatOklab(hexToOklab(theme.bg)),
        cssVar: "--bg",
      },
      {
        name: "Foreground",
        hex: theme.fg,
        hsl: this.formatHSL(hexToHsl(theme.fg)),
        oklab: this.formatOklab(hexToOklab(theme.fg)),
        cssVar: "--fg",
      },
      {
        name: "Primary",
        hex: theme.primary,
        hsl: this.formatHSL(hexToHsl(theme.primary)),
        oklab: this.formatOklab(hexToOklab(theme.primary)),
        cssVar: "--primary",
      },
      {
        name: "Secondary",
        hex: theme.secondary,
        hsl: this.formatHSL(hexToHsl(theme.secondary)),
        oklab: this.formatOklab(hexToOklab(theme.secondary)),
        cssVar: "--secondary",
      },
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
    return `oklab(${oklab.l.toFixed(3)} ${oklab.a.toFixed(3)} ${oklab.b.toFixed(
      3
    )})`;
  }

  /**
   * Gets Tailwind config extension object
   */
  getTailwindConfig(): string {
    return `
 @theme {
  --color-background: rgb(var(--bg));
  --color-foreground: rgb(var(--fg));
  --color-primary: rgb(var(--primary));
  --color-secondary: rgb(var(--secondary));
}
  }`;
  }
}
