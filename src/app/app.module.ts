import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AppComponent } from 'app/app.component';
import { TanbComponent, HomeComponent, PageNotFoundComponent, SettingsComponent } from 'app/components';

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
  bootstrap: [AppComponent],
})
export class AppModule { }
