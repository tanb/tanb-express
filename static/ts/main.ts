import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { enableProdMode, provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { LocationStrategy, HashLocationStrategy } from 'angular2/router';
import 'rxjs/Rx';

// enable production mode and thus disable debugging information
// enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
]);
