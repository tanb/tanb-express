import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayjsPipe } from '../../core/pipes/dayjs.pipe';

@Component({
  standalone: true,
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  host: {
    class: 'tw-flex-1',
  },
  imports: [FormsModule, DayjsPipe],
})
export class ToolsComponent implements OnInit {
  timestamp = '';

  ngOnInit(): void {
    this.timestamp = new Date().getTime().toString();
  }
}
