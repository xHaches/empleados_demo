import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { PersonasModule } from '../personas/personas.module';
import { PuestosModule } from '../puestos/puestos.module';
import { EmpleadosPuestosModule } from '../empleados-puestos/empleados-puestos.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    RouterModule,
    PersonasModule,
    PuestosModule,
    EmpleadosPuestosModule
  ]
})
export class HomeModule { }
