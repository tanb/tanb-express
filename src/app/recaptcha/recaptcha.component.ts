/// <reference types="grecaptcha" />
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, Optional, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'src/app/recaptcha/recaptcha-settings';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
  @Input() public siteKey: string;
  @Input() public tabIndex: number;
  @Output() public resolved = new EventEmitter<string>();

  private subscription: Subscription;
  private widget: number;
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  constructor(
    private elementRef: ElementRef,
    private loader: RecaptchaLoaderService,
    private zone: NgZone,
    @Optional() @Inject(RECAPTCHA_SETTINGS) settings?: RecaptchaSettings) {
    if (settings) {
      this.siteKey = settings.siteKey;
    }
  }

  public ngAfterViewInit() {
    this.subscription = this.loader.ready.subscribe((grecaptcha: ReCaptchaV2.ReCaptcha) => {
      if (grecaptcha != null && grecaptcha.render instanceof Function) {
        this.grecaptcha = grecaptcha;
        this.renderRecaptcha();
      }
    });
  }

  public ngOnDestroy() {
    // reset the captcha to ensure it does not leave anything behind
    // after the component is no longer needed
    this.grecaptchaReset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public reset() {
    if (this.widget != null) {
      if (this.grecaptcha.getResponse(this.widget)) {
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
    if (this.widget != null) {
      this.zone.runOutsideAngular(() => this.grecaptcha.reset(this.widget));
    }
  }

  private renderRecaptcha() {
    this.widget = this.grecaptcha.render(this.elementRef.nativeElement, {
      callback: (response: string) => {
        this.zone.run(() => this.captchaResponseCallback(response));
      },
      'expired-callback': () => {
        this.zone.run(() => this.expired());
      },
      sitekey: this.siteKey,
      tabindex: this.tabIndex,
    });
  }
}
