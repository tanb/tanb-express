import type { AfterViewInit } from "@angular/core";
import { Component, inject } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

import { MatRipple } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderTitleComponent } from "../../components/header-title/header-title.component";
import { ContactMeComponent } from "../../components/modal/contact-me/contact-me.component";
import { LocalStorageService } from "../../core/services/local-storage.service";
import { LangType } from "../../interfaces/lang.interfaces";
import { DOCUMENT } from "@angular/common";

enum BalloonState {
  top = "top",
  bottom = "bottom",
}

@Component({
  standalone: true,
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  imports: [
    TranslateModule,
    FooterComponent,
    HeaderTitleComponent,
    RouterLink,
    MatRipple,
    ButtonComponent,
  ],
})
export class ProfileComponent implements AfterViewInit {
  readonly #storage = inject(LocalStorageService);
  readonly #translate = inject(TranslateService);
  readonly #dialog = inject(MatDialog);
  readonly #document = inject(DOCUMENT);
  balloonState: BalloonState = BalloonState.bottom;
  age = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.balloonState = BalloonState.top;
    }, 0);
  }

  onChangeLang(lang: LangType) {
    this.#storage.setCurrenrLang(lang);
    this.#translate.use(lang);
  }

  openModal() {
    const recaptchaElm = this.#document
      .getElementById("netlify-inquiry")
      ?.getElementsByClassName("g-recaptcha")[0];
    let siteKey = null;
    if (recaptchaElm) {
      siteKey = recaptchaElm.getAttribute("data-sitekey");
    }
    this.#dialog.open(ContactMeComponent, { data: { siteKey: siteKey ?? "" } });
  }

  protected readonly LangType = LangType;
}
