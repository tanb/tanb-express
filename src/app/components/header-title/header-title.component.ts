import { NgClass } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-header-title",
  templateUrl: "./header-title.component.html",
  imports: [NgClass],
  styleUrls: ["./header-title.component.scss"],
})
export class HeaderTitleComponent {}
