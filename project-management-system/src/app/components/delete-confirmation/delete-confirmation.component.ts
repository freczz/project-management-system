import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY_ITEM_TO_DELETE, ItemTitle } from 'src/app/constants/constants';
import { IBoard, IItemToDelete } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetBoards, SetToken } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export default class DeleteConfirmationComponent implements OnInit {
  public itemToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  public itemTitle: string = '';

  private token: string = '';

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.itemToDelete = JSON.parse(
      this.store.selectSnapshot(PMSState.itemToDelete)
    );
    if (this.itemToDelete.userId) {
      this.itemTitle = ItemTitle.user;
    } else if (this.itemToDelete.taskId) {
      this.itemTitle = ItemTitle.task;
    } else if (this.itemToDelete.columnId) {
      this.itemTitle = ItemTitle.column;
    } else {
      this.itemTitle = ItemTitle.board;
    }
  }

  public deleteItem(): void {
    this.http.deleteItem().subscribe((): void => {
      switch (this.itemTitle) {
        case ItemTitle.user:
          this.store.dispatch(new SetToken(''));
          this.store.dispatch(new SetBoards('[]'));
          this.router.navigate(['/welcome']);
          break;
        case ItemTitle.board:
          this.http.getBoards().subscribe((boards: IBoard[]): void => {
            this.store.dispatch(new SetBoards(JSON.stringify(boards)));
          });
          break;
        default:
          break;
      }
    });
    this.dialog.closeAll();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
