import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare global {
  interface Window {
    ng2recaptchaloaded: () => void;
  }
}

export function loadScript(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  renderMode: 'explicit' | string,
  onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
  urlParams: string,
  url?: string,
  nonce?: string,
) {
  window.ng2recaptchaloaded = () => {
    onLoaded(grecaptcha);
  };
  const script = document.createElement('script');
  script.innerHTML = '';
  const baseUrl = url ?? 'https://www.google.com/recaptcha/api.js';

  script.src = `${baseUrl}?render=${renderMode}&onload=ng2recaptchaloaded${urlParams}`;
  if (nonce) {
    (script as any).nonce = nonce;
  }
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

@Injectable({ providedIn: 'root' })
export class RecaptchaLoaderService {
  readonly ready = new BehaviorSubject<ReCaptchaV2.ReCaptcha | null>(null);
  readonly #platformId = inject(PLATFORM_ID);

  constructor() {
    if (this.ready.value) {
      return;
    }
    if (isPlatformBrowser(this.#platformId)) {
      const langParam = '';
      loadScript(
        'explicit',
        (grecaptcha) => {
          this.ready.next(grecaptcha);
        },
        langParam,
      );
    }
  }
}
