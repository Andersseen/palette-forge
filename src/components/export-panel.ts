import { Component, inject } from "@angular/core";
import ColorPalette from "@services/color-palette";

@Component({
  selector: "app-export-panel",
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold" style="color: rgb(var(--fg) / 1)">
        Export Configuration
      </h3>

      <div class="flex flex-wrap gap-3">
        <button
          class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style="background-color: rgb(var(--primary) / 1); color: white; focus:ring-color: rgb(var(--primary) / 1)"
          (click)="copyTailwindConfig()"
        >
          {{ configCopied ? "Config Copied!" : "Copy Tailwind Config" }}
        </button>

        <button
          class="px-4 py-2 rounded-md font-medium border transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style="border-color: rgb(var(--fg) / 0.3); color: rgb(var(--fg) / 1); focus:ring-color: rgb(var(--primary) / 1)"
          (click)="downloadConfig()"
        >
          Download Config File
        </button>
      </div>

      <div
        class="p-4 rounded-lg border font-mono text-xs overflow-auto max-h-64"
        style="background-color: rgb(var(--fg) / 0.05); border-color: rgb(var(--fg) / 0.2); color: rgb(var(--fg) / 1)"
      >
        <pre>{{ getTailwindConfig() }}</pre>
      </div>
    </div>
  `,
})
export default class ExportPanel {
  private colorService = inject(ColorPalette);
  configCopied = false;

  getTailwindConfig(): string {
    return this.colorService.getTailwindConfig();
  }

  async copyTailwindConfig(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.getTailwindConfig());
      this.configCopied = true;
      setTimeout(() => {
        this.configCopied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy config:", err);
    }
  }

  downloadConfig(): void {
    const config = `module.exports = ${this.getTailwindConfig()}`;
    const blob = new Blob([config], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tailwind.config.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
