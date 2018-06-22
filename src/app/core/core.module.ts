import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { IndicatorService } from './services/indicator.service';
import { ApiService } from './services/api/api.service';
import { ClientService } from './services/api/client.service';
import { NavComponent } from './nav/nav.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    GaService,
    ApiService,
    ClientService,
    NotificationService,
    IndicatorService
  ],
  declarations: [
    NavComponent,
    ContactMeComponent
  ],
  entryComponents: [
    ContactMeComponent
  ],
  exports: [
    BrowserModule,
    NavComponent
  ]
})
export class CoreModule { }
