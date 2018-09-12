import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { ModalService } from './services/modal.service';
import { IndicatorService } from './services/indicator.service';
import { IndicatorComponent } from './indicator/indicator.component';
import { ApiService } from './services/api/api.service';
import { NavComponent } from './nav/nav.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { BackdropComponent } from './modal/backdrop/backdrop.component';

@NgModule({
  imports: [
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpClientModule,
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
    NotificationService,
    IndicatorService
  ],
  declarations: [
    NavComponent,
    IndicatorComponent,
    ContactMeComponent,
    FooterComponent,
    HeaderTitleComponent,
    BackdropComponent
  ],
  entryComponents: [
    BackdropComponent,
    ContactMeComponent,
    IndicatorComponent
  ],
  exports: [
    BrowserModule,
    NavComponent,
    FooterComponent,
    HeaderTitleComponent
  ]
})
export class CoreModule { }
