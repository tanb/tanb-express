import {Component, OnDestroy, OnInit, VERSION} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { ReverseRouteService } from 'src/app/services/reverse-route.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  copyrightYear: string = moment().utcOffset(9).format('YYYY');
  angularCLIVersion: string = environment.angularCLIVersion;
  angularVersion: string = VERSION.full;
  pushButtonCount = 0;

  constructor(private router: Router, private reverseRoute: ReverseRouteService) {
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  pushButton() {
    this.pushButtonCount = this.pushButtonCount + 1;
    if (this.pushButtonCount < 3) {
      return;
    }
    this.reverseRoute.resolve('settings').then(url => {
      const link = [url, {}];
      this.pushButtonCount = 0;
      this.router.navigate(link);
    });
  }
}
