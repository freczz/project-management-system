import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  EMPTY_ITEM_TO_DELETE,
  EMPTY_USER_DATA,
  INITIAL_Z_INDEX,
  MAX_Z_INDEX,
} from 'src/app/constants/constants';
import {
  IColumns,
  IItemToDelete,
  IPutTasks,
  ITasks,
  IUserData,
  IUsers,
} from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import PMSState from 'src/app/store/pms.state';
import { setColumnFormGroup, setNewOrder } from 'src/app/utilities/utils';
import { MatDialog } from '@angular/material/dialog';
import { SetItemToDelete } from 'src/app/store/pms.action';
import DeleteConfirmationComponent from '../../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'pms-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
})
export default class TaskColumnComponent implements OnInit {
  @Input() column!: IColumns;

  @ViewChild('formColumnTitle') formColumnTitle!: ElementRef;

  @ViewChild('matPanel') matPanel!: ElementRef;

  @ViewChild('form') form!: FormGroupDirective;

  private token: string = '';

  public boardId: string = '';

  public isExpanded: boolean = false;

  public isVisibleTitle: boolean = false;

  private eventContainer: CdkDropList | undefined;

  public formGroup: FormGroup = setColumnFormGroup();

  public userData: IUserData = EMPTY_USER_DATA;

  private columnToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  constructor(
    public http: HttpService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.boardId = this.store.selectSnapshot(PMSState.currentBoardId);
  }

  public getColumnIds(): string[] {
    const columnIds: string[] = [];
    this.http.dataColumns.forEach((column: IColumns) => {
      columnIds.push(column.id);
    });
    return columnIds;
  }

  public getUser(taskTitle: string): void {
    this.http.getUser().subscribe((users: IUsers[]): void => {
      this.userData = JSON.parse(this.store.selectSnapshot(PMSState.userData));
      users.forEach((user: IUsers) => {
        if (user.login === this.userData.login) {
          this.createTask(user.id, taskTitle);
        }
      });
    });
  }

  private createTask(idUser: string, taskTitle: string): void {
    this.http
      .createTask(
        {
          title: taskTitle,
          done: false,
          order: setNewOrder(this.column.tasks),
          description: ' ',
          userId: idUser,
        },
        this.token,
        this.column.id
      )
      .subscribe((): void => {
        this.http
          .getTasks(this.token, this.column.id)
          .subscribe((data: ITasks[]): void => {
            this.column.tasks = data;
          });
      });
  }

  public showColumnTitle(input: HTMLInputElement): void {
    this.isVisibleTitle = this.isVisibleTitle === false;
    this.formColumnTitle.nativeElement.style.display = 'block';
    input.select();
    input.focus();
  }

  public onSubmit(form: FormGroupDirective, titleInput: HTMLElement): void {
    if (this.formGroup.controls['title'].value && this.formGroup.valid) {
      this.getUser(this.formGroup.controls['title'].value);
      this.resetForm();
    }
    titleInput.focus();
  }

  public setZIndex(): void {
    this.matPanel.nativeElement.style.zIndex = MAX_Z_INDEX;
  }

  public resetForm(): void {
    this.isExpanded = this.isExpanded === false;
    this.matPanel.nativeElement.style.zIndex = INITIAL_Z_INDEX;
    this.form.resetForm();
  }

  public drop(event: CdkDragDrop<ITasks[]>): void {
    this.eventContainer = event.container;

    if (event.previousContainer === this.eventContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.eventContainer.data.forEach(
        (task: ITasks, i: number, tasks: ITasks[]): void => {
          const newOrder: number = setNewOrder(tasks) + i;
          const newTask: IPutTasks = {
            title: task.title,
            done: task.done,
            order: newOrder,
            description: task.description,
            userId: task.userId,
            boardId: this.boardId,
            columnId: this.eventContainer?.id || '',
          };
          this.http
            .updateTask(newTask, this.eventContainer?.id || '', task.id)
            .subscribe((): void => {});
        }
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.eventContainer.data.forEach(
        (task: ITasks, i: number, tasks: ITasks[]): void => {
          const newOrder = setNewOrder(tasks) + i;
          const newTask: IPutTasks = {
            title: task.title,
            done: task.done,
            order: newOrder,
            description: task.description,
            userId: task.userId,
            boardId: this.boardId,
            columnId: this.eventContainer?.id || '',
          };
          if (i === event.currentIndex) {
            this.http
              .updateTask(newTask, event.previousContainer?.id || '', task.id)
              .subscribe((): void => {});
          } else {
            this.http
              .updateTask(newTask, this.eventContainer?.id || '', task.id)
              .subscribe((): void => {});
          }
        }
      );
    }
  }

  public openDialog(): void {
    this.columnToDelete.title = this.column.title;
    this.columnToDelete.boardId = this.boardId;
    this.columnToDelete.columnId = this.column.id;
    this.columnToDelete.taskId = '';
    this.store.dispatch(
      new SetItemToDelete(JSON.stringify(this.columnToDelete))
    );
    this.dialog.open(DeleteConfirmationComponent);
  }

  public editTitle(event: Event): void {
    const inputValue: string = (<HTMLInputElement>event.target).value;
    this.isVisibleTitle = false;
    this.formColumnTitle.nativeElement.style.display = 'none';

    if (inputValue) {
      this.http
        .updateColumn(
          { title: inputValue, order: this.column.order },
          this.column.id
        )
        .subscribe((): void => {
          this.column.title = inputValue;
        });
    }
  }
}
