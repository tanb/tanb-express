import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { IndicatorService } from 'src/app/core/services/indicator.service';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  hasError = false;
  completed = false;

  constructor(public activeModal: NgbActiveModal, private indicator: IndicatorService, private api: ApiService) { }

  public reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
    email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
    message: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(2000)])),
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  ngOnInit() {
  }

  submitForm() {
    const body = {
      'name': this.reactiveForm.get('name').value,
      'email': this.reactiveForm.get('email').value,
      'message': this.reactiveForm.get('message').value,
      'recaptcha': this.reactiveForm.get('recaptchaReactive').value
    };
    const source = this.api.contactMe(body);
    const indicatorRef = this.indicator.show();
    source.subscribe(
      value => console.log(`handleNext:  ${value}`),
      error => {
        this.indicator.hide(indicatorRef);
        this.hasError = true;
        console.log(`handleError: ${error}`);
      },
      () => {
        this.indicator.hide(indicatorRef);
        this.completed = true;
        console.log('handleComplete');
      }
    );
  }
}
