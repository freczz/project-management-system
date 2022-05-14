import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EMPTY_USER_DATA } from 'src/app/constants/constants';
import {
  IColumns,
  IResponse,
  ITasks,
  IUserData,
  IUsers,
} from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import PMSState from 'src/app/store/pms.state';
import { setColumnFormGroup, setNewOrder } from 'src/app/utilities/utils';

@Component({
  selector: 'pms-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
})
export default class TaskColumnComponent implements OnInit {
  @Input() column!: IColumns;

  @ViewChild('formColumnTitle') formColumnTitle!: ElementRef;

  private token: string = '';

  public isExpanded: boolean = false;

  public isVisibleTitle: boolean = false;

  private eventContainer: CdkDropList | undefined;

  public formGroup: FormGroup = setColumnFormGroup();

  public userData: IUserData = EMPTY_USER_DATA;

  constructor(public http: HttpService, private store: Store) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
  }

  public getColumnIds(): string[] {
    const columnIds: string[] = [];
    this.http.dataColumns.forEach((column: IColumns) => {
      columnIds.push(column.id);
    });
    return columnIds;
  }

  public getUser(taskTitle: string): void {
    this.http.getUser(this.token).subscribe((users: IUsers[]): void => {
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
    if (this.formGroup.controls['title'].value) {
      this.getUser(this.formGroup.controls['title'].value);
      this.resetForm(form);
    }
    titleInput.focus();
  }

  public resetForm(form: FormGroupDirective): void {
    this.isExpanded = this.isExpanded === false;
    form.resetForm();
  }

  public drop(event: CdkDragDrop<ITasks[]>): void {
    this.eventContainer = event.container;

    if (event.previousContainer === this.eventContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public deleteColumn(): void {
    this.http.deleteColumn(this.column.id).subscribe((): void => {
      this.http
        .getDataBoard(`${this.http.currentBoardId}`, this.token)
        .subscribe((data: IResponse): void => {
          this.http.dataColumns = data.columns;
        });
    });
  }

  public editTitle(event: Event): void {
    const inputValue: string = (<HTMLInputElement>event.target).value;
    this.isVisibleTitle = false;
    this.formColumnTitle.nativeElement.style.display = 'none';

    if (inputValue) {
      this.http
        .updateColumn(
          { title: inputValue, order: this.column.order },
          this.column.id,
          this.token
        )
        .subscribe((): void => {
          this.column.title = inputValue;
        });
    }
  }
}
