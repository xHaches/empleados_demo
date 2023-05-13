import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class TableComponent implements OnInit, OnChanges {


  @Input('columns') columns: string[] = [];
  @Input('items') items: any = [];

  @Output('onEdit') onEdit = new EventEmitter<number>();
  @Output('onDelete') onDelete = new EventEmitter<number>();

  constructor() { }

  columnsToShow() {
    return this.columns.filter(c => c !== 'opciones');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['columns']) {
      this.columns = changes['columns'].currentValue;
      this.columns.push('opciones')
    }
  }

  ngOnInit(): void {
  }

  triggerEdit(id: number) {
    this.onEdit.emit(id);
  }

  triggerDelete(id: number) {
    this.onDelete.emit(id);
  }

}
