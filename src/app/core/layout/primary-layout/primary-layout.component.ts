import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavComponent } from '../../../components/nav/nav.component';

@Component({
  selector: 'app-primary-layout',
  standalone: true,
  template: `
    <app-nav />
    <router-outlet />
    <app-footer />
  `,
  styleUrls: ['./primary-layout.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'tw-flex tw-flex-col tw-h-[100dvh] tw-overflow-y-scroll',
  },
  imports: [RouterOutlet, NavComponent, FooterComponent],
})
export class PrimaryLayoutComponent {}
