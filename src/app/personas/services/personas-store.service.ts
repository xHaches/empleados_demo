import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Persona } from 'src/app/shared/interfaces/persona.interface';
import { PersonasService } from './personas.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasStoreService {

  constructor(
    private readonly personasService: PersonasService
  ) { }

  private personas = new BehaviorSubject<Persona[]>(this.personasService.getItems());
  personas$ = this.personas.asObservable();

  setItems(personas: Persona[]) {
    this.personas.next(personas);
  }

  add(persona: Persona) {
    this.personas.next([...this.personas.value, persona]);
  }

  edit({id, item}: {id: number, item: Persona}) {
    this.personas.next(
      this.personas.value.map(persona => {
        if(persona.id === id) {
          return {...item, id}
        }
        return persona
      })
    );
  }

  delete(id: number) {
    this.personas.next(
      this.personas.value.filter(persona => persona.id !== id)
    );
  }
}
