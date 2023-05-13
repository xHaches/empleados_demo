import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PuestosService } from '../../services/puestos.service';
import { PuestosStoreService } from '../../services/puestos-store.service';
import { MaintenanceMode } from 'src/app/shared/enums/maintenance-mode.enum';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.scss']
})
export class PuestoComponent implements OnInit {

  puestoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  })

  get nombre() {
    return this.puestoForm.get('nombre');
  }

  constructor(
    public dialogRef: MatDialogRef<PuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { puestoId: number },
    private readonly fb: FormBuilder,
    private readonly puestosService: PuestosService,
    private readonly puestosStoreService: PuestosStoreService
  ) { }

  mode(): MaintenanceMode {
    return !!this.data?.puestoId ? MaintenanceMode.EDIT : MaintenanceMode.CREATE;
  }

  ngOnInit(): void {
    if(this.mode() === MaintenanceMode.CREATE) {
      return;
    }
    const persona = this.puestosService.getById(this.data.puestoId);
    this.nombre?.setValue(persona?.nombre!);
  }

  confirm() {
    const puesto = {
      id: this.puestosService.count(),
      nombre: this.nombre?.value!,
    }
    if(this.mode() === MaintenanceMode.CREATE) {
      this.puestosService.add({...puesto, id: this.puestosService.count() + 1});
      this.puestosStoreService.add({...puesto, id: this.puestosService.count()});
      this.dialogRef.close({confirmed: true});
      return;
    }
    this.puestosService.edit({id: this.data?.puestoId, item: puesto});
    this.puestosStoreService.edit({id: this.data?.puestoId, item: puesto});
    this.dialogRef.close({confirmed: true});
  }

  close() {
    this.dialogRef.close();
  }

}
