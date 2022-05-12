import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY_USER_DATA } from 'src/app/constants/constants';
import { IUserData } from 'src/app/interfaces/interfaces';
import { SetBoards, SetToken } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';
import NewBoardDialogComponent from './new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'pms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  public userData: IUserData = EMPTY_USER_DATA;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.userData = JSON.parse(this.store.selectSnapshot(PMSState.userData));
  }

  public openNewBoardDialog(): void {
    this.dialog.open(NewBoardDialogComponent);
  }

  public logout(): void {
    this.store.dispatch(new SetToken(''));
    this.store.dispatch(new SetBoards('[]'));
    this.router.navigate(['/welcome']);
  }
}
