import { Component, input, Input, output } from "@angular/core";

@Component({
  selector: "app-header",
  template: `
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
            (click)="toggleThemeMode.emit()"
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
  `,
})
export default class Header {
  isDarkMode = input();
  toggleThemeMode = output();
}
