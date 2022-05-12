import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetBoards, SetToken } from 'src/app/store/pms.action';
import NewBoardDialogComponent from './new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'pms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public openDialog(): void {
    this.dialog.open(NewBoardDialogComponent);
  }

  public logout(): void {
    this.store.dispatch(new SetToken(''));
    this.store.dispatch(new SetBoards('[]'));
    this.router.navigate(['/welcome']);
  }
}
