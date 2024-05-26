import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  template: `
    <button
      [disabled]="disabled"
      type="button"
      mat-ripple
      class="tw-inline-flex tw-h-full tw-flex-wrap tw-items-center
        tw-justify-center tw-gap-[0.25em]
        tw-rounded-lg tw-px-4 tw-py-2"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() disabled = false;
}
