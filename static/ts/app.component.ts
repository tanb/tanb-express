import { Component } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { APP_ROUTES, Routes} from './app.route';
import { GAService } from './ga.service';
import { AnchorBlankDirective } from './anchor.directive'

@Component({
    selector: 'webapp',
    templateUrl: 'static/templates/app.component.html',
    styleUrls: ['static/css/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        AnchorBlankDirective,
    ],
    providers: [
        GAService,
    ],
    properties: ['routes'],
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    public routes;
    private pushButtonCount: number = 0;
    constructor(public router: Router)
    {
        this.routes = Routes;
    }

    pushButton() {
        this.pushButtonCount = this.pushButtonCount + 1;
        if (this.pushButtonCount > 2) {
            var link = [this.routes.settings.name, {}];
            this.pushButtonCount = 0;
            this.router.navigate(link);
        }
    }
}
