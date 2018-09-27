import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReverseRouteService } from 'src/app/core/services/reverse-route.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  path?: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private reverseRoute: ReverseRouteService) {}

  ngOnInit() {
    const source = this.route.paramMap;
    source.subscribe((params: ParamMap) => {
      const articleHash = params.get('id');
      // HttpClient sanitize this path before sending request.
      this.path = `assets/article/${articleHash}.md`;
    });
  }

  onLoad(event) {
    console.log(event);
  }

  onError(event) {
    if (event instanceof HttpErrorResponse) {
      if (event.status === 404) {
        this.reverseRoute.resolve('not_found').then(url => {
          const link = [url, {}];
          this.router.navigate(link);
        });
      }
    }

    // fallback
    this.reverseRoute.resolve('top').then(url => {
      const link = [url, {}];
      this.router.navigate(link);
    });
  }
}
