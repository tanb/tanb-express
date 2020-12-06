import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { ProfileComponent } from 'src/app/profile/profile.component';
import { DevToolsComponent } from '../dev-tools/dev-tools.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'dev-tools', component: DevToolsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class JaRoutingModule {}
