import {AfterContentInit, Input, Directive, ElementRef, Renderer2, RendererFactory2, OnDestroy} from '@angular/core';
import { ReverseRouteService } from 'src/app/services/reverse-route.service';

@Directive({
  selector: '[appUrl]'
})
export class ReverseRouteDirective implements AfterContentInit, OnDestroy {
  private renderer: Renderer2;
  @Input() appUrl: string | any[];

  constructor(private rendererFactory: RendererFactory2,
              private reverseRoute: ReverseRouteService,
              private elementRef: ElementRef) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngOnDestroy() {
  }

  ngAfterContentInit() {
    let params = this.appUrl as any[];
    if (typeof this.appUrl === 'string') {
      params = [this.appUrl];
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
