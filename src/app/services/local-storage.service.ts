import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private DISABLE_GA_KEY = 'disable-ga';
  private CURRENT_LANG_KEY = 'current-lang';

  constructor() { }

  getNoGa() {
    return localStorage.getItem(this.DISABLE_GA_KEY);
  }

  removeNoGa() {
    localStorage.removeItem(this.DISABLE_GA_KEY);
  }

  setNoGa() {
    localStorage.setItem(this.DISABLE_GA_KEY, 'disabled');
  }

  getCurrentLang() {
    return localStorage.getItem(this.CURRENT_LANG_KEY);
  }

  removeCurrentLang() {
    localStorage.removeItem(this.CURRENT_LANG_KEY);
  }

  setCurrenrLang(lang: string) {
    localStorage.setItem(this.CURRENT_LANG_KEY, lang);
  }

}
