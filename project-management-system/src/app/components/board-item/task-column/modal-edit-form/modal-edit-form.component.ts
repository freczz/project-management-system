import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngxs/store';
import { IColumns, IResponse, ITasks } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import PMSState from 'src/app/store/pms.state';
import { setColumnFormGroup } from 'src/app/utilities/utils';

@Component({
  selector: 'pms-modal-edit-form',
  templateUrl: './modal-edit-form.component.html',
  styleUrls: ['./modal-edit-form.component.scss'],
})
export default class ModalEditFormComponent implements OnInit {
  @ViewChild('textarea') textarea!: ElementRef;

  public formGroup: FormGroup = setColumnFormGroup();

  private isTaskDone: boolean = false;

  public isExpanded: boolean = false;

  public isHide: boolean = false;

  private token: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: ITasks; column: IColumns },
    public http: HttpService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    if (this.data.task) {
      this.formGroup.patchValue({
        description: this.data.task.description,
      });
    }
  }

  public setRadioValue(radioBtn: MatRadioChange): void {
    if (radioBtn.value === 'completed') {
      this.isTaskDone = true;
    } else {
      this.isTaskDone = false;
    }
  }

  public onSubmit(): void {
    if (this.formGroup.valid && this.formGroup.controls['description'].value) {
      this.http
        .getTask(this.token, this.data.column.id, this.data.task.id)
        .subscribe((data: ITasks): void => {
          this.http
            .updateTask(
              {
                title: data.title,
                done: this.isTaskDone,
                order: data.order,
                description: this.textarea.nativeElement.value,
                userId: data.userId,
                boardId: data.boardId,
                columnId: data.columnId,
              },
              data.columnId,
              data.id
            )
            .subscribe((): void => {
              this.http
                .getDataBoard(`${this.http.currentBoardId}`)
                .subscribe((dataColumns: IResponse): void => {
                  this.http.dataColumns = dataColumns.columns;
                  this.resetForm();
                });
              this.http
                .getTask(this.token, this.data.task.columnId, this.data.task.id)
                .subscribe((dataTask: ITasks): void => {
                  this.data.task = dataTask;
                });
            });
        });
    }
  }

  public deleteTask(): void {
    this.http
      .deleteTask(this.data.task.columnId, this.data.task.id)
      .subscribe((): void => {
        this.http
          .getDataBoard(`${this.http.currentBoardId}`)
          .subscribe((data: IResponse): void => {
            this.http.dataColumns = data.columns;
          });
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public resetForm(): void {
    this.isExpanded = !this.isExpanded;
    this.formGroup.patchValue({
      description: this.data.task.description,
    });
  }
}
