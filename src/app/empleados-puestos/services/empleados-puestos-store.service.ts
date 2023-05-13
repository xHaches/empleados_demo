import { Injectable } from '@angular/core';
import { EmpleadosPuestosService } from './empleados-puestos.service';
import { BehaviorSubject } from 'rxjs';
import { EmpleadoPuesto } from 'src/app/shared/interfaces/empleado-puesto.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPuestosStoreService {
  constructor(
    private readonly empleadosPuestosService: EmpleadosPuestosService
  ) { }

  private empleadosPuestos = new BehaviorSubject<EmpleadoPuesto[]>(this.empleadosPuestosService.getItems());
  empleadosPuestos$ = this.empleadosPuestos.asObservable();

  setItems(empleadosPuestos: EmpleadoPuesto[]) {
    this.empleadosPuestos.next(empleadosPuestos);
  }

  add(puesto: EmpleadoPuesto) {
    this.empleadosPuestos.next([...this.empleadosPuestos.value, puesto]);
  }

  edit({id, item}: {id: number, item: EmpleadoPuesto}) {
    this.empleadosPuestos.next(
      this.empleadosPuestos.value.map(puesto => {
        if(puesto.id === id) {
          return {...item, id}
        }
        return puesto
      })
    );
  }

  delete(id: number) {
    this.empleadosPuestos.next(
      this.empleadosPuestos.value.filter(empleadoPuesto => empleadoPuesto.id !== id)
    );
  }
}
