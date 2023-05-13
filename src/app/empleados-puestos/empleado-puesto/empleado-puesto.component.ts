import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadosPuestosService } from '../services/empleados-puestos.service';
import { EmpleadosPuestosStoreService } from '../services/empleados-puestos-store.service';
import { MaintenanceMode } from 'src/app/shared/enums/maintenance-mode.enum';
import { PersonasService } from 'src/app/personas/services/personas.service';
import { PuestosService } from 'src/app/puestos/services/puestos.service';
import { Persona } from 'src/app/shared/interfaces/persona.interface';
import { Puesto } from 'src/app/shared/interfaces/puesto.interface';

@Component({
  selector: 'app-empleado-puesto',
  templateUrl: './empleado-puesto.component.html',
  styleUrls: ['./empleado-puesto.component.scss']
})
export class EmpleadoPuestoComponent implements OnInit {

  empleadoPuestoForm = this.fb.group({
    idEmpleado: [0, [Validators.required, Validators.min(1)]],
    idPuesto: [0, [Validators.required, Validators.min(1)]],
  })

  get idEmpleadoInput() {
    return this.empleadoPuestoForm.get('idEmpleado');
  }

  get idPuestoInput() {
    return this.empleadoPuestoForm.get('idPuesto');
  }

  empleados: Persona[] = [];
  puestos: Puesto[] = [];

  constructor(
    public dialogRef: MatDialogRef<EmpleadoPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personaPuestoId: number },
    private readonly fb: FormBuilder,
    private readonly empleadosPuestosService: EmpleadosPuestosService,
    private readonly empleadosPuestosStoreService: EmpleadosPuestosStoreService,
    private readonly personasService: PersonasService,
    private readonly puestosService: PuestosService
  ) { }

  mode(): MaintenanceMode {
    return !!this.data?.personaPuestoId ? MaintenanceMode.EDIT : MaintenanceMode.CREATE;
  }

  ngOnInit(): void {
    this.empleados = [...this.personasService.getItems()];
    this.puestos = [...this.puestosService.getItems()];

    if(this.mode() === MaintenanceMode.CREATE) {
      return;
    }
    const empleadoPuesto = this.empleadosPuestosService.getById(this.data.personaPuestoId);
    console.log(empleadoPuesto);

    this.idEmpleadoInput?.setValue(empleadoPuesto?.persona.id!);
    this.idPuestoInput?.setValue(empleadoPuesto?.puesto.id!);
  }

  confirm() {
    const empleadoPuesto = {
      id: this.empleadosPuestosService.count() + 1,
      persona: this.personasService.getById(this.idEmpleadoInput?.value || 0)!,
      puesto: this.puestosService.getById(this.idPuestoInput?.value || 0)!
    }

    if(this.mode() === MaintenanceMode.CREATE) {
      this.empleadosPuestosService.add(empleadoPuesto);
      this.empleadosPuestosStoreService.add(empleadoPuesto);
      this.dialogRef.close({confirmed: true});
      return;
    }
    this.empleadosPuestosService.edit({id: this.data?.personaPuestoId, item: empleadoPuesto});
    this.empleadosPuestosStoreService.edit({id: this.data?.personaPuestoId, item: empleadoPuesto});
    this.dialogRef.close({confirmed: true});
  }

  close() {
    this.dialogRef.close();
  }

}
