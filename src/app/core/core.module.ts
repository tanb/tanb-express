import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaService } from './services/ga.service';
import { NotificationService } from './services/notification.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
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
