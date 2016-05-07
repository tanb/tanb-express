import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { enableProdMode, provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';

// enable production mode and thus disable debugging information
// enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
]);
