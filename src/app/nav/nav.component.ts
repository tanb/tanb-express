import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  @Input() isArticlePage: boolean;

  constructor(private notification: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onClickBlogLogo() {
    this.router.navigateByUrl('/blog');
  }

  onClickNavbarBrand() {
    this.router.navigateByUrl('/');
  }

}
