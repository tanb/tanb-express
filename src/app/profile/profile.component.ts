import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScullyRoute, IdleMonitorService, ScullyRoutesService} from '@scullyio/ng-lib';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import anime from 'animejs/lib/anime.es';

import { ContactMeComponent } from 'src/app/modal/contact-me/contact-me.component';
import { ModalService } from 'src/app/services/modal.service';
import { ReverseRouteService } from 'src/app/services/reverse-route.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

enum BalloonState {
  top = 'top',
  bottom = 'bottom'
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  balloonState: BalloonState = BalloonState.bottom;
  age = 0;
  constructor(private storage: LocalStorageService,
              private translate: TranslateService,
              private router: Router,
              private idle: IdleMonitorService,
              private scullyRoute: ScullyRoutesService,
              private modal: ModalService,
              private reverseRoute: ReverseRouteService) {
  }

  get scully() {
    return this.scullyRoute;
  }

  get blogRoutes$() {
    return this.scullyRoute.available$
      .pipe<ScullyRoute[]>(
        map((routes) => {
          return routes.filter((route) => {
            return route.route.startsWith('/blog')
          })
        })
      )
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.balloonState = BalloonState.top;
    }, 0);
    this.setupAgeAnime();
    this.setupIconAnime();
  }

  onChangeLang(lang) {
    this.storage.setCurrenrLang(lang);
    this.translate.use(lang);
  }

  openModal() {
    this.modal.show(ContactMeComponent);
  }

  setupIconAnime() {
    anime({
      targets: '.tanb-icon .rounded-circle',
      translateY: -33,
      duration: 8000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });
  }

  setupAgeAnime() {
    const myAge: number = moment().diff('1985-01-27', 'years');
    const targets = { age: 0 };
    anime({
      targets,
      age: myAge,
      round: 1,
      easing: 'linear',
      update: () => {
        this.age = targets.age;
      }
    });
  }
}
