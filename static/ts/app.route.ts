import { Route } from 'angular2/router';
import { RootComponent } from './root.component'
import { TanbComponent } from './tanb.component'
import { SettingsComponent } from './settings.component'

export var Routes = {
    root: new Route({
        path: '/',
        name: 'Root',
        component: RootComponent,
    }),
    tanb: new Route({
        path: '/tanb',
        name: 'Tanb',
        component: TanbComponent,
        useAsDefault: true
    }),
    settings: new Route({
        path: '/settings',
        name: 'Settings',
        component: SettingsComponent,
    }),
}
export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
