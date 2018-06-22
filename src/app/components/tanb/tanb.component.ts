import { Component, OnInit, AfterViewInit, Renderer2, RendererFactory2  } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ContactMeComponent } from 'src/app/core/modal/contact-me/contact-me.component';
import { IndicatorService } from 'src/app/core/services/indicator.service';
import { ApiService } from 'src/app/core/services/api/api.service';

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
  bsModalRef: BsModalRef;
  private renderer: Renderer2;

  constructor(private modalService: BsModalService, private indicatorService: IndicatorService,
              private api: ApiService, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    // let source = this.api.contactMe();
    // source.subscribe(
    //   value => console.log(`handleNext:  ${value}`),
    //   error => console.log(`handleError: ${error}`),
    //   () => console.log('handleComplete')
    // );
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
  openModalWithComponent() {
    let config = {
      class: 'tnb-modal-dialog'
    };
    this.bsModalRef = this.modalService.show(ContactMeComponent, config);
    console.log(this.bsModalRef);
  }
  openModal() {
    this.openModalWithComponent();
  }
}
