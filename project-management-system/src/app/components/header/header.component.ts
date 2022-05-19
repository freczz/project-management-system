import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { EMPTY_USER_DATA } from 'src/app/constants/constants';
import { IUserData } from 'src/app/interfaces/interfaces';
import {
  SetBoards,
  SetCurrentLanguage,
  SetToken,
} from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';
import NewBoardDialogComponent from './new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'pms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  public userData: IUserData = EMPTY_USER_DATA;

  public currentLanguage: string = '';

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.userData = JSON.parse(this.store.selectSnapshot(PMSState.userData));
    this.currentLanguage = this.store.selectSnapshot(PMSState.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  public changeLanguage(e: Event): void {
    const currentLanguage: string = (
      (e.target as HTMLElement).textContent || ''
    ).toLowerCase();
    this.translate.use(currentLanguage);
    this.store.dispatch(new SetCurrentLanguage(currentLanguage));
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
