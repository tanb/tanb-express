import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  imports: [RouterOutlet],
})
export class AppComponent {
  readonly #translate = inject(TranslateService);
  readonly #storage = inject(LocalStorageService);
  constructor() {
    this.#translate.setDefaultLang('en');
    const currentLang = this.#storage.getCurrentLang();
    if (currentLang) {
      this.#translate.use(currentLang);
    } else {
      const lang = navigator.language.toLowerCase();
      if (lang.startsWith('ja')) {
        this.#translate.use('ja');
      }
    }
  }
}
