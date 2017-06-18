import { Injectable } from '@angular/core';

@Injectable()
export class GaService {
    public ENABLE_GA_KEY = 'disable-ga';
    constructor() {
        ga('create', 'UA-77462810-1', 'auto');
    }
    pageview(path) {
        if (jQuery.cookie(this.ENABLE_GA_KEY) === undefined) {
            ga('send', 'pageview', path);
        } else {
            console.log('website analytics disabled.');
        }
    }
}
