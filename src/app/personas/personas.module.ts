import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../shared/components/table/table.component';
import { PersonaComponent } from './components/persona/persona.component';


@NgModule({
  declarations: [
    PersonasComponent,
    PersonaComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TableComponent
  ],
  exports: [
    PersonasComponent
  ],
  providers: [
    DatePipe
  ]
})
export class PersonasModule { }
