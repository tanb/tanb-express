import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[navigateLink]',
  standalone: true,
})
export class NavigateLinkDirective {
  readonly #router = inject(Router);
  @Input('navigateLink') navigateTo?: string;

  @HostListener('click') onClick() {
    if (!this.navigateTo) {
      return;
    }
    this.#router.navigate([this.navigateTo]).then((isNavigated) => {
      if (!isNavigated) {
        window.location.reload();
      }
    });
  }
}
