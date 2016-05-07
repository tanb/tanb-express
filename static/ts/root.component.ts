import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router, RouteParams, OnActivate } from 'angular2/router';

@Component({
    templateUrl: 'static/templates/root.component.html',
    directives: [],
})
export class RootComponent implements OnInit, OnDestroy {

    constructor(
        public router: Router)
    {
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }
}
