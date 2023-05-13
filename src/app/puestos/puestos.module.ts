import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../shared/components/table/table.component';
import { PuestoComponent } from './components/puesto/puesto.component';


@NgModule({
  declarations: [
    PuestosComponent,
    PuestoComponent
  ],
  imports: [
    CommonModule,
    PuestosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TableComponent
  ],
  exports: [
    PuestosComponent
  ]
})
export class PuestosModule { }
