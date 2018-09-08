import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ContactMeComponent } from 'src/app/core/modal/contact-me/contact-me.component';

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
  states = [BalloonState.bottom,
            BalloonState.bottom];

  constructor(private modal: NgbModal) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.states[0] = BalloonState.top;
      this.states[1] = BalloonState.top;
    }, 0);
  }

  onEnd(event, index) {
    const wait = (Math.floor(Math.random() * 9) + 1) * 100;
    if (event.toState === BalloonState.bottom) {
      setTimeout(() => {
        this.states[index] = BalloonState.top;
      }, wait);
    } else {
      setTimeout(() => {
        this.states[index] = BalloonState.bottom;
      }, wait);
    }
  }

  openModalWithComponent() {
    const config: NgbModalOptions = {
       windowClass: 'tnb-modal-dialog'
    };
    const modalRef: NgbModalRef = this.modal.open(ContactMeComponent, config);
  }

  openModal() {
    this.openModalWithComponent();
  }
}
