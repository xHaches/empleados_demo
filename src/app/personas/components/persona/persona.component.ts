import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonasService } from '../../services/personas.service';
import { PersonasStoreService } from '../../services/personas-store.service';
import { MaintenanceMode } from 'src/app/shared/enums/maintenance-mode.enum';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {


  personaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    fechaNacimiento: [new Date(), [Validators.required]],
  })

  get nombre() {
    return this.personaForm.get('nombre');
  }

  get apellido() {
    return this.personaForm.get('apellido');
  }

  get fechaNacimiento() {
    return this.personaForm.get('fechaNacimiento');
  }

  constructor(
    public dialogRef: MatDialogRef<PersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personaId: number },
    private readonly fb: FormBuilder,
    private readonly personasService: PersonasService,
    private readonly personaStoreService: PersonasStoreService
  ) { }

  mode(): MaintenanceMode {
    return !!this.data?.personaId ? MaintenanceMode.EDIT : MaintenanceMode.CREATE;
  }

  ngOnInit(): void {
    if(this.mode() === MaintenanceMode.CREATE) {
      return;
    }
    const persona = this.personasService.getById(this.data.personaId);
    this.nombre?.setValue(persona?.nombre!);
    this.apellido?.setValue(persona?.apellido!);
    this.fechaNacimiento?.setValue(persona?.fechaNacimiento!);
  }

  confirm() {
    const persona = {
      id: this.personasService.count(),
      nombre: this.nombre?.value!,
      apellido: this.apellido?.value!,
      fechaNacimiento: this.fechaNacimiento?.value!
    }
    if(this.mode() === MaintenanceMode.CREATE) {
      this.personasService.add({...persona, id: this.personasService.count() + 1});
      this.personaStoreService.add({...persona, id: this.personasService.count() });
      this.dialogRef.close({confirmed: true});
      return;
    }
    this.personasService.edit({item: persona, id: this.data?.personaId});
    this.personaStoreService.edit({item: persona, id: this.data?.personaId});
    this.dialogRef.close({confirmed: true});
  }

  close() {
    this.dialogRef.close();
  }

}
