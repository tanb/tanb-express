import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavComponent } from "../../../components/nav/nav.component";

@Component({
  selector: "app-primary-layout",
  standalone: true,
  template: `
    <div>
      <app-nav />
      <router-outlet></router-outlet>
      <app-footer />
    </div>
  `,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: "tw-flex tw-flex-col tw-h-[100dvh] tw-overflow-y-scroll",
  },
  imports: [RouterOutlet, NavComponent, FooterComponent],
})
export class PrimaryLayoutComponent {}
