import { Injectable } from '@angular/core';
import { trim } from 'lodash';
import { LocalStorageService } from './local-storage.service'

@Injectable()
export class GaService {
  constructor(private storage: LocalStorageService) {
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
    return this.storage.getNoGa() !== 'disabled';
  }

  set enabled(enabled: boolean) {
    if (enabled) {
      this.storage.removeNoGa();
    } else {
      this.storage.setNoGa();
    }
  }
}
