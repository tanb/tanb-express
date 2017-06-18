import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { GaService } from 'app/services/ga/ga.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    private pushButtonCount = 0;
    constructor(public router: Router,
               public gaservice: GaService) {
        router.events.subscribe( (event) => {
            if (event instanceof RoutesRecognized) {
                this.gaservice.pageview(event.url);
            }
        });
    }

    ngOnInit() {
    }

    pushButton() {
        this.pushButtonCount = this.pushButtonCount + 1;
        if (this.pushButtonCount > 2) {
            const link = ['/settings', {}];
            this.pushButtonCount = 0;
            this.router.navigate(link);
        }
    }
}
