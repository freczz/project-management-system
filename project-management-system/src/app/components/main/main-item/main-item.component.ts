import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { EMPTY_BOARD, EMPTY_ITEM_TO_DELETE } from 'src/app/constants/constants';
import { IBoard, IItemToDelete } from 'src/app/interfaces/interfaces';
import { SetItemToDelete } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';
import DeleteConfirmationComponent from '../../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'pms-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export default class MainItemComponent implements OnInit {
  @Input() public board: IBoard = EMPTY_BOARD;

  public firstLetter: string = '';

  private boardToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  constructor(private dialog: MatDialog, private store: Store) {}

  public ngOnInit(): void {
    [this.firstLetter] = this.board.title.toUpperCase().split('');
  }

  public openDialog(e: Event): void {
    const boards: IBoard[] = JSON.parse(
      this.store.selectSnapshot(PMSState.boards)
    );
    this.boardToDelete.title =
      (e.currentTarget as HTMLElement).parentElement?.title || '';
    this.boardToDelete.boardId =
      boards.find((board: IBoard) => board.title === this.boardToDelete.title)
        ?.id || '';
    this.store.dispatch(
      new SetItemToDelete(JSON.stringify(this.boardToDelete))
    );
    this.dialog.open(DeleteConfirmationComponent);
  }
}
