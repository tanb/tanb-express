import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { GaService, NotificationService } from 'app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private pushButtonCount = 0;
  constructor(private router: Router,
              private notification: NotificationService,
              private gaservice: GaService) {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.gaservice.pageview(event.url);
      }
    });

    this.notification.didClickNavbarBrand.subscribe((userInfo) => {
      this.onDidClickNavbarBrand(userInfo);
    });
  }

  ngOnInit() {
  }

  onDidClickNavbarBrand(userInfo) {
    this.router.navigateByUrl('/');
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
