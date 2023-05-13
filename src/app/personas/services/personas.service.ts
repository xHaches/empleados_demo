import { Injectable } from '@angular/core';
import { crud } from '../../shared/interfaces/crud.interface';
import { Persona } from '../../shared/interfaces/persona.interface';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { EmpleadosPuestosService } from 'src/app/empleados-puestos/services/empleados-puestos.service';
import { EmpleadosPuestosStoreService } from 'src/app/empleados-puestos/services/empleados-puestos-store.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService implements crud<Persona> {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly empleadosPuestosStoreService: EmpleadosPuestosStoreService
  ) { }

  private personasExist() {
    const personas = this.localStorageService.getItem<Persona[]>('personas');
    if(!(personas as Persona[])?.length) {
      return false;
    }
    return true;
  }

  private getPersonasFromLs(): Persona[] {
    const personas = this.localStorageService.getItem<Persona[]>('personas');
    if(!(personas as Persona[])?.length) {
      return [];
    }
    return personas as Persona[];
  }

  getItems(): Persona[] {
    if(!this.personasExist()) {
      return [];
    }
    return this.getPersonasFromLs();
  }

  getById(id: number): Persona | null {
    if(!this.personasExist()) {
      return null;
    }
    return this.getPersonasFromLs().find(persona => persona.id === id)!;
  }

  add(item: Persona): Persona {
    let newList = this.getPersonasFromLs();
    newList.push(item);
    this.localStorageService.setItem('personas', newList);
    return item;
  }

  edit({id, item}: {id: number, item: Persona}): Persona {
    let newList = this.getPersonasFromLs();
    const itemToEditIndex = newList.findIndex(persona => persona.id === id);
    newList[itemToEditIndex] = {...item, id};
    this.localStorageService.setItem('personas', newList);
    const empleadoPuestoToEdit = this.empleadosPuestosService.getItems().find(item => item.persona.id === id);
    if(!empleadoPuestoToEdit) {
      return item;
    }
    this.empleadosPuestosService.edit({id, item: {...empleadoPuestoToEdit, persona: item}});
    this.empleadosPuestosStoreService.edit({id, item: {...empleadoPuestoToEdit, persona: item}});
    return item;
  }

  remove(id: number): Persona {
    const itemToDelete = this.getById(id);
    let newList = this.getPersonasFromLs().filter(persona => persona.id !== id);
    this.localStorageService.setItem('personas', newList);
    return itemToDelete!;
  }

  count() {
    return this.getPersonasFromLs().length;
  }

}
