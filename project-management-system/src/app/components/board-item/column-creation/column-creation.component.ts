import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
import { INITIAL_Z_INDEX, MAX_Z_INDEX } from 'src/app/constants/constants';
import { IResponse } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import PMSState from 'src/app/store/pms.state';
import { setColumnFormGroup, setNewOrder } from 'src/app/utilities/utils';

@Component({
  selector: 'pms-column-creation',
  templateUrl: './column-creation.component.html',
  styleUrls: ['./column-creation.component.scss'],
})
export default class ColumnCreationComponent implements OnInit {
  @ViewChild('matPanel') matPanel!: ElementRef;

  @ViewChild('form') form!: FormGroupDirective;

  private token: string = '';

  public isExpanded: boolean = false;

  public formGroup: FormGroup = setColumnFormGroup();

  constructor(public http: HttpService, private store: Store) {}

  public ngOnInit() {
    this.token = this.store.selectSnapshot(PMSState.token);
  }

  public onSubmit(
    form: FormGroupDirective,
    titleInput: HTMLInputElement
  ): void {
    if (this.formGroup.controls['title'].value && this.formGroup.valid) {
      this.http
        .createColumn({
          title: this.formGroup.controls['title'].value,
          order: setNewOrder(this.http.dataColumns),
        })
        .subscribe((): void => {
          this.getBoardId();
        });
      this.resetForm();
    }

    titleInput.focus();
  }

  public setZIndex(): void {
    this.matPanel.nativeElement.style.zIndex = MAX_Z_INDEX;
  }

  private getBoardId(): void {
    if (this.http.currentBoardId) {
      this.http
        .getDataBoard(this.http.currentBoardId)
        .subscribe((item: IResponse): void => {
          this.http.dataColumns = item.columns;
        });
    }
  }

  public resetForm(): void {
    this.isExpanded = this.isExpanded === false;
    this.matPanel.nativeElement.style.zIndex = INITIAL_Z_INDEX;
    this.form.resetForm();
  }
}
