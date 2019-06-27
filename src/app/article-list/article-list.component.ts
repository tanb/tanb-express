import { Component, OnInit } from '@angular/core';

import { articles } from 'src/articles';
import { ReverseRouteService } from 'src/app/services/reverse-route.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];

  constructor(private reverseRoute: ReverseRouteService) {
    this.articles = articles;
  }

  ngOnInit() {
  }
}
