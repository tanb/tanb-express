import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

import { HighlightService } from 'src/app/services/highlight.service';
import { SEOService } from 'src/app/services/seo.service';

declare var ng: any;

interface ScullyRoute {
  description: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogComponent implements OnInit, AfterViewChecked {
  blog$ = this.srs.getCurrent();

  constructor(private router: Router,
              private seo: SEOService,
              private srs: ScullyRoutesService,
              private heighlight: HighlightService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.blog$.subscribe((b) => {
      this.seo.updateOgDescription(b.description);
      this.seo.updateDescription(b.description);
    });
  }

  ngAfterViewChecked() {
    this.heighlight.highlightAll();
  }
}
