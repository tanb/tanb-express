import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';
import { GAService } from './ga.service';
import { AnchorBlankDirective } from './anchor.directive'

@Component({
    templateUrl: 'static/templates/root.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        AnchorBlankDirective,
    ],
})
export class RootComponent implements OnInit, OnDestroy, OnActivate {
    public routes = Routes
    constructor(
        public router: Router,
        public gaservice: GAService)
    {
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }

    routerOnActivate() {
        this.gaservice.pageview(this.routes.root.path);
    }
}
