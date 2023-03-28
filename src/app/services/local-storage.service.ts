import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private DISABLE_GA_KEY = 'disable-ga';
  private CURRENT_LANG_KEY = 'current-lang';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  getNoGa() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.DISABLE_GA_KEY);
    }
  }

  removeNoGa() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.DISABLE_GA_KEY);
    }
  }

  setNoGa() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.DISABLE_GA_KEY, 'disabled');
    }
  }

  getCurrentLang() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.CURRENT_LANG_KEY);
    }
  }

  removeCurrentLang() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.CURRENT_LANG_KEY);
    }
  }

  setCurrenrLang(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.CURRENT_LANG_KEY, lang);
    }
  }

}
