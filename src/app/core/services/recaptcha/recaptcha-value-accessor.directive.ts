import { Directive, forwardRef, HostListener, inject } from "@angular/core";
import type { ControlValueAccessor } from "@angular/forms";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { RecaptchaComponent } from "./recaptcha.component";

@Directive({
  standalone: true,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecaptchaValueAccessorDirective),
    },
  ],
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector:
    "app-recaptcha[formControlName],app-recaptcha[formControl],app-recaptcha[ngModel]",
})
export class RecaptchaValueAccessorDirective implements ControlValueAccessor {
  readonly #host = inject(RecaptchaComponent);
  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  public writeValue(value: string): void {
    if (!value) {
      this.#host.reset();
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener("resolved", ["$event"])
  public onResolve($event: string) {
    if (this.onChange) {
      this.onChange($event);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
