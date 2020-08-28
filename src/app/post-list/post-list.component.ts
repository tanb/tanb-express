import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';


interface ScullyRoute {
  description: string;
  featured_image?: string;
}


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  blog$ = this.srs.available$
    .pipe(
      map((routes) => {
        return routes.filter((route) => {
          return route.route.startsWith('/blog/')
        }).reverse();
      })
    );

  constructor(private srs: ScullyRoutesService) { }

  ngOnInit(): void {
  }

}
