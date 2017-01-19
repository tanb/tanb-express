import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { GAService } from './ga.service';

@Component({
    templateUrl: 'static/templates/settings.component.html',
})
export class SettingsComponent {
    constructor(
        public router: Router,
        public gaservice: GAService)
    {
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
