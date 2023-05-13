import { TestBed } from '@angular/core/testing';

import { PersonasStoreService } from './personas-store.service';

describe('PersonasStoreService', () => {
  let service: PersonasStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
