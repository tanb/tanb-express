import { Component, ComponentRef, OnInit, AfterViewInit } from '@angular/core';

import * as moment from 'moment';
import * as anime from 'animejs';

import { ContactMeComponent } from 'src/app/core/modal/contact-me/contact-me.component';
import { ModalService } from 'src/app/core/services/modal.service';

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
  age: number = 0;

  constructor(private modal: ModalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.balloonState = BalloonState.top;
    }, 0);
    const myAge: number = moment().diff('1985-01-27', 'years');
    const targets = { age: 0 };
    anime({
      targets: targets,
      age: myAge,
      round: 1,
      easing: 'linear',
      update: (function() {
        this.age = targets.age;
      }).bind(this);
    });
    anime({
      targets: '.tanb-icon .rounded-circle',
      translateY: -33,
      duration: 8000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });
  }

  openModal() {
    this.modal.show(ContactMeComponent);
  }
}
