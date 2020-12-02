import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { ProfileComponent } from 'src/app/profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class JaRoutingModule {}
