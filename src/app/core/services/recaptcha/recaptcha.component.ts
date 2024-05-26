/// <reference types="grecaptcha" />
import type { AfterViewInit, OnDestroy } from "@angular/core";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  inject,
} from "@angular/core";
import type { Subscription } from "rxjs";

import { RecaptchaLoaderService } from "./recaptcha-loader.service";

@Component({
  standalone: true,
  selector: "app-recaptcha",
  template: ``,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
  readonly #elementRef = inject(ElementRef);
  readonly #loader = inject(RecaptchaLoaderService);
  readonly #zone = inject(NgZone);

  @Input() public siteKey?: string;
  @Output() public resolved = new EventEmitter<string | null>();

  #subscription: Subscription | null = null;
  #widget: number | null = null;
  #grecaptcha: ReCaptchaV2.ReCaptcha | null = null;

  public ngAfterViewInit() {
    this.#subscription = this.#loader.ready.subscribe(
      (grecaptcha: ReCaptchaV2.ReCaptcha | null) => {
        if (grecaptcha != null) {
          this.#grecaptcha = grecaptcha;
          this.renderRecaptcha();
        }
      },
    );
  }

  ngOnDestroy() {
    // reset the captcha to ensure it does not leave anything behind
    // after the component is no longer needed
    this.grecaptchaReset();
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  public reset() {
    if (this.#widget != null && this.#grecaptcha != null) {
      if (this.#grecaptcha.getResponse(this.#widget)) {
        // Only emit an event in case if something would actually change.
        // That way we do not trigger "touching" of the control if someone does a "reset"
        // on a non-resolved captcha.
        this.resolved.emit(null);
      }

      this.grecaptchaReset();
    }
  }

  private expired() {
    this.resolved.emit(null);
  }

  private captchaResponseCallback(response: string) {
    this.resolved.emit(response);
  }

  private grecaptchaReset() {
    this.#zone.runOutsideAngular(() => {
      if (this.#widget != null && this.#grecaptcha != null) {
        this.#grecaptcha.reset(this.#widget);
      }
    });
  }

  private renderRecaptcha() {
    if (this.#grecaptcha == null) {
      return;
    }

    this.#widget = this.#grecaptcha.render(this.#elementRef.nativeElement, {
      callback: (response: string) => {
        this.#zone.run(() => {
          this.captchaResponseCallback(response);
        });
      },
      "expired-callback": () => {
        this.#zone.run(() => {
          this.expired();
        });
      },
      sitekey: this.siteKey,
    });
  }
}
