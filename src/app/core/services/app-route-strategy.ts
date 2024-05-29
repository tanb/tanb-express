import { Injectable } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { BaseRouteReuseStrategy } from '@angular/router';

@Injectable()
export class AppRouteStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(future: ActivatedRouteSnapshot, _: ActivatedRouteSnapshot): boolean {
    return future.children.length !== 0;
  }
}
