import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {isPlatformBrowser} from '@angular/common';

declare var ga: (a, b, c) => void;

@Injectable()
export class GaService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private storage: LocalStorageService) {
    if (isPlatformBrowser(this.platformId)) {
      ga('create', 'UA-77462810-1', 'auto');
    }
  }

  pageview(path: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.enabled) {
        ga('send', 'pageview', path);
      } else {
        console.log('website analytics disabled.');
      }
    }
  }

  get cookies() {
    const cookies: {[key: string]: string} = {};
    document.cookie.split(';').forEach(component => {
      const tupple = component.trim().split('=');
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
