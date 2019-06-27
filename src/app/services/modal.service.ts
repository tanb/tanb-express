import { ApplicationRef, ComponentRef, ComponentFactoryResolver,
         Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';

import { BackdropComponent } from 'src/app/modal/backdrop/backdrop.component';

interface Type<T> extends Function { new (...args: any[]): T; }

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private renderer: Renderer2;
  backdropRef?: ComponentRef<BackdropComponent>;
  contentRef?: ComponentRef<any>;

  constructor(rendererFactory: RendererFactory2,
              private applicationRef: ApplicationRef,
              private cFResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show<T>(component: Type<T>): void {
    this.backdropRef = this.attatch(BackdropComponent);
    this.contentRef = this.attatch(component);
    const bodyElm = document.querySelector('body');
    this.renderer.addClass(bodyElm, 'modal-open');
    this.updateClass(this.backdropRef, '.modal-backdrop', true);
    this.updateClass(this.contentRef, '.modal', true);
  }

  hide(): void {
    this.updateClass(this.backdropRef, '.modal-backdrop', false).then(() => {
      setTimeout(() => {
        this.backdropRef.destroy();
      }, 130);
    });
    this.updateClass(this.contentRef, '.modal', false).then(() => {
      setTimeout(() => {
        const bodyElm = document.querySelector('body');
        this.renderer.removeClass(bodyElm, 'modal-open');
        this.contentRef.destroy();
      }, 130);
    });
  }

  private attatch<T>(component: Type<T>): ComponentRef<T> {
    const cFactory = this.cFResolver.resolveComponentFactory<T>(component);
    const componentRef = cFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const bodyElm = document.querySelector('body');
    bodyElm.appendChild(componentRef.location.nativeElement);
    return componentRef;
  }

  private updateClass<T>(componentRef: ComponentRef<T>, selector: string, show: boolean): Promise<void> {
    const componentElm: HTMLElement = componentRef.location.nativeElement;
    const element = componentElm.querySelector(selector);
    const addClassName = show ? 'show' : 'hide';
    const removeClassName = show ? 'hide' : 'show';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.renderer.addClass(element, addClassName);
          this.renderer.removeClass(element, removeClassName);
          resolve();
        } catch(err) {
          reject(err);
        }
      }, 0);
    });
  }
}
