import { Component, inject, computed } from "@angular/core";
import { ColorService } from "./services/color.service";
import { ThemePreviewComponent } from "./components/theme-preview.component";
import { ColorSwatchComponent } from "./components/color-swatch.component";
import { ExportPanelComponent } from "./components/export-panel.component";

@Component({
  selector: "app-root",
  imports: [ThemePreviewComponent, ColorSwatchComponent, ExportPanelComponent],
  template: `
    <div
      class="min-h-screen transition-colors duration-300 overflow-x-hidden"
      style="background-color: rgb(var(--bg) / 1)"
    >
      <!-- Header -->
      <header class="border-b" style="border-color: rgb(var(--fg) / 0.1)">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold" style="color: rgb(var(--fg) / 1)">
                Palette Forge
              </h1>
              <p
                class="text-lg opacity-70 mt-2"
                style="color: rgb(var(--fg) / 1)"
              >
                Generate cohesive four-color themes instantly
              </p>
            </div>

            <button
              class="p-2 rounded-lg border transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style="border-color: rgb(var(--fg) / 0.3); color: rgb(var(--fg) / 1); focus:ring-color: rgb(var(--primary) / 1)"
              (click)="toggleThemeMode()"
              [title]="
                isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'
              "
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                @if (isDarkMode()) {
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
                } @else {
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Hero Section -->
        <section class="text-center mb-12">
          <button
            class="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg"
            style="background-color: rgb(var(--primary) / 1); color: white; focus:ring-color: rgb(var(--primary) / 0.3)"
            (click)="generatePalette()"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Generate New Palette
          </button>
          <p class="mt-4 text-sm opacity-60" style="color: rgb(var(--fg) / 1)">
            {{ isDarkMode() ? "Dark" : "Light" }} mode • WCAG AA compliant •
            Harmonious colors
          </p>
        </section>

        <!-- Color Swatches -->
        <section class="mb-12">
          <h2
            class="text-2xl font-semibold mb-6"
            style="color: rgb(var(--fg) / 1)"
          >
            Color Palette
          </h2>
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

      <!-- Footer -->
      <footer class="border-t mt-16" style="border-color: rgb(var(--fg) / 0.1)">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p
            class="text-center text-sm opacity-60"
            style="color: rgb(var(--fg) / 1)"
          >
            Built with Angular • Styled with Tailwind CSS • Colors generated
            with HSL harmony
          </p>
        </div>
      </footer>
    </div>
  `,
})
export default class App {
  private colorService = inject(ColorService);

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
