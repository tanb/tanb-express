import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';


@Component({
    templateUrl: 'static/templates/settings.component.html',
    directives: [ROUTER_DIRECTIVES],
    properties: ['routes'],
})
export class SettingsComponent implements OnInit, OnDestroy {
    public routes;
    public disableGA: boolean;
    private ENABLE_GA_KEY: string = "disable-ga";
    constructor(
        public router: Router)
    {
        this.routes = Routes;
        if (jQuery.cookie(this.ENABLE_GA_KEY) === undefined) {
            this.disableGA = false;
        } else {
            this.disableGA = true;
        }
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }

    toggleGA(event) {
        if (jQuery(event.target).hasClass('disabled')) return;
        this.disableGA = !this.disableGA;
        if (this.disableGA) {
            jQuery.cookie(this.ENABLE_GA_KEY, 'true');
        } else {
            jQuery.removeCookie(this.ENABLE_GA_KEY);
        }
    }
}
