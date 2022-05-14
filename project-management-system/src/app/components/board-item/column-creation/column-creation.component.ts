import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
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
    if (this.formGroup.controls['title'].value) {
      this.http
        .createColumn(
          {
            title: this.formGroup.controls['title'].value,
            order: setNewOrder(this.http.dataColumns),
          },
          this.token
        )
        .subscribe((): void => {
          this.getBoardId();
        });
      this.resetForm(form);
    }

    titleInput.focus();
  }

  private getBoardId(): void {
    if (this.http.currentBoardId) {
      this.http
        .getDataBoard(this.http.currentBoardId, this.token)
        .subscribe((item: IResponse): void => {
          this.http.dataColumns = item.columns;
        });
    }
  }

  public resetForm(form: FormGroupDirective): void {
    this.isExpanded = this.isExpanded === false;
    form.resetForm();
  }
}
