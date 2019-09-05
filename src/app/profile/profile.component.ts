import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as anime from 'animejs';

import { ContactMeComponent } from 'src/app/modal/contact-me/contact-me.component';
import { ModalService } from 'src/app/services/modal.service';
import { ReverseRouteService } from 'src/app/services/reverse-route.service';
import { articles } from 'src/articles';
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
  articles = 0;
  constructor(private storage: LocalStorageService,
              private translate: TranslateService,
              private router: Router,
              private modal: ModalService,
              private reverseRoute: ReverseRouteService) {
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

  onChangeLang(lang) {
    this.storage.setCurrenrLang(lang);
    this.translate.use(lang);
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
      targets,
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

import { Codable, Type} from 'src/app/models/codable';
// Example
const responseJson: JSON = JSON.parse(`
{
    "profile": {
      "first_name": "John",
      "last_name": "Apple",
      "lisences": [
        {
          "name": "driver",
          "acquisition_date": "2019-02-10",
          "expiration_date": "2022-02-10"
        },
        {
          "name": "Apple Developer Program",
          "acquisition_date": "2019-01-01",
          "expiration_date": "2020-01-01"
        }
      ]
    },
    "state": 1,
    "email": "apple@example.com"
}`);

class Lisence extends Codable {
  name!: string;
  acquisitionDate!: string;
  expirationDate!: string;
  codingKeys = {
    name: 'name',
    acquisitionDate: 'acquisition_date',
    expirationDate: 'expiration_date'
  };
}

class Profile extends Codable {
  firstName!: string;
  lastName!: string;
  @Type(Lisence)
  lisences!: Lisence[];
  codingKeys = {
    firstName: 'first_name',
    lastName: 'last_name',
    lisences: 'lisences'
  }

  fullname() {
    return `${this.lastName} ${this.firstName}`;
  }
}

class User extends Codable {
  email!: string;
  state!: number;
  @Type(Profile)
  profile!: Profile;

  get goodState() {
    return this.state === 1;
  }
}

const profile2 = new Profile();
profile2.lisences = [];
profile2.firstName = 'Guy';
profile2.lastName = 'Fawkes';
const user = User.decode(responseJson);
const json = JSON.stringify(user.encode());
const me = User.decode(JSON.parse(json));
console.log(me);
console.log(me.profile);
console.log(me.profile.lisences);
console.log(JSON.stringify(me.encode()));
console.log(profile2);
me.profile = profile2
console.log(me.encode());
console.log(JSON.stringify(me.encode()));
