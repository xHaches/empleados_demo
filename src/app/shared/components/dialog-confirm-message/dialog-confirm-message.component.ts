import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-dialog-confirm-message',
  templateUrl: './dialog-confirm-message.component.html',
  styleUrls: ['./dialog-confirm-message.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class DialogConfirmMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string},
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({confirmed: true});
  }

  cancel() {
    this.dialogRef.close({confirmed: false});
  }

}
