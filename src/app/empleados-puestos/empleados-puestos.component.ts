import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { EmpleadosPuestosService } from './services/empleados-puestos.service';
import { EmpleadosPuestosStoreService } from './services/empleados-puestos-store.service';
import { EmpleadoPuesto } from '../shared/interfaces/empleado-puesto.interface';
import { DialogMessageComponent } from '../shared/components/dialog-message/dialog-message.component';
import { DialogConfirmMessageComponent } from '../shared/components/dialog-confirm-message/dialog-confirm-message.component';
import { EmpleadoPuestoComponent } from './empleado-puesto/empleado-puesto.component';

@Component({
  selector: 'app-empleados-puestos',
  templateUrl: './empleados-puestos.component.html',
  styleUrls: ['./empleados-puestos.component.scss']
})
export class EmpleadosPuestosComponent implements OnInit {

  private destroy$ = new Subject<boolean>();

  columns = ['id', 'nombreEmpleado', 'apellido', 'fechaNacimiento', 'nombrePuesto', 'opciones'];

  empleadosPuestos: EmpleadoPuesto[] = [];
  totalEmpleadosPuestos: EmpleadoPuesto[] = [];

  searchForm = new FormControl('')

  constructor(
    public dialog: MatDialog,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly empleadosPuestosStoreService: EmpleadosPuestosStoreService,
  ) { }

  ngOnInit(): void {
    this.empleadosPuestosStoreService.empleadosPuestos$.pipe(takeUntil(this.destroy$)).subscribe(empleadosPuestos => {
      this.empleadosPuestos = empleadosPuestos
      this.totalEmpleadosPuestos = [...this.empleadosPuestos];
    });

    this.searchForm.valueChanges
    .subscribe((v) => {
      if (v) {
        const filter = new RegExp(v, "i");
        const filterFields = ['id', 'nombre', 'apellido', 'fechaNacimiento']

        this.empleadosPuestos = this.totalEmpleadosPuestos.filter((empleadoPuesto: EmpleadoPuesto) =>
          filterFields.some((field) => (
            filter.test((empleadoPuesto.puesto as any)[field]) ||
            filter.test(String(empleadoPuesto.id)) ||
            filter.test((empleadoPuesto.persona as any)[field])) )
        );

      } else {
        this.empleadosPuestos = [...this.totalEmpleadosPuestos];
      }
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  create() {
    const ref = this.dialog.open(EmpleadoPuestoComponent);
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
    const ref = this.dialog.open(EmpleadoPuestoComponent, {
      data: {
        personaPuestoId: id
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
      this.empleadosPuestosService.remove(id);
      this.empleadosPuestosStoreService.delete(id);
      this.dialog.open(DialogMessageComponent, {
        data: {
          message: 'Persona eliminada exitosamente.'
        }
      })
    });
  }


}
