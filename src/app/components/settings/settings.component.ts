import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { GaService } from 'app/services/ga/ga.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

    constructor(public router: Router,
                public gaservice: GaService) {
    }

    ngOnInit() {
        this.updateGAButton();
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
      if (jQuery(event.target).hasClass('disabled')) {
        return;
      }
        if (jQuery.cookie(this.gaservice.ENABLE_GA_KEY) === undefined) {
            jQuery.cookie(this.gaservice.ENABLE_GA_KEY, 'true');
        } else {
            jQuery.removeCookie(this.gaservice.ENABLE_GA_KEY);
        }
        this.updateGAButton();
    }

}
