import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';
import { GAService } from './ga.service';

@Component({
    templateUrl: 'static/templates/root.component.html',
    directives: [ROUTER_DIRECTIVES],
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
