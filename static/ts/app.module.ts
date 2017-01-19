import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GAService } from './ga.service'

import { RootComponent }   from './root.component';
import { TanbComponent }      from './tanb.component';
import { SettingsComponent }  from './settings.component';

@NgModule({
    imports: [
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
