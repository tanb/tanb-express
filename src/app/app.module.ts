import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { TanbComponent, HomeComponent, PageNotFoundComponent, SettingsComponent } from 'app/components';
import { AppComponent } from 'app/app.component';

const appRoutes: Routes = [
  { path: 'tanb', component: TanbComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  providers: [],
  declarations: [
    AppComponent,
    TanbComponent,
    HomeComponent,
    PageNotFoundComponent,
    SettingsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CoreModule
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
