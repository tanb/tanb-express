import { Component, OnInit, VERSION } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GaService } from 'src/app/core/services/ga.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private pushButtonCount: number = 0;
  showDiscord: boolean = false;
  copyrightYear: string = moment().utcOffset(9).format("YYYY");
  angularCLIVersion: string = environment.angularCLIVersion;
  angularVersion: string = VERSION.full;

  constructor(private router: Router,
              private notification: NotificationService,
              private gaservice: GaService) {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.gaservice.pageview(event.url);
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

  onClickDiscordToggle() {
    this.showDiscord = !this.showDiscord;
  }

  pushButton() {
    this.pushButtonCount = this.pushButtonCount + 1;
    if (this.pushButtonCount > 2) {
      const link = ['/settings', {}];
      this.pushButtonCount = 0;
      this.router.navigate(link);
    }
  }
}
