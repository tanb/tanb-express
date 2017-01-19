import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent }   from './root.component';
import { TanbComponent }      from './tanb.component';
import { SettingsComponent }  from './settings.component';

const routes: Routes = [
    { path: '',  component: RootComponent },
    { path: 'tanb', component: TanbComponent },
    { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
