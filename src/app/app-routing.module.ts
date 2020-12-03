import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CookiePolicyComponent } from 'src/app/cookie-policy/cookie-policy.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from 'src/app/privacy-policy/privacy-policy.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { SettingsComponent } from 'src/app/settings/settings.component';

export interface NamedRoute extends Route {
  name?: string;
}
export type NamedRoutes = NamedRoute[];

export const routes: NamedRoutes = [
  { path: '', component: ProfileComponent, name: 'top' },
  { path: 'ja', loadChildren: () => import('./ja/ja.module').then(m => m.JaModule) },
  { path: 'cookie-policy', component: CookiePolicyComponent, name: 'cookiePolicy' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, name: 'privacyPolicy' },
  { path: 'settings', component: SettingsComponent, name: 'settings' },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: '404', component: PageNotFoundComponent, name: 'not_found' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
