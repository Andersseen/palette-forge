import { Component, inject, computed } from "@angular/core";
import ColorPalette from "@services/color-palette";

import Footer from "@components/footer";
import Header from "@components/header";
import HeroSection from "@components/hero-section";
import ColorSwatch from "@components/color-swatch";
import ExportPanel from "@components/export-panel";
import ThemePreview from "@components/theme-preview";

@Component({
  selector: "app-home",
  imports: [
    ThemePreview,
    ColorSwatch,
    ExportPanel,
    Header,
    HeroSection,
    Footer,
  ],
  providers: [ColorPalette],
  template: `
    <section
      class="min-h-screen transition-colors duration-300 overflow-x-hidden bg-background text-foreground"
    >
      <app-header
        [isDarkMode]="isDarkMode()"
        (toggleThemeMode)="toggleThemeMode()"
      />

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <app-hero-section
          [isDarkMode]="isDarkMode()"
          (generatePalette)="generatePalette()"
        />

        <!-- Color Swatches -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold mb-6">Color Palette</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (swatch of colorSwatches(); track swatch.cssVar) {
            <app-color-swatch [swatch]="swatch" />
            }
          </div>
        </section>

        <!-- Theme Preview -->
        <section class="mb-12">
          <app-theme-preview />
        </section>

        <!-- Export Configuration -->
        <section>
          <app-export-panel />
        </section>
      </main>

      <app-footer />
    </section>
  `,
})
export default class Home {
  private colorService = inject(ColorPalette);

  // Computed properties for template
  isDarkMode = computed(() => this.colorService.mode() === "dark");
  colorSwatches = computed(() => this.colorService.getColorSwatches());

  constructor() {
    // Generate initial palette
    this.colorService.generatePalette();
  }

  generatePalette(): void {
    this.colorService.generatePalette();
  }

  toggleThemeMode(): void {
    this.colorService.toggleThemeMode();
  }
}
