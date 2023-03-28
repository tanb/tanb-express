import {Directive, forwardRef, HostListener, OnDestroy} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RecaptchaComponent } from './recaptcha.component';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => RecaptchaValueAccessorDirective),
    },
  ],
  // tslint:disable-next-line:directive-selector
  selector: 'app-recaptcha[formControlName],app-recaptcha[formControl],app-recaptcha[ngModel]',
})
export class RecaptchaValueAccessorDirective implements ControlValueAccessor, OnDestroy {
  private onChange: (value: string) => void;
  private onTouched: () => void;

  constructor(private host: RecaptchaComponent) { }

  ngOnDestroy() {
  }

  public writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    }
  }

  public registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  @HostListener('resolved', ['$event'])
  public onResolve($event: string) {
    if (this.onChange) {
      this.onChange($event);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
