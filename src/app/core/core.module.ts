import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { NavComponent } from './nav/nav.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    GaService,
    NotificationService
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
