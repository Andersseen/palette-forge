import { Component } from "@angular/core";

@Component({
  selector: "app-theme-preview",
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4" style="color: rgb(var(--fg) / 1)">
          Theme Preview
        </h2>
        <p class="text-lg opacity-80" style="color: rgb(var(--fg) / 1)">
          See how your generated palette looks in action
        </p>
      </div>

      <!-- Sample Card -->
      <div
        class="p-6 rounded-lg border shadow-sm"
        style="background-color: rgb(var(--bg) / 1); border-color: rgb(var(--fg) / 0.2)"
      >
        <h3
          class="text-xl font-semibold mb-3"
          style="color: rgb(var(--fg) / 1)"
        >
          Sample Card Component
        </h3>
        <p class="mb-4 opacity-70" style="color: rgb(var(--fg) / 1)">
          This demonstrates how your theme will look with typical UI elements.
          The colors automatically maintain proper contrast ratios for
          accessibility.
        </p>

        <div class="flex flex-wrap gap-3">
          <button
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style="background-color: rgb(var(--primary) / 1); color: white; focus:ring-color: rgb(var(--primary) / 1)"
          >
            Primary Action
          </button>

          <button
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style="background-color: rgb(var(--secondary) / 1); color: white; focus:ring-color: rgb(var(--secondary) / 1)"
          >
            Secondary Action
          </button>

          <button
            class="px-4 py-2 rounded-md font-medium border transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style="border-color: rgb(var(--fg) / 0.3); color: rgb(var(--fg) / 1); focus:ring-color: rgb(var(--primary) / 1)"
          >
            Outline Button
          </button>
        </div>
      </div>

      <!-- Sample List -->
      <div
        class="p-6 rounded-lg border shadow-sm"
        style="background-color: rgb(var(--bg) / 1); border-color: rgb(var(--fg) / 0.2)"
      >
        <h3
          class="text-lg font-semibold mb-4"
          style="color: rgb(var(--fg) / 1)"
        >
          Feature List
        </h3>
        <ul class="space-y-2">
          <li class="flex items-center" style="color: rgb(var(--fg) / 1)">
            <span
              class="w-2 h-2 rounded-full mr-3"
              style="background-color: rgb(var(--primary) / 1)"
            ></span>
            WCAG AA contrast compliance
          </li>
          <li class="flex items-center" style="color: rgb(var(--fg) / 1)">
            <span
              class="w-2 h-2 rounded-full mr-3"
              style="background-color: rgb(var(--secondary) / 1)"
            ></span>
            Harmonious color relationships
          </li>
          <li class="flex items-center" style="color: rgb(var(--fg) / 1)">
            <span
              class="w-2 h-2 rounded-full mr-3"
              style="background-color: rgb(var(--primary) / 1)"
            ></span>
            Dark and light mode support
          </li>
        </ul>
      </div>
    </div>
  `,
})
export default class ThemePreview {}
