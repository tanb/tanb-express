import { ApplicationRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ElementRef,
         Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';

import { ContactMeComponent } from '../modal/contact-me/contact-me.component';

export const Type = Function;
export interface Type<T> extends Function { new (...args: any[]): T; }

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private renderer: Renderer2;
  componentRef?: ComponentRef<any>;

  constructor(rendererFactory: RendererFactory2,
              private applicationRef: ApplicationRef,
              private cFResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show<T>(component: Type<T>): void {
    const cFactory = this.cFResolver.resolveComponentFactory<T>(component);
    const componentRef = cFactory.create(this.injector);
    const componentElm: HTMLElement = componentRef.location.nativeElement;
    this.applicationRef.attachView(componentRef.hostView);
    const bodyElm = document.querySelector('body');
    bodyElm.appendChild(componentElm);
    this.renderer.addClass(bodyElm, 'modal-open');
    setTimeout((() => {
      const element = componentElm.querySelector('.modal');
      this.renderer.addClass(element, 'show');
    }).bind(this), 0);
    this.componentRef = componentRef;
  }

  hide(): void {
    setTimeout((() => {
      const componentElm: HTMLElement = this.componentRef.location.nativeElement;
      const element = componentElm.querySelector('.modal');
      this.renderer.removeClass(element, 'show');
      this.renderer.addClass(element, 'hide');
      setTimeout(() => {
        const bodyElm = document.querySelector('body');
        this.renderer.removeClass(bodyElm, 'modal-open');
        this.componentRef.destroy();
      }, 130);
    }).bind(this), 0);
  }
}
