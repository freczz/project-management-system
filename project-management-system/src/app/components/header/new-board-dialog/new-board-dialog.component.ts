import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { IBoard, INewBoardFormData } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetBoards } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.scss'],
})
export default class NewBoardDialogComponent {
  public newBoardForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  private token: string = '';

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  public createBoard(formData: INewBoardFormData): void {
    if (this.newBoardForm.valid) {
      this.token = this.store.selectSnapshot(PMSState.token);
      this.http.createBoard(formData, this.token).subscribe((): void => {
        this.http.getBoards(this.token).subscribe((boards: IBoard[]): void => {
          this.store.dispatch(new SetBoards(JSON.stringify(boards)));
        });
      });
      this.dialog.closeAll();
    }
  }

  public validateFormFields(): void {
    this.newBoardForm.get('title')?.markAsTouched();
    this.newBoardForm.get('description')?.markAsTouched();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
