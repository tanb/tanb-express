import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { SettingsComponent } from 'src/app/settings/settings.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

export interface NamedRoute extends Route {
  name?: string;
}

export type NamedRoutes = NamedRoute[];

const routes: NamedRoutes = [
  { path: '', component: ProfileComponent, name: 'top' },
  { path: 'settings', component: SettingsComponent, name: 'settings' },
  { path: '**', component: PageNotFoundComponent }
];

export const reverse: (name: string) => Promise<string> = (name: string) => {
  for (const route of routes) {
    if (route.name === name) {
      return Promise.resolve(route.path);
    }
  }
  Promise.reject(new Error(`Url name ${name} doesn't exist.`));
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
