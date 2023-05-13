import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosPuestosRoutingModule } from './empleados-puestos-routing.module';
import { EmpleadosPuestosComponent } from './empleados-puestos.component';
import { EmpleadoPuestoComponent } from './empleado-puesto/empleado-puesto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TableComponent } from '../shared/components/table/table.component';


@NgModule({
  declarations: [
    EmpleadosPuestosComponent,
    EmpleadoPuestoComponent
  ],
  imports: [
    CommonModule,
    EmpleadosPuestosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TableComponent
  ],
  exports: [
    EmpleadosPuestosComponent
  ]
})
export class EmpleadosPuestosModule { }
