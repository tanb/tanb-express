import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  blog: ScullyRoute[] = [];

  constructor(private srs: ScullyRoutesService) { }

  ngOnInit(): void {
    this.srs.available$.subscribe(routes => {
      this.blog = this.availableFilter(routes);
    });
  }

  availableFilter(routes: ScullyRoute[]) {
    return routes.filter((route) => {
      return route.route.startsWith('/blog/');
    }).reverse();
  }

}
