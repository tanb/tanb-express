import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as lodash from 'lodash';

import { NamedRoutes } from 'src/app/core/routing/named-route';

@Injectable({
  providedIn: 'root'
})
export class ReverseRouteService {
  routes: NamedRoutes;
  constructor(private router: Router) {
    this.routes = this.router.config;
  }

  resolve(...nameAndValues: any[]) {
    const name = lodash.pullAt(nameAndValues, [0])[0];
    for (const route of this.routes) {
      if (route.name === name) {
        let path = route.path;
        if (nameAndValues.length > 0) {
          for (let value of nameAndValues) {
            path = lodash.replace(path, /:\w+/, value);
          }
        }
        return Promise.resolve(path);
      }
    }
    Promise.reject(new Error(`Url name ${name} doesn't exist.`));
  }
}
