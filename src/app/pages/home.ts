import {
  Component,
  computed,
  DOCUMENT,
  ElementRef,
  inject,
  viewChild,
} from "@angular/core";
import ColorPalette from "@services/color-palette";

import ColorSwatch from "@components/color-swatch";
import ExportPanel from "@components/export-panel";
import Footer from "@components/footer";
import Header from "@components/header";
import HeroSection from "@components/hero-section";
import ThemePreview from "@components/theme-preview";
import { hexToRgb } from "@shared/utils";

const REVEAL_MS = 300;

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
      class="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <div #overlay id="theme-overlay" aria-hidden="true"></div>

      <div class="blend-contrast flex min-h-screen flex-col">
        <app-header
          [isDarkMode]="isDarkMode()"
          (toggleThemeMode)="toggleThemeMode($event)"
        />

        <main
          class="flex-1 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8"
        >
          <app-hero-section
            [isDarkMode]="isDarkMode()"
            (generatePalette)="generatePalette($event)"
          />

          <section class="mb-8 sm:mb-12">
            <h2 class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Color Palette
            </h2>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              @for (swatch of colorSwatches(); track swatch.cssVar) {
              <app-color-swatch [swatch]="swatch" />
              }
            </div>
          </section>

          <section class="mb-8 sm:mb-12">
            <app-theme-preview />
          </section>

          <section>
            <app-export-panel />
          </section>
        </main>

        <app-footer />
      </div>
    </section>
  `,
})
export default class Home {
  private readonly colorService = inject(ColorPalette);
  private readonly document = inject(DOCUMENT);
  private readonly root = this.document.documentElement;

  overlay = viewChild<ElementRef<HTMLElement>>("overlay");

  isDarkMode = computed(() => this.colorService.mode() === "dark");
  colorSwatches = computed(() => this.colorService.getColorSwatches());

  constructor() {
    this.colorService.generatePalette();
  }

  generatePalette(ev?: MouseEvent): void {
    this.root.style.setProperty("--x", ev ? `${ev.clientX}px` : "50vw");
    this.root.style.setProperty("--y", ev ? `${ev.clientY}px` : "50vh");
    this.colorService.generatePalette();
    this.overlay()!.nativeElement.style.background = `rgba(${hexToRgb(
      this.colorService.theme().primary
    )} / 0.2)`;

    this.root.classList.add("theme-generate-animating");
    setTimeout(() => {
      this.root.classList.remove("theme-generate-animating");
    }, 400);
  }
  toggleThemeMode(ev?: MouseEvent): void {
    this.root.style.setProperty("--x", ev ? `${ev.clientX}px` : "50vw");
    this.root.style.setProperty("--y", ev ? `${ev.clientY}px` : "50vh");
    this.colorService.toggleThemeMode();
    this.overlay()!.nativeElement.style.background = `rgb(${hexToRgb(
      this.colorService.theme().bg
    )})`;
    this.root.classList.add("theme-animating");
    setTimeout(() => {
      this.root.classList.remove("theme-animating");
    }, REVEAL_MS);
  }
}
