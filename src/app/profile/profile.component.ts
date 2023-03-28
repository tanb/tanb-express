import {Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import anime from 'animejs/lib/anime.es';

import { ContactMeComponent } from 'src/app/modal/contact-me/contact-me.component';
import { ModalService } from 'src/app/services/modal.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SEOService } from 'src/app/services/seo.service';
import {isPlatformBrowser} from '@angular/common';

enum BalloonState {
  top = 'top',
  bottom = 'bottom'
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  profile = {
    title: 'Tomonori Tanabe｜Software Engineer in Tokyo',
    title_ja: '田邉 睦典｜ソフトウェアエンジニアin東京',
    description: 'I\'m a software engineer based in the Tokyo area.  If you need help with anything, please contact me. Mobile app development, news media development, business app development, website development, and more. Please feel free to contact me. I will make a proposal according to your budget. ',
    description_ja: '私は東京エリアを中心にソフトウェアエンジニアをしています. 何かお困りのことがあればぜひお問い合わせください. モバイルアプリ作成, ニュースメディア作成, 業務アプリ作成, ウェブサイト構築など, どんなことでも構いません、お気軽にご相談ください. お客様のご予算に合わせた提案をさせていただきます.'
  };

  balloonState: BalloonState = BalloonState.bottom;
  age = 0;

  constructor(private storage: LocalStorageService,
              private translate: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private modal: ModalService,
              @Inject(PLATFORM_ID) private platformId: any,
              private seo: SEOService) {

    this.seo.updateTitle(this.profile.title);
    this.seo.updateOgTitle(this.profile.title);
    this.seo.updateOgDescription(this.profile.description);
    this.seo.updateDescription(this.profile.description);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/ja') {
          this.onChangeLang('ja');
          this.seo.updateTitle(this.profile.title_ja);
          this.seo.updateOgTitle(this.profile.title_ja);
          this.seo.updateOgDescription(this.profile.description_ja);
          this.seo.updateDescription(this.profile.description_ja);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.balloonState = BalloonState.top;
    }, 0);
    this.setupAgeAnime();
    this.setupIconAnime();
  }

  onChangeLang(lang) {
    this.seo.setLang(lang);
    this.storage.setCurrenrLang(lang);
    this.translate.use(lang);
  }

  openModal() {
    this.modal.show(ContactMeComponent);
  }

  setupIconAnime() {
    if (isPlatformBrowser(this.platformId)) {
      anime({
        targets: '.tanb-icon .rounded-circle',
        translateY: -33,
        duration: 8000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    }
  }

  setupAgeAnime() {
    const myAge: number = moment().diff('1985-01-27', 'years');
    const targets = { age: 0 };
    if (isPlatformBrowser(this.platformId)) {
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
}
