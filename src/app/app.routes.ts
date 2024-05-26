import type { Routes } from '@angular/router';
import { PrimaryLayoutComponent } from './core/layout/primary-layout/primary-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {ToolsComponent} from './pages/tools/tools.component';

function makePrimaryLayoutRoutes(routes: Routes): Routes {
  return [
    {
      path: '',
      component: PrimaryLayoutComponent,
      children: [...routes],
    },
  ];
}

const ANONYMOUS_ROUTES = makePrimaryLayoutRoutes([
  {
    path: '/tools',
    component: ToolsComponent,
    data: {
      label: 'Home',
    },
  },
  {
    path: '',
    component: ProfileComponent,
    data: {
      label: 'Home',
    },
  },
]);

export const routes: Routes = [...ANONYMOUS_ROUTES];
