import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IndicatorService } from 'src/app/core/services/indicator.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  hasError = false;
  completed = false;

  constructor(private modalService: ModalService, private indicator: IndicatorService, private api: ApiService) {
  }

  public reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
    email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
    message: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(2000)])),
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  ngOnInit() {
  }

  onClose() {
    this.modalService.hide();
  }

  submitForm() {
    const body = {
      'name': this.reactiveForm.get('name').value,
      'email': this.reactiveForm.get('email').value,
      'message': this.reactiveForm.get('message').value,
      'recaptcha': this.reactiveForm.get('recaptchaReactive').value
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
        console.log(`handleError: ${error}`);
      });
  }
}
