import { Component, input, Input, output } from "@angular/core";

@Component({
  selector: "app-hero-section",
  standalone: true,
  template: `
    <section class="text-center mb-12">
      <button
        class="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg bg-primary text-background"
        (click)="generatePalette.emit()"
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
      <p class="mt-4 text-sm opacity-60">
        {{ isDarkMode() ? "Dark" : "Light" }} mode • WCAG AA compliant •
        Harmonious colors
      </p>
    </section>
  `,
})
export default class HeroSection {
  isDarkMode = input();
  generatePalette = output();
}
