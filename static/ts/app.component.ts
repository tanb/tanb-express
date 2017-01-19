import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { GAService } from './ga.service';

@Component({
    selector: 'webapp',
    templateUrl: '../../static/templates/app.component.html',
    styleUrls: ['../../static/css/app.component.css'],
})
export class AppComponent {
    private pushButtonCount: number = 0;
    constructor(public router: Router,
                public gaservice: GAService)
    {
        router.events.subscribe( (event) => {
            if(event instanceof RoutesRecognized) {
                this.gaservice.pageview(event.url);
            }
        });
    }

    pushButton() {
        this.pushButtonCount = this.pushButtonCount + 1;
        if (this.pushButtonCount > 2) {
            var link = ['/settings', {}];
            this.pushButtonCount = 0;
            this.router.navigate(link);
        }
    }
}
