import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NamedRoutes } from 'src/app/app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ReverseRouteService {
  routes: NamedRoutes;
  constructor(private router: Router) {
    this.routes = this.router.config;
  }

  resolve(...nameAndValues: any[]) {
    const name = nameAndValues.shift();
    for (const route of this.routes) {
      if (route.name === name) {
        let path = route.path;
        if (nameAndValues.length > 0) {
          for (const value of nameAndValues) {

            path = path.replace(/:\w+/, value);
          }
        }
        return Promise.resolve(path);
      }
    }
    Promise.reject(new Error(`Url name ${name} doesn't exist.`));
  }
}
