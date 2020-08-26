import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

import { HighlightService } from 'src/app/services/highlight.service';
import { SEOService } from 'src/app/services/seo.service';

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

  constructor(private seo: SEOService,
              private srs: ScullyRoutesService,
              private heighlight: HighlightService) {
  }

  ngOnInit() {
    this.blog$.subscribe((b) => {
      this.seo.updateTitle(b.title);
      this.seo.updateOgDescription(b.description);
      this.seo.updateDescription(b.description);
    });
  }

  ngAfterViewChecked() {
    this.heighlight.highlightAll();
  }
}
