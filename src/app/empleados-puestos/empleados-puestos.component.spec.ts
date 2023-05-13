import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosPuestosComponent } from './empleados-puestos.component';

describe('EmpleadosPuestosComponent', () => {
  let component: EmpleadosPuestosComponent;
  let fixture: ComponentFixture<EmpleadosPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosPuestosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
