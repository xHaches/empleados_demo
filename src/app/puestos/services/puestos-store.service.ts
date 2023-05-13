import { Injectable } from '@angular/core';
import { PuestosService } from './puestos.service';
import { BehaviorSubject } from 'rxjs';
import { Puesto } from 'src/app/shared/interfaces/puesto.interface';

@Injectable({
  providedIn: 'root'
})
export class PuestosStoreService {

  constructor(
    private readonly puestosService: PuestosService
  ) { }

  private puestos = new BehaviorSubject<Puesto[]>(this.puestosService.getItems());
  puestos$ = this.puestos.asObservable();

  setItems(puestos: Puesto[]) {
    this.puestos.next(puestos);
  }

  add(puesto: Puesto) {
    this.puestos.next([...this.puestos.value, puesto]);
  }

  edit({id, item}: {id: number, item: Puesto}) {
    this.puestos.next(
      this.puestos.value.map(puesto => {
        if(puesto.id === id) {
          return {...item, id}
        }
        return puesto
      })
    );
  }

  delete(id: number) {
    this.puestos.next(
      this.puestos.value.filter(puesto => puesto.id !== id)
    );
  }
}
