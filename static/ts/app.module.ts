import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { GAService } from './ga.service'

import { RootComponent }   from './root.component';
import { TanbComponent }      from './tanb.component';
import { SettingsComponent }  from './settings.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        RootComponent,
        TanbComponent,
        SettingsComponent
    ],
    providers: [ GAService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
