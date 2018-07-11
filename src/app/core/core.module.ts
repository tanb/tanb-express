import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { IndicatorService } from './services/indicator.service';
import { ApiService } from './services/api/api.service';
import { ClientService } from './services/api/client.service';
import { NavComponent } from './nav/nav.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    AlertModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    GaService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfxPWAUAAAAADvxeRj8HOXDGc3i8jxx7j9Hv_yO',
      } as RecaptchaSettings,
    },
    ApiService,
    ClientService,
    NotificationService,
    IndicatorService
  ],
  declarations: [
    NavComponent,
    ContactMeComponent,
    FooterComponent
  ],
  entryComponents: [
    ContactMeComponent
  ],
  exports: [
    BrowserModule,
    NavComponent,
    FooterComponent
  ]
})
export class CoreModule { }
