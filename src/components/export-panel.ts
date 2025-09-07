import { Component, inject, signal } from "@angular/core";
import ColorPalette from "@services/color-palette";

@Component({
  selector: "app-export-panel",
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Export Configuration</h3>

      <div class="flex flex-wrap gap-3">
        <button
          class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-background focus:ring-primary"
          (click)="copyTailwindConfig()"
        >
          {{ buttonText() }}
        </button>
      </div>

      <div
        class="p-4 rounded-lg border font-mono text-xs overflow-auto max-h-64 border-foreground/20"
      >
        <pre>{{ getTailwindConfig() }}</pre>
      </div>
    </div>
  `,
})
export default class ExportPanel {
  private colorService = inject(ColorPalette);
  buttonText = signal("Copy Tailwind @theme");

  getTailwindConfig(): string {
    return this.colorService.getTailwindConfig();
  }

  async copyTailwindConfig(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.getTailwindConfig());
      this.buttonText.set("@theme Copied!");
      setTimeout(() => {
        this.buttonText.set("Copy Tailwind @theme");
      }, 2000);
    } catch (err) {
      this.buttonText.set("Failed to copy @theme");
      console.error("Failed to copy config:", err);
    }
  }
}
