import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

enum BalloonState {
  top = "top",
  bottom = "bottom"
}

@Component({
  selector: 'app-tanb',
  templateUrl: './tanb.component.html',
  styleUrls: ['./tanb.component.scss'],
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
export class TanbComponent implements OnInit {
  states = [BalloonState.bottom,
            BalloonState.bottom];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.states[0] = BalloonState.top;
      this.states[1] = BalloonState.top;
    }, 0);
  }

  onEnd(event, index) {
    let wait = (Math.floor(Math.random() * 9) + 1) * 100;
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
}
