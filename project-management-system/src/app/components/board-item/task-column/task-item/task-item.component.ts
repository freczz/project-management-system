import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import DeleteConfirmationComponent from 'src/app/components/delete-confirmation/delete-confirmation.component';
import { EMPTY_ITEM_TO_DELETE } from 'src/app/constants/constants';
import { IColumns, IItemToDelete, ITasks } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetItemToDelete } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';
import ModalEditFormComponent from '../modal-edit-form/modal-edit-form.component';

@Component({
  selector: 'pms-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export default class TaskItemComponent implements OnInit {
  @Input() task!: ITasks;

  @Input() column!: IColumns;

  @Input() boardId: string = '';

  public isVisible: boolean = false;

  private token: string = '';

  private taskToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  constructor(
    public dialog: MatDialog,
    public http: HttpService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
  }

  public openDialog(): void {
    this.taskToDelete.title = this.task.title;
    this.taskToDelete.boardId = this.boardId;
    this.taskToDelete.columnId = this.column.id;
    this.taskToDelete.taskId = this.task.id;
    this.store.dispatch(new SetItemToDelete(JSON.stringify(this.taskToDelete)));
    this.dialog.open(DeleteConfirmationComponent);
  }

  public openModalWindow(): void {
    this.http
      .getTask(this.token, this.column.id, this.task.id)
      .subscribe((data: ITasks): void => {
        this.task = data;
        const dialog: MatDialogRef<ModalEditFormComponent> = this.dialog.open(
          ModalEditFormComponent,
          {
            data: { task: this.task, column: this.column },
            disableClose: true,
          }
        );

        dialog
          .beforeClosed()
          .pipe(
            tap((updateData: ITasks): void => {
              if (updateData) this.task = updateData;
            })
          )
          .subscribe();
      });
  }
}
