import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';

@Component({
    templateUrl: 'static/templates/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    properties: ['routes'],
})
export class RootComponent implements OnInit, OnDestroy {
    public routes;
    constructor(
        public router: Router)
    {
        this.routes = Routes;
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }
}
