/// <reference types="grecaptcha" />
import { InjectionToken } from '@angular/core';

export const RECAPTCHA_SETTINGS = new InjectionToken<RecaptchaSettings>('recaptcha-settings');

export interface RecaptchaSettings {
  siteKey?: string;
}
