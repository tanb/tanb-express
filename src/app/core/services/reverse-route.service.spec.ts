import { TestBed } from '@angular/core/testing';

import { ReverseRouteService } from './reverse-route.service';

describe('ReverseRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReverseRouteService = TestBed.get(ReverseRouteService);
    expect(service).toBeTruthy();
  });
});
