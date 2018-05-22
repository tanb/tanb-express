import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { NavComponent } from './nav/nav.component';

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
  ],
  exports: [
    BrowserModule,
    NavComponent
  ]
})
export class CoreModule { }
