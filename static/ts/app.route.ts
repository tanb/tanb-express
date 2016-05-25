import { Route, AsyncRoute } from '@angular/router-deprecated';

export var Routes = {
    root: new AsyncRoute({
        path: '/',
        name: 'Root',
        loader: () => System.import("static/js/root.component").then(c => c['RootComponent']),
    }),
    tanb: new AsyncRoute({
        path: '/tanb',
        name: 'Tanb',
        loader: () => System.import("static/js/tanb.component").then(c => c['TanbComponent']),
    }),
    settings: new AsyncRoute({
        path: '/settings',
        name: 'Settings',
        loader: () => System.import("static/js/settings.component").then(c => c['SettingsComponent']),
    }),
}
export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
