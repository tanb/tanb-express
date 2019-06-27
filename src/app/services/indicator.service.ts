import { ApplicationRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ElementRef,
         Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';

import { IndicatorComponent } from 'src/app/indicator/indicator.component';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2,
              private applicationRef: ApplicationRef,
              private cFResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(elementRef?: ElementRef<any>): ComponentRef<IndicatorComponent> {
    const cFactory: ComponentFactory<IndicatorComponent> = this.cFResolver.resolveComponentFactory(IndicatorComponent);
    const componentRef = cFactory.create(this.injector);
    const componentElm = componentRef.location.nativeElement;
    this.applicationRef.attachView(componentRef.hostView);
    if (typeof document !== 'undefined' && !elementRef) {
      this.renderer.setStyle(componentElm, 'position', 'fixed');
      document.querySelector('body').appendChild(componentElm);
    } else if (elementRef) {
      const targetElm = elementRef.nativeElement;
      this.renderer.setStyle(targetElm, 'position', 'relative');
      this.renderer.setStyle(targetElm, 'display', 'block');
      this.renderer.appendChild(targetElm, componentElm);
    }
    return componentRef;
  }

  hide(componentRef: ComponentRef<IndicatorComponent>): void {
    componentRef.destroy();
  }
}
