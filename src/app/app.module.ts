import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { TanbComponent, HomeComponent, PageNotFoundComponent, SettingsComponent } from 'app/components';
import { GaService } from 'app/services';

const appRoutes: Routes = [
  { path: 'tanb', component: TanbComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TanbComponent,
    HomeComponent,
    PageNotFoundComponent,
    SettingsComponent,
  ],
  providers: [GaService]
})
export class AppModule { }
