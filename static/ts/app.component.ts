import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { APP_ROUTES, Routes} from './app.route';

@Component({
    selector: 'my-app',
    templateUrl: 'static/templates/app.component.html',
    styleUrls: ['static/css/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
    ],
    properties: ['routes'],
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    public routes;
    constructor()
    {
        this.routes = Routes;
    }
}
