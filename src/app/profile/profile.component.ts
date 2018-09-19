import { Component, ComponentRef, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  animations: [
    trigger('balloon', [
      state(BalloonState.top, style({
        transform: 'translateY(-20px)'
      })),
      state(BalloonState.bottom, style({
        transform: 'translateY(0px)'
      })),
      transition(BalloonState.bottom + ' => ' + BalloonState.top,
                 animate('7000ms ease-in-out')),
      transition(BalloonState.top + ' => ' + BalloonState.bottom,
                 animate('7000ms ease-in-out'))
    ]),
  ]
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
      update: (function(a) {
        this.age = targets.age;
      }).bind(this);
    });
  }

  onEnd(event) {
    const wait = (Math.floor(Math.random() * 9) + 1) * 100;
    if (event.toState === BalloonState.bottom) {
      setTimeout(() => {
        this.balloonState = BalloonState.top;
      }, wait);
    } else {
      setTimeout(() => {
        this.balloonState = BalloonState.bottom;
      }, wait);
    }
  }

  openModal() {
    this.modal.show(ContactMeComponent);
  }
}
