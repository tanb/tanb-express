import {
  Directive,
  HostBinding,
  PLATFORM_ID,
  Inject,
  Input, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'a[href]'
})
export class ExternalLinkDirective implements OnDestroy {
  @HostBinding('attr.rel') relAttr = '';
  @HostBinding('attr.target') targetAttr = '';
  @HostBinding('attr.href') hrefAttr = '';
  @Input() href: string;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnDestroy() {
  }

  ngOnChanges() {
    this.hrefAttr = this.href;

    if (this.isLinkExternal()) {
      this.relAttr = 'noopener';
      this.targetAttr = '_blank';
    }
  }

  private isLinkExternal() {
    return (
      isPlatformBrowser(this.platformId) &&
        this.href.startsWith('http') &&
        !this.href.includes(location.hostname)
    );
  }
}
