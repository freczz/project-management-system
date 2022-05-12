import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { EMPTY_ITEM_TO_DELETE } from 'src/app/constants/constants';
import { IBoard, IItemToDelete } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetBoards } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export default class DeleteConfirmationComponent {
  public itemToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  private token: string = '';

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  public deleteBoard(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.http.deleteItem().subscribe((): void => {
      this.http.getBoards().subscribe((boards: IBoard[]): void => {
        this.store.dispatch(new SetBoards(JSON.stringify(boards)));
      });
    });
    this.dialog.closeAll();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
