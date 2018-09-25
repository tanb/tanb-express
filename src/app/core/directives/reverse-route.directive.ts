import { AfterContentInit, Input, Directive, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { ReverseRouteService } from 'src/app/core/services/reverse-route.service';

@Directive({
  selector: '[appReverseRoute]'
})
export class ReverseRouteDirective implements AfterContentInit {
  private renderer: Renderer2;
  @Input('appReverseRoute') appReverseRoute: string | any[];

  constructor(private rendererFactory: RendererFactory2,
              private reverseRoute: ReverseRouteService,
              private elementRef: ElementRef) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterContentInit() {
    let params = this.appReverseRoute as any[];
    if (typeof this.appReverseRoute === 'string') {
      params = [this.appReverseRoute];
    }
    this.reverseRoute.resolve(...params)
      .then(path => {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'href', path);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
