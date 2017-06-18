import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TanbComponent } from 'app/tanb/tanb.component';
import { IndexComponent } from 'app/index/index.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';


const appRoutes: Routes = [
    { path: 'tanb', component: TanbComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', component: IndexComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
