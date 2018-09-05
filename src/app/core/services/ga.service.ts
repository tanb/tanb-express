import { Injectable } from '@angular/core';
import { trim } from 'lodash';

@Injectable()
export class GaService {
  public DISABLE_GA_KEY = 'disable-ga';

  constructor() {
    ga('create', 'UA-77462810-1', 'auto');
  }

  pageview(path) {
    if (this.enabled) {
      ga('send', 'pageview', path);
    } else {
      console.log('website analytics disabled.');
    }
  }

  get cookies() {
    const cookies: {[key:string]: string} = {};
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
    if (enabled) {
      let date = new Date()
      date.setTime(0);
      document.cookie = `${this.DISABLE_GA_KEY}=; expires=${date.toUTCString()}`;
    } else {
      document.cookie = `${this.DISABLE_GA_KEY}=yes`;
    }
  }
}
