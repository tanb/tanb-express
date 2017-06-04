import { Component } from '@angular/core';
import { Router, RoutesRecognized }  from '@angular/router';
import { GaService } from 'app/ga.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    private pushButtonCount: number = 0;
    constructor(public router: Router,
               public gaservice: GaService)
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
