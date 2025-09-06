import { Component } from "@angular/core";

@Component({
  selector: "app-theme-preview",
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">Theme Preview</h2>
        <p class="text-lg opacity-80">
          See how your generated palette looks in action
        </p>
      </div>

      <!-- Sample Card -->
      <div class="p-6 rounded-lg border shadow-sm border-foreground/20">
        <h3 class="text-xl font-semibold mb-3">Sample Card Component</h3>
        <p class="mb-4 opacity-70">
          This demonstrates how your theme will look with typical UI elements.
          The colors automatically maintain proper contrast ratios for
          accessibility.
        </p>

        <div class="flex flex-wrap gap-3">
          <button
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary focus:ring-primary text-background"
          >
            Primary Action
          </button>

          <button
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-secondary focus:ring-primary text-background"
          >
            Secondary Action
          </button>

          <button
            class="px-4 py-2 rounded-md font-medium border transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 border-foreground/30 focus:ring-primary text-foreground"
          >
            Outline Button
          </button>
        </div>
      </div>

      <!-- Sample List -->
      <div class="p-6 rounded-lg border shadow-sm border-foreground/20">
        <h3 class="text-lg font-semibold mb-4">Feature List</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="w-2 h-2 rounded-full mr-3 bg-primary"></span>
            WCAG AA contrast compliance
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 rounded-full mr-3 bg-secondary"></span>
            Harmonious color relationships
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 rounded-full mr-3 bg-primary"></span>
            Dark and light mode support
          </li>
        </ul>
      </div>
    </div>
  `,
})
export default class ThemePreview {}
