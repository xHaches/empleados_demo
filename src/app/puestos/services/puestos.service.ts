import { Injectable } from '@angular/core';
import { EmpleadosPuestosStoreService } from 'src/app/empleados-puestos/services/empleados-puestos-store.service';
import { EmpleadosPuestosService } from 'src/app/empleados-puestos/services/empleados-puestos.service';
import { crud } from 'src/app/shared/interfaces/crud.interface';
import { Puesto } from 'src/app/shared/interfaces/puesto.interface';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PuestosService implements crud<Puesto> {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly empleadosPuestosStoreService: EmpleadosPuestosStoreService
  ) { }

  private personasExist() {
    const puestos = this.localStorageService.getItem<Puesto[]>('puestos');
    if(!(puestos as Puesto[])?.length) {
      return false;
    }
    return true;
  }

  private getPuestosFromLs(): Puesto[] {
    const puestos = this.localStorageService.getItem<Puesto[]>('puestos');
    if(!(puestos as Puesto[])?.length) {
      return [];
    }
    return puestos as Puesto[];
  }

  getItems(): Puesto[] {
    if(!this.personasExist()) {
      return [];
    }
    return this.getPuestosFromLs();
  }

  getById(id: number): Puesto | null {
    if(!this.personasExist()) {
      return null;
    }
    return this.getPuestosFromLs().find(puesto => puesto.id === id)!;
  }

  add(item: Puesto): Puesto {
    let newList = this.getPuestosFromLs();
    newList.push(item);
    this.localStorageService.setItem('puestos', newList);
    return item;
  }

  edit({id, item}: {id: number, item: Puesto}): Puesto {
    let newList = this.getPuestosFromLs();
    const itemToEditIndex = newList.findIndex(puesto => puesto.id === id);
    newList[itemToEditIndex] = {...item, id};
    this.localStorageService.setItem('puestos', newList);
    const empleadoPuestoToEdit = this.empleadosPuestosService.getItems().find(item => item.persona.id === id);
    if(!empleadoPuestoToEdit) {
      return item;
    }
    this.empleadosPuestosService.edit({id, item: {...empleadoPuestoToEdit, puesto: item}});
    this.empleadosPuestosStoreService.edit({id, item: {...empleadoPuestoToEdit, puesto: item}});
    return item;
  }

  remove(id: number): Puesto {
    const itemToDelete = this.getById(id);
    let newList = this.getPuestosFromLs().filter(puesto => puesto.id !== id);
    this.localStorageService.setItem('puestos', newList);
    return itemToDelete!;
  }

  count() {
    return this.getPuestosFromLs().length;
  }

}
