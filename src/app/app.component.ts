import { Component } from '@angular/core';
import { Router }  from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    private pushButtonCount: number = 0;
    constructor(public router: Router)
    {
    }

    pushButton() {
        this.pushButtonCount = this.pushButtonCount + 1;
        if (this.pushButtonCount > 2) {
            this.pushButtonCount = 0;
        }
    }
}
