import { Injectable } from '@angular/core';
import { trim } from 'lodash';

@Injectable()
export class GaService {
  public DISABLE_GA_KEY = 'disable-ga';

  constructor() {
    ga('create', 'UA-77462810-1', 'auto');
  }

  pageview(path: string) {
    if (this.enabled) {
      ga('send', 'pageview', path);
    } else {
      console.log('website analytics disabled.');
    }
  }

  get cookies() {
    const cookies: {[key: string]: string} = {};
    document.cookie.split(';').forEach(component => {
      const tupple = trim(component, ' ').split('=');
      cookies[tupple[0]] = tupple[1];
    });
    return cookies;
  }

  get enabled(): boolean {
    return this.cookies[this.DISABLE_GA_KEY] === undefined;
  }

  set enabled(enabled: boolean) {
    // Remove disable-key if enabled;
    let maxAge = 0;
    let expireDate = new Date(0);
    let value = '';
    if (!enabled) {
      // Set disable-key yes if disabled. (4 weeks)
      maxAge = 60 * 60 * 24 * 7 * 4;
      expireDate = new Date();
      expireDate.setSeconds(expireDate.getSeconds() + maxAge);
      value = 'yes';
    }
    document.cookie = `${this.DISABLE_GA_KEY}=${value}; expires=${expireDate.toUTCString()}; max-age=${maxAge}; `;
  }
}
