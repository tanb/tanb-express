import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../notification/notification.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit, OnDestroy {
  subscription: any;

  constructor(private notification: NotificationService) {
    this.subscription = this.notification.routechanged.subscribe((userInfo) => {
      this.onRouteChanged(userInfo);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickNavbarBrand() {
    this.notification.didClickNavbarBrand.emit(null);
  }

  onRouteChanged(userInfo) {
    console.log(userInfo);
  }
}
