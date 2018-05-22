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
