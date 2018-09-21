import { Component, OnInit } from '@angular/core';

import { articles } from 'src/articles';
import { ReverseRouteService } from 'src/app/core/services/reverse-route.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];

  constructor(private reverseRoute: ReverseRouteService) {
    this.resolveArticlePaths()
  }

  ngOnInit() {
  }

  async resolveArticlePaths() {
    this.articles = [];
    for (let article of articles) {
      let info = new Object;
      Object.assign(info, article);
      info['path'] = await this.reverseRoute.resolve('article', {id: article.id});
      this.articles.push(info);
    };
    console.log(this.articles);
  }
}
