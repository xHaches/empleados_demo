import { Component, OnDestroy, OnInit } from '@angular/core';
import { Persona } from '../shared/interfaces/persona.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmMessageComponent } from '../shared/components/dialog-confirm-message/dialog-confirm-message.component';
import { DialogMessageComponent } from '../shared/components/dialog-message/dialog-message.component';
import { PersonasService } from './services/personas.service';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonasStoreService } from './services/personas-store.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmpleadosPuestosService } from '../empleados-puestos/services/empleados-puestos.service';


interface PersonaToTable extends Omit<Persona, 'fechaNacimiento'> {
  fechaNacimiento: string | null
}

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();

  columns = ['id', 'nombre', 'apellido', 'fechaNacimiento'];

  personas: PersonaToTable[] = [];
  totalPersonas: PersonaToTable[] = [];

  searchForm = new FormControl('')

  constructor(
    public dialog: MatDialog,
    private readonly personasService: PersonasService,
    private readonly personasStoreService: PersonasStoreService,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.personasStoreService.personas$.pipe(takeUntil(this.destroy$)).subscribe(personas => {
      this.personas = personas.map(persona => {
        return {...persona, fechaNacimiento: this.datePipe.transform(persona.fechaNacimiento, 'dd/MM/YYYY')}
      });
      this.totalPersonas = [...this.personas];
    });

    this.searchForm.valueChanges
    .subscribe((v) => {
      if (v) {
        const filter = new RegExp(v, "i");
        const filterFields =
        ['id', 'nombre', 'apellido','fechaNacimiento']
        this.personas = this.totalPersonas.filter((persona: any) =>
          filterFields.some((field) => filter.test(persona[field]))
        );

      } else {
        this.personas = [...this.totalPersonas];
      }
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  create() {
    const ref = this.dialog.open(PersonaComponent);
    ref.afterClosed().subscribe((result) => {
      if(!result?.confirmed) {
        return;
      }
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: 'Persona creada exitosamente.'
        }
      })
    });
  }

  onEdit(id: number) {
    const ref = this.dialog.open(PersonaComponent, {
      data: {
        personaId: id
      }
    });
    ref.afterClosed().subscribe((result) => {
      if(!result?.confirmed) {
        return;
      }
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: `Persona con el id ${id} exitosamente.`
        }
      })
    });
  }

  onDelete(id: number) {
    const ref = this.dialog.open(DialogConfirmMessageComponent, {
      data: {
        message: `Deseas eliminar a la persona con el id ${id}?`
      }
    })
    ref.afterClosed().subscribe((result) => {
      if(!result?.confirmed) {
        return;
      }
      if(this.empleadosPuestosService.existsByEmpleadoIdOrPuestoId(id)) {
        return this.dialog.open(DialogMessageComponent, {
          data: {
            message: 'No es posible eliminar el registro porque existe una relación con un puesto.'
          }
        })
      }
      this.personasService.remove(id);
      this.personasStoreService.delete(id);
      return this.dialog.open(DialogMessageComponent, {
        data: {
          message: 'Persona eliminada exitosamente.'
        }
      })
    });
  }

}
