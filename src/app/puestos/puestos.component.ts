import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Puesto } from '../shared/interfaces/puesto.interface';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../shared/components/dialog-message/dialog-message.component';
import { DialogConfirmMessageComponent } from '../shared/components/dialog-confirm-message/dialog-confirm-message.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { PuestosService } from './services/puestos.service';
import { PuestosStoreService } from './services/puestos-store.service';
import { EmpleadosPuestosService } from '../empleados-puestos/services/empleados-puestos.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss']
})
export class PuestosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  columns = ['id', 'nombre'];

  puestos: Puesto[] = [];
  totalPuestoss: Puesto[] = [];

  searchForm = new FormControl('')

  constructor(
    public dialog: MatDialog,
    private readonly puestosService: PuestosService,
    private readonly puestosStoreService: PuestosStoreService,
    private readonly empleadosPuestosService: EmpleadosPuestosService
  ) { }

  ngOnInit(): void {
    this.puestosStoreService.puestos$.pipe(takeUntil(this.destroy$)).subscribe(puestos => {
      this.puestos = puestos
      this.totalPuestoss = [...this.puestos];
    });

    this.searchForm.valueChanges
    .subscribe((v) => {
      if (v) {
        const filter = new RegExp(v, "i");
        const filterFields = ['id', 'nombre']
        this.puestos = this.totalPuestoss.filter((persona: any) =>
          filterFields.some((field) => filter.test(persona[field]))
        );

      } else {
        this.puestos = [...this.totalPuestoss];
      }
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  create() {
    const ref = this.dialog.open(PuestoComponent);
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
    const ref = this.dialog.open(PuestoComponent, {
      data: {
        puestoId: id
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
        message: `Deseas eliminar el puesto con el id ${id}?`
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
      this.puestosService.remove(id);
      this.puestosStoreService.delete(id);
      return this.dialog.open(DialogMessageComponent, {
        data: {
          message: 'Persona eliminada exitosamente.'
        }
      })
    });
  }

}
