import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { AppComponent } from 'app/app.component';
import { TanbComponent } from 'app/tanb/tanb.component';
import { IndexComponent } from 'app/index/index.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        TanbComponent,
        IndexComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
