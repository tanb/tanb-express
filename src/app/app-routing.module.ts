import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TanbComponent } from 'src/app/components/tanb/tanb.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/tanb', pathMatch: 'full'},
  { path: 'tanb', component: TanbComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
