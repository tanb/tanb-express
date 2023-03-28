import {Inject, Component, OnInit, OnDestroy} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, OnDestroy {
  hasError = false;
  completed = false;
  public forms = {
    name: new UntypedFormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
    email: new UntypedFormControl(null, Validators.compose([Validators.required, Validators.email])),
    message: new UntypedFormControl(null, Validators.compose([Validators.required, Validators.maxLength(2000)])),
    recaptchaReactive: new UntypedFormControl(null, Validators.required)
  };
  siteKey: string;
  public reactiveForm: UntypedFormGroup = new UntypedFormGroup(this.forms);

  constructor(private translate: TranslateService,
              private modalService: ModalService,
              private indicator: IndicatorService,
              private api: ApiService,
              @Inject(DOCUMENT) private doc: Document) {
    const recaptchaElm = this.doc.getElementById('netlify-inquiry').getElementsByClassName('g-recaptcha')[0];
    if (recaptchaElm) {
      this.siteKey = recaptchaElm.getAttribute('data-sitekey');
    }
    this.translate.use(this.translate.currentLang);
  }

  keys(obj: any) {
    return Object.keys(obj);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  onClose() {
    this.modalService.hide();
  }

  submitForm() {
    const body = {
      'form-name': 'inquiry',
      name: this.forms.name.value,
      email: this.forms.email.value,
      message: this.forms.message.value,
      'g-recaptcha-response': this.forms.recaptchaReactive.value
    };

    const indicatorRef = this.indicator.show();
    this.api.contactMe(body)
      .then(contactMe => {
        this.indicator.hide(indicatorRef);
        this.completed = true;
      })
      .catch(error => {
        this.indicator.hide(indicatorRef);
        this.hasError = true;
        console.log(error);
        console.log(`handleError: ${error}`);
      });
  }
}
