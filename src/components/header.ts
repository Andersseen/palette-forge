import { Component, input, Input, output } from "@angular/core";
import ThemeSwitcher from "./theme-switcher";

@Component({
  selector: "app-header",
  template: `
    <header class="border-b border-b-foreground/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold">Palette Forge</h1>
            <p class="text-lg opacity-70 mt-2">
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
            <theme-switcher [isDarkMode]="isDarkMode()" />
          </button>
        </div>
      </div>
    </header>
  `,
  imports: [ThemeSwitcher],
})
export default class Header {
  isDarkMode = input();
  toggleThemeMode = output();
}
