import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyrightYear: string = moment().utcOffset(9).format("YYYY");
  angularCLIVersion: string = environment.angularCLIVersion;
  angularVersion: string = VERSION.full;
  pushButtonCount: number = 0;

  constructor(private router: Router) {
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