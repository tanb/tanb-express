import { Injectable } from 'angular2/core';
declare function ga(a: string, b: string, c?: string);

@Injectable()
export class GAService {
    public ENABLE_GA_KEY: string = 'disable-ga';
    constructor() {
        ga('create', 'UA-77462810-1', 'auto');
    }
    pageview(path) {
      if (jQuery.cookie(this.ENABLE_GA_KEY) === undefined) {
          ga('set', 'page', path)
          ga('send', 'pageview');
      } else {
          console.log('website analytics disabled.');
      }
    }
}
