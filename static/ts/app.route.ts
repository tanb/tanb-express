import { Route } from 'angular2/router';
import { RootComponent } from './root.component'

export var Routes = {
    root: new Route({
        path: '/',
        name: 'Root',
        component: RootComponent,
        useAsDefault: true
    }),
    hello: new Route({
        path: '/hello',
        name: 'Hello',
        component: RootComponent,
    }),
}
export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
