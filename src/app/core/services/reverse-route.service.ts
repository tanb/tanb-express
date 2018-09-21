import { Injectable } from '@angular/core';

import { reverse, NamedRoute } from 'src/app/core/routing/routing.module';

@Injectable({
  providedIn: 'root'
})
export class ReverseRouteService {

  constructor() { }

  resolve(name: string) => Promise<string> {
    for (const route of routes) {
      if (route.name === name) {
        return Promise.resolve(route.path);
      }
    }
    Promise.reject(new Error(`Url name ${name} doesn't exist.`));
  };
}
