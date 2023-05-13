import { TestBed } from '@angular/core/testing';

import { EmpleadosPuestosStoreService } from './empleados-puestos-store.service';

describe('EmpleadosPuestosStoreService', () => {
  let service: EmpleadosPuestosStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosPuestosStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
