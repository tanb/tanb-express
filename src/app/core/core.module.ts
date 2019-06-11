import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ApiService } from './services/api/api.service';
import { BackdropComponent } from './modal/backdrop/backdrop.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';
import { FooterComponent } from './footer/footer.component';
import { GaService } from './services/ga.service';
import { NavComponent } from './nav/nav.component';
import { NotificationService } from './services/notification.service';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { IndicatorService } from './services/indicator.service';
import { ReverseRouteDirective } from './directives/reverse-route.directive';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    ApiService,
    GaService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfxPWAUAAAAADvxeRj8HOXDGc3i8jxx7j9Hv_yO',
      } as RecaptchaSettings,
    },
    NotificationService,
    IndicatorService
  ],
  declarations: [
    BackdropComponent,
    ContactMeComponent,
    FooterComponent,
    NavComponent,
    HeaderTitleComponent,
    IndicatorComponent,
    ReverseRouteDirective
  ],
  entryComponents: [
    BackdropComponent,
    ContactMeComponent,
    IndicatorComponent
  ],
  exports: [
    BrowserModule,
    FooterComponent,
    HeaderTitleComponent,
    MarkdownModule,
    NavComponent,
    ReverseRouteDirective
  ]
})
export class CoreModule { }
