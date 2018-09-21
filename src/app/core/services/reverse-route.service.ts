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

  resolve(name: string, params?: {[key: string]: string}): Promise<string> {
    for (const route of this.routes) {
      if (route.name === name) {
        let path = route.path;
        if (params) {
          Object.keys(params).forEach((key, ids, keys) => {
            path = lodash.replace(path, ':' + key, params[key]);
          });
        }
        return Promise.resolve(path);
      }
    }
    Promise.reject(new Error(`Url name ${name} doesn't exist.`));
  };
}
