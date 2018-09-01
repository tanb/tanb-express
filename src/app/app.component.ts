import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

import { NotificationService } from 'src/app/core/services/notification.service';
import { GaService } from 'src/app/core/services/ga.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isHomeRouteActivated: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notification: NotificationService,
              private gaservice: GaService) {


    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.gaservice.pageview(event.url);
        this.isHomeRouteActivated = (event.url === '/');
      }
    });
  }

  ngOnInit() {
    this.redirectEmojiDomain()
  }

  redirectEmojiDomain() {
    var loc = window.location;
    var emojiDomain = environment.emojiDomain
    var standardDomain = environment.standardDomain
    var enableEmojiDomain = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    if (navigator.userAgent.indexOf('CriOS') > -1) {
      enableEmojiDomain = false;
    }
    var currentUrl = loc.protocol + '//' + loc.hostname;
    var outputUrl = enableEmojiDomain ? emojiDomain : standardDomain;
    if (currentUrl === outputUrl) {
      return;
    }
    if (loc.port) {
      currentUrl += ':' + loc.port;
      outputUrl += ':' + loc.port;
    }
    currentUrl += loc.pathname;
    outputUrl += loc.pathname;
    currentUrl += loc.search;
    outputUrl += loc.search;

    if (loc.hostname === 'localhost') {
      console.log("debug info for localhost environment:");
      console.log("UA = " + navigator.userAgent);
      console.log("enableEmojiDomain = " + enableEmojiDomain);
      console.log("currentUrl = " + currentUrl);
      console.log("outputUrl = " + outputUrl);
      return;
    }
    window.location.href = outputUrl;
  }
}
