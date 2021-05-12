import { TestBed } from '@angular/core/testing';

import { NomicsService } from './nomics.service';

describe('NomicsService', () => {
  let service: NomicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
