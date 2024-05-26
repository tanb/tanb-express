import { Component } from "@angular/core";
import { NavigateLinkDirective } from "../../core/directives/navigate-link/navigate-link.directive";

@Component({
  standalone: true,
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  imports: [NavigateLinkDirective],
})
export class NavComponent {}
