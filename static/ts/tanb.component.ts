import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { GAService } from './ga.service';
import { AnchorBlankDirective } from './anchor.directive'

@Component({
    templateUrl: 'static/templates/tanb.component.html',
})
export class TanbComponent implements OnInit, OnDestroy {
    constructor(
        public router: Router,
        public gaservice: GAService)
    {
        router.events.subscribe( (event) => {
            if(event instanceof NavigationStart) {
                console.log(this.router)
                // this.gaservice.pageview(this.routes.tanb.path);
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }
}
