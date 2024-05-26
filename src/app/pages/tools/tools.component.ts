import { Component, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-dev-tools",
  templateUrl: "./dev-tools.component.html",
  styleUrls: ["./dev-tools.component.scss"],
})
export class ToolsComponent implements OnInit {
  timestamp: string = "";

  constructor() {}

  ngOnInit(): void {
    this.timestamp = new Date().getTime() + "";
  }
}
