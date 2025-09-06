import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer class="border-t mt-16" style="border-color: rgb(var(--fg) / 0.1)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p
          class="text-center text-sm opacity-60"
          style="color: rgb(var(--fg) / 1)"
        >
          Built with Angular • Styled with Tailwind CSS • Colors generated with
          HSL harmony
        </p>
      </div>
    </footer>
  `,
})
export default class Footer {}
