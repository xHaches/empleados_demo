import { Injectable } from '@angular/core';
import { crud } from 'src/app/shared/interfaces/crud.interface';
import { EmpleadoPuesto } from 'src/app/shared/interfaces/empleado-puesto.interface';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPuestosService implements crud<EmpleadoPuesto> {

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) { }

  private personasExist() {
    const puestos = this.localStorageService.getItem<EmpleadoPuesto[]>('empleadosPuestos');
    if(!(puestos as EmpleadoPuesto[])?.length) {
      return false;
    }
    return true;
  }

  private getEmpleadosPuestosFromLs(): EmpleadoPuesto[] {
    const puestos = this.localStorageService.getItem<EmpleadoPuesto[]>('empleadosPuestos');
    if(!(puestos as EmpleadoPuesto[])?.length) {
      return [];
    }
    return puestos as EmpleadoPuesto[];
  }

  getItems(): EmpleadoPuesto[] {
    if(!this.personasExist()) {
      return [];
    }
    return this.getEmpleadosPuestosFromLs();
  }

  getById(id: number): EmpleadoPuesto | null {
    if(!this.personasExist()) {
      return null;
    }
    return this.getEmpleadosPuestosFromLs().find(empleadoPuesto => empleadoPuesto.id === id)!;
  }

  add(item: EmpleadoPuesto): EmpleadoPuesto {
    let newList = this.getEmpleadosPuestosFromLs();
    newList.push(item);
    this.localStorageService.setItem('empleadosPuestos', newList);
    return item;
  }

  edit({id, item}: {id: number, item: EmpleadoPuesto}): EmpleadoPuesto {
    let newList = this.getEmpleadosPuestosFromLs();
    const itemToEditIndex = newList.findIndex(empleadoPuesto => empleadoPuesto.id === id);
    newList[itemToEditIndex] = {...item, id};
    this.localStorageService.setItem('empleadosPuestos', newList);
    return item;
  }

  remove(id: number): EmpleadoPuesto {
    const itemToDelete = this.getById(id);
    let newList = this.getEmpleadosPuestosFromLs().filter(empleadoPuesto => empleadoPuesto.id !== id);
    this.localStorageService.setItem('empleadosPuestos', newList);
    return itemToDelete!;
  }

  count() {
    return this.getEmpleadosPuestosFromLs().length;
  }

  existsByEmpleadoIdOrPuestoId(id: number) {
    return !!this.getItems().filter(item => (item.persona.id === id || item.puesto.id === id)).length
  }

}
