import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  imports: [
    FormsModule
  ]
})
export class ToolsComponent implements OnInit {
  timestamp = '';
  
  ngOnInit(): void {
    this.timestamp = `${new Date().getTime()  }`;
  }
}
