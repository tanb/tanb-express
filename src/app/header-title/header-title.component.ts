import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {
  @Input() layout: 'mobile' | 'desktop';
  constructor() { }

  ngOnInit() {
  }
}
