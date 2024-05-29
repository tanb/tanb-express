import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports: [RouterLink],
})
export class NavComponent {}
