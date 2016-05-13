import { Component, OnInit, OnDestroy, AfterViewInit } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';
import { GAService } from './ga.service';

@Component({
    templateUrl: 'static/templates/settings.component.html',
    directives: [ROUTER_DIRECTIVES],
    properties: ['routes'],
})
export class SettingsComponent implements OnInit, OnDestroy, OnActivate {
    public routes;

    constructor(
        public router: Router,
        public gaservice: GAService)
    {
        this.routes = Routes;
    }

    updateGAButton() {
        if (jQuery.cookie(this.gaservice.ENABLE_GA_KEY) === undefined) {
            jQuery('#ga-on').addClass('disabled');
            jQuery('#ga-off').removeClass('disabled');
        } else {
            jQuery('#ga-on').removeClass('disabled');
            jQuery('#ga-off').addClass('disabled');
        }
    }

    ngOnDestroy() {
    }

    ngOnInit() {
    }

    routerOnActivate() {
        this.updateGAButton()
        this.gaservice.pageview(this.routes.settings.path);
    }

    toggleGA(event) {
        if (jQuery(event.target).hasClass('disabled')) return;
        if (jQuery.cookie(this.gaservice.ENABLE_GA_KEY) === undefined) {
            jQuery.cookie(this.gaservice.ENABLE_GA_KEY, 'true');
        } else {
            jQuery.removeCookie(this.gaservice.ENABLE_GA_KEY);
        }
        this.updateGAButton();
    }
}
