import { TestBed } from '@angular/core/testing';

import { PuestosStoreService } from './puestos-store.service';

describe('PuestosStoreService', () => {
  let service: PuestosStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
