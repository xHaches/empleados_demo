import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmMessageComponent } from '../dialog-confirm-message/dialog-confirm-message.component';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string},
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000)
  }

}
