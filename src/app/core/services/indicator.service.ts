import { ComponentRef, Injectable, TemplateRef, EventEmitter, Renderer2, RendererFactory2 } from '@angular/core';
import { ComponentLoader } from 'ngx-bootstrap/component-loader/component-loader.class';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/component-loader.factory';
import { ModalBackdropComponent } from 'ngx-bootstrap/modal/modal-backdrop.component';
import { ModalContainerComponent } from 'ngx-bootstrap/modal/modal-container.component';
import { modalConfigDefaults, ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  protected backdropRef: ComponentRef<ModalBackdropComponent>;
  private backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private clf: ComponentLoaderFactory) {
    this.backdropLoader = this.clf.createLoader<ModalBackdropComponent>(
      null,
      null,
      null
    );
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show() {
    this.showBackdrop();
  }

  hide() {
    this.hideBackdrop();
  }

  showBackdrop(): void {
    this.backdropLoader
      .attach(ModalBackdropComponent)
      .to('body')
      .show();
    this.backdropRef = this.backdropLoader._componentRef;
    this.renderer.addClass(this.backdropRef.location.nativeElement, 'indicator');
    const imageElement = this.renderer.createElement('img');
    this.renderer.setAttribute(imageElement, 'src', 'assets/img/indicator.svg');
    this.renderer.appendChild(this.backdropRef.location.nativeElement, imageElement);
  }

  hideBackdrop(): void {
    this.backdropLoader.hide();
    this.backdropRef = null;
  }
}
