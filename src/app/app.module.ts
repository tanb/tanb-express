import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';

import { environment } from 'src/environments/environment';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { BackdropComponent } from './modal/backdrop/backdrop.component';
import { ContactMeComponent } from './modal/contact-me/contact-me.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';

// Directives
import { ReverseRouteDirective } from './directives/reverse-route.directive';
import { RecaptchaValueAccessorDirective } from './recaptcha/recaptcha-value-accessor.directive';

// Services
import { ApiService } from './services/api/api.service';
import { GaService } from './services/ga.service';
import { IndicatorService } from './services/indicator.service';
import { NotificationService } from './services/notification.service';
import { RecaptchaLoaderService } from './recaptcha/recaptcha-loader.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from './recaptcha/recaptcha-settings';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleListComponent,
    BackdropComponent,
    ContactMeComponent,
    CookiePolicyComponent,
    FooterComponent,
    HeaderTitleComponent,
    IndicatorComponent,
    NavComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    ReverseRouteDirective,
    RecaptchaValueAccessorDirective,
    SettingsComponent,
    RecaptchaComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    RecaptchaLoaderService,
    ApiService,
    GaService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfxPWAUAAAAADvxeRj8HOXDGc3i8jxx7j9Hv_yO',
      } as RecaptchaSettings,
    },
    NotificationService,
    IndicatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
