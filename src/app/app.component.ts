import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

import { NotificationService } from 'src/app/core/services/notification.service';
import { GaService } from 'src/app/core/services/ga.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHomeRouteActivated = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private gaservice: GaService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.gaservice.pageview(event.url);
        this.isHomeRouteActivated = event.url === '/';
      }
    });
  }

  ngOnInit() {}
}
