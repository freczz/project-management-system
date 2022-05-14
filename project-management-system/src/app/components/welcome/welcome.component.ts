import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { team } from 'src/app/constants/constants';
import { ITeam } from 'src/app/interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SetCurrentLanguage, SetNewUserStatus } from 'src/app/store/pms.action';
import { Router } from '@angular/router';
import PMSState from 'src/app/store/pms.state';
import { TranslateService } from '@ngx-translate/core';
import LoginComponent from '../login/login.component';

@Component({
  selector: 'pms-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('expandTitle', [
      state('initial', style({ paddingTop: '50px' })),
      transition('void => *', animate('0.7s')),
    ]),
  ],
})
export default class WelcomeComponent implements OnInit {
  public state: string = 'initial';

  public team: ITeam[] = team;

  private token: string = '';

  public currentLanguage: string = '';

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    if (this.token) {
      this.router.navigate(['/']);
    }
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

  public openDialog(isNewUser: boolean): void {
    this.store.dispatch(new SetNewUserStatus(isNewUser));
    this.dialog.open(LoginComponent);
  }
}
