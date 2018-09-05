import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @Input() pullRight = false;

  constructor(private notification: NotificationService,
              private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        console.log(event.url);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onClickNavbarBrand() {
    this.router.navigateByUrl('/');
  }

  onRouteChanged(userInfo) {
    console.log(userInfo);
  }
}
