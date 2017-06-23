import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaService } from './ga/ga.service';
import { NotificationService } from './notification/notification.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavComponent,
    BrowserModule,
  ],
  providers: [
    GaService,
    NotificationService
  ]
})
export class CoreModule { }
