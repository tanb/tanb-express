import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { AnchorBlankDirective } from './anchor.directive'

@Component({
    templateUrl: 'static/templates/root.component.html',
})
export class RootComponent {
    constructor(public router: Router) {
    }
}
