import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[href-blank]',
})
export class AnchorBlankDirective {
    private el:HTMLElement;
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this.el.setAttribute('rel', 'noopener noreferrer')
        this.el.setAttribute('target', '_blank')
    }
}
