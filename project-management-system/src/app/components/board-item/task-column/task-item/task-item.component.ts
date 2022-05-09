import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITasks } from 'src/app/interfaces/interfaces';
import ModalEditFormComponent from '../modal-edit-form/modal-edit-form.component';

@Component({
  selector: 'pms-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export default class TaskItemComponent {
  @Input() task!: ITasks;

  public isVisible: boolean = false;

  constructor(public dialog: MatDialog) {}

  public openModalWindow(): void {
    this.dialog.open(ModalEditFormComponent);
  }
}
