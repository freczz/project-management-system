import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { IColumns, IResponse, ITasks } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
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

  public isVisible: boolean = false;

  private token: string = '';

  constructor(
    public dialog: MatDialog,
    public http: HttpService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
  }

  public deleteTask(): void {
    this.http
      .getTask(this.token, this.column.id, this.task.id)
      .subscribe((dataTask: ITasks) => {
        this.task = dataTask;
        this.http
          .deleteTask(this.task.columnId, this.task.id)
          .subscribe((): void => {
            this.http
              .getDataBoard(`${this.http.currentBoardId}`, this.token)
              .subscribe((data: IResponse): void => {
                this.http.dataColumns = data.columns;
              });
          });
      });
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
