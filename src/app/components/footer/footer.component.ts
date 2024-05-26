import { Component, inject, VERSION } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

@Component({
  standalone: true,
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  imports: [RouterLink],
})
export class FooterComponent {
  readonly #router = inject(Router);
  copyrightYear: string = dayjs().format("YYYY");
  angularVersion: string = VERSION.full;
  pushButtonCount = 0;

  pushButton() {
    this.pushButtonCount = this.pushButtonCount + 1;
    if (this.pushButtonCount < 3) {
      return;
    }
    this.pushButtonCount = 0;
    this.#router.navigate(["/settings, {}"]);
  }
}
