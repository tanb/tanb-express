import { Component, OnInit, OnDestroy, AfterViewInit } from 'angular2/core';
import { Router, RouteParams, OnActivate, ROUTER_DIRECTIVES } from 'angular2/router';
import { Routes} from './app.route';


@Component({
    templateUrl: 'static/templates/settings.component.html',
    directives: [ROUTER_DIRECTIVES],
    properties: ['routes'],
})
export class SettingsComponent implements OnInit, OnDestroy, OnActivate {
    public routes;

    private ENABLE_GA_KEY: string = 'disable-ga';
    constructor(public router: Router)
    {
        this.routes = Routes;
    }

    updateGAButton() {
        if (jQuery.cookie(this.ENABLE_GA_KEY) === undefined) {
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
    }

    toggleGA(event) {
        if (jQuery(event.target).hasClass('disabled')) return;
        this.disableGA = !this.disableGA;
        if (this.disableGA) {
            jQuery.cookie(this.ENABLE_GA_KEY, 'true');
        } else {
            jQuery.removeCookie(this.ENABLE_GA_KEY);
        }
        this.updateGAButton();
    }
}
