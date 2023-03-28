import {Input, Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit, OnDestroy {
  @Input() layout: 'mobile' | 'desktop';
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
