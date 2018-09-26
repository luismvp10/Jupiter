import { TestBed, inject } from '@angular/core/testing';

import { AlgoritmoService } from './algoritmo.service';

describe('AlgoritmoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgoritmoService]
    });
  });

  it('should be created', inject([AlgoritmoService], (service: AlgoritmoService) => {
    expect(service).toBeTruthy();
  }));
});
