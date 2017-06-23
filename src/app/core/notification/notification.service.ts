import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {
  routechanged = new EventEmitter();
  didClickNavbarBrand = new EventEmitter();
  constructor() { }
}
