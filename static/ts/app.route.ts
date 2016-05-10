import { Route } from 'angular2/router';
import { RootComponent } from './root.component'
import { TanbComponent } from './tanb.component'

export var Routes = {
    tanb: new Route({
        path: '/tanb',
        name: 'Tanb',
        component: TanbComponent,
        useAsDefault: true
    }),
    root: new Route({
        path: '/',
        name: 'Root',
        component: RootComponent,
    }),
}
export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
