import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';

import { HighlightService } from 'src/app/highlight.service';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogComponent implements OnInit, AfterViewChecked {
  ngOnInit() {}

  constructor(private router: Router,
              private heighlight: HighlightService,
              private route: ActivatedRoute) {
  }

  ngAfterViewChecked() {
    this.heighlight.highlightAll();
  }
}
