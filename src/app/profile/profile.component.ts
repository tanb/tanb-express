import { Component, ComponentRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import * as anime from 'animejs';

import { ContactMeComponent } from 'src/app/core/modal/contact-me/contact-me.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ReverseRouteService } from 'src/app/core/services/reverse-route.service';
import { articles } from 'src/articles';

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
  articles = 0;
  constructor(private router: Router, private modal: ModalService, private reverseRoute: ReverseRouteService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.balloonState = BalloonState.top;
    }, 0);
    this.setupAgeAnime();
    this.setupArticlesAnime();
    this.setupIconAnime();
  }

  onClickArticles() {
    this.reverseRoute.resolve('articleList').then(path => {
      this.router.navigate([path, {}]);
    });
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

  setupArticlesAnime() {
    const length = articles.length;
    const targets = { articles: 0 };
    anime({
      targets: targets,
      articles: length,
      round: 1,
      easing: 'linear',
      update: () => {
        this.articles = targets.articles;
      }
    });
  }

  setupAgeAnime() {
    const myAge: number = moment().diff('1985-01-27', 'years');
    const targets = { age: 0 };
    anime({
      targets: targets,
      age: myAge,
      round: 1,
      easing: 'linear',
      update: () => {
        this.age = targets.age;
      }
    });
  }
}
