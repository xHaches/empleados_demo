import { Injectable } from '@angular/core';
import { EmpleadosPuestosService } from 'src/app/empleados-puestos/services/empleados-puestos.service';
import { PersonasService } from 'src/app/personas/services/personas.service';
import { PuestosService } from 'src/app/puestos/services/puestos.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { empleadosPuestos, personas, puestos } from './data';
import { PuestosStoreService } from 'src/app/puestos/services/puestos-store.service';
import { PersonasStoreService } from 'src/app/personas/services/personas-store.service';
import { EmpleadosPuestosStoreService } from 'src/app/empleados-puestos/services/empleados-puestos-store.service';




@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(
    private readonly puestosService: PuestosService,
    private readonly personasService: PersonasService,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly puestosStoreService: PuestosStoreService,
    private readonly personasStoreService: PersonasStoreService,
    private readonly empleadosPuestosStoreService: EmpleadosPuestosStoreService
  ) { }


  start() {
    if(!localStorage.getItem('personas') && !localStorage.getItem('puestos') && !localStorage.getItem('empleadosPuestos')) {
      this.seedPersonas();
      this.seedPuestos();
      this.seedEmpleadosPuestos();
      this.personasStoreService.setItems(this.personasService.getItems());
      this.puestosStoreService.setItems(this.puestosService.getItems());
      this.empleadosPuestosStoreService.setItems(this.empleadosPuestosService.getItems());
    }
  }

  private seedPersonas() {
    personas.forEach(p => this.personasService.add(p))
  }

  private seedPuestos() {
    puestos.forEach(p => this.puestosService.add(p))
  }

  private seedEmpleadosPuestos() {
    empleadosPuestos.forEach(ep => this.empleadosPuestosService.add(ep))
  }

}
