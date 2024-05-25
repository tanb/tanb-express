import { DOCUMENT, NgIf } from '@angular/common';
import type { AfterViewInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api/api.service';
import { IndicatorService } from '../../../core/services/indicator.service';
import { RecaptchaValueAccessorDirective } from '../../../core/services/recaptcha/recaptcha-value-accessor.directive';
import { RecaptchaComponent } from '../../../core/services/recaptcha/recaptcha.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  standalone: true,
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  imports: [TranslateModule, ReactiveFormsModule, NgIf, ButtonComponent, RecaptchaComponent, RecaptchaValueAccessorDirective],
})
export class ContactMeComponent implements AfterViewInit {
  readonly #indicator = inject(IndicatorService);
  readonly #api = inject(ApiService);
  readonly #translate = inject(TranslateService);
  readonly #dialog = inject(MatDialog);
  readonly #document = inject(DOCUMENT);
  hasError = false;
  completed = false;
  readonly formGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
    email: new FormControl<string | null>(null, Validators.compose([Validators.required, Validators.email])),
    message: new FormControl<string | null>(null, Validators.compose([Validators.required, Validators.maxLength(2000)])),
    recaptchaReactive: new FormControl<string | null>(null, Validators.required),
  });
  siteKey: string | null = null;

  ngAfterViewInit() {
    const recaptchaElm = this.#document.getElementById('netlify-inquiry')?.getElementsByClassName('g-recaptcha')[0];
    if (recaptchaElm) {
      this.siteKey = recaptchaElm.getAttribute('data-sitekey');
    }
    this.#translate.use(this.#translate.currentLang);
  }

  onClose() {
    this.#dialog.closeAll();
  }

  submitForm() {
    const body = {
      'form-name': 'inquiry',
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      message: this.formGroup.get('message')?.value,
      'g-recaptcha-response': this.formGroup.get('recaptchaReactive')?.value,
    };

    const indicatorRef = this.#indicator.show();
    this.#api
      .contactMe(body)
      .then((_) => {
        this.#indicator.hide(indicatorRef);
        this.completed = true;
      })
      .catch((error) => {
        this.#indicator.hide(indicatorRef);
        this.hasError = true;
        console.log(error);
        console.log(`handleError: ${error}`);
      });
  }
}
