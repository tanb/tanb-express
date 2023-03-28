import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { GaService } from 'src/app/services/ga.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isHomeRouteActivated = false;
  constructor(
    private router: Router,
    private gaservice: GaService,
    private translate: TranslateService,
    private storage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.translate.setDefaultLang('en');
    const currentLang = this.storage.getCurrentLang();
    if (currentLang) {
      this.translate.use(currentLang);
    } else {
      if (isPlatformBrowser(this.platformId)) {
        const lang = navigator.language.toLowerCase();
        if (lang.startsWith('ja')) {
          this.translate.use('ja');
        }
      }
    }
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.gaservice.pageview(event.url);
        this.isHomeRouteActivated = (event.url.split('?')[0] === '/' ||
          event.url.split('?')[0] === '/ja');
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
  }
}
