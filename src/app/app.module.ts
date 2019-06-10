import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SettingsComponent,
    PageNotFoundComponent,
    ArticleComponent,
    ArticleListComponent,
    PrivacyPolicyComponent,
    CookiePolicyComponent
  ],
  imports: [
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
