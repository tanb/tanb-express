import {Component, OnInit, Renderer2, RendererFactory2, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

import { GaService } from 'src/app/services/ga.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  @ViewChild('toggleButton', { read: ElementRef, static: true }) toggleButton: ElementRef;

  constructor(public router: Router,
              public gaservice: GaService,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.updateGAButton();
  }
  ngOnDestroy() {
  }
  updateGAButton() {
    const element = this.toggleButton.nativeElement;
    const onButtonElm: HTMLLabelElement = element.querySelector('#ga-on');
    const offButtonElm: HTMLLabelElement = element.querySelector('#ga-off');

    if (this.gaservice.enabled) {
      this.renderer.addClass(onButtonElm, 'disabled');
      this.renderer.removeClass(offButtonElm, 'disabled');
    } else {
      this.renderer.removeClass(onButtonElm, 'disabled');
      this.renderer.addClass(offButtonElm, 'disabled');
    }
  }

  toggleGA(idName: string) {
    const element = this.toggleButton.nativeElement;
    const buttonElm: HTMLLabelElement = element.querySelector('#' + idName);

    if (buttonElm.classList.contains('disabled')) {
      return;
    }
    this.gaservice.enabled = !this.gaservice.enabled;
    this.updateGAButton();
  }
}
