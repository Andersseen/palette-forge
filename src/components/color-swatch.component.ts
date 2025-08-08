import { Component, input, inject } from "@angular/core";
import { ColorSwatch } from "../types/theme.types";

@Component({
  selector: "app-color-swatch",
  template: `
    <div
      class="group cursor-pointer p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-95"
      style="background-color: rgb(var(--bg) / 1); border-color: rgb(var(--fg) / 0.2)"
      (click)="copyToClipboard()"
    >
      <!-- Color Preview -->
      <div
        class="w-full h-16 rounded-md mb-3 border shadow-inner"
        [style.background-color]="swatch().hex"
        style="border-color: rgb(var(--fg) / 0.1)"
      ></div>

      <!-- Color Info -->
      <div class="space-y-1">
        <h4 class="font-semibold text-sm" style="color: rgb(var(--fg) / 1)">
          {{ swatch().name }}
        </h4>
        <div
          class="space-y-1 text-xs opacity-70"
          style="color: rgb(var(--fg) / 1)"
        >
          <p class="font-mono">{{ swatch().hex.toUpperCase() }}</p>
          <p class="font-mono">{{ swatch().hsl }}</p>
          <p class="font-mono">{{ swatch().cssVar }}</p>
        </div>
      </div>

      <!-- Copy Indicator -->
      <div
        class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <p class="text-xs font-medium" style="color: rgb(var(--primary) / 1)">
          {{ copied ? "Copied!" : "Click to copy" }}
        </p>
      </div>
    </div>
  `,
})
export class ColorSwatchComponent {
  swatch = input.required<ColorSwatch>();
  copied = false;

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.swatch().hex);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  }
}
