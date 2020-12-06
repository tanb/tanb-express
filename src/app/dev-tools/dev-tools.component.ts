import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-tools',
  templateUrl: './dev-tools.component.html',
  styleUrls: ['./dev-tools.component.scss']
})
export class DevToolsComponent implements OnInit {
  timestamp: string;

  constructor() { }

  ngOnInit(): void {
    this.timestamp = (new Date()).getTime() + '';
  }
}
