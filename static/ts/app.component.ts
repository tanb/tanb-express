import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { APP_ROUTES, Routes} from './app.route';

@Component({
    selector: 'my-app',
    templateUrl: 'static/templates/app.component.html',
    styleUrls: ['static/css/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
    ],
    providers: [
        ROUTER_PROVIDERS,
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
