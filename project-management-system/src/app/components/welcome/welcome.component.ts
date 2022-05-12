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
import { SetNewUserStatus } from 'src/app/store/pms.action';
import { Router } from '@angular/router';
import PMSState from 'src/app/store/pms.state';
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

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    if (this.token) {
      this.router.navigate(['/']);
    }
  }

  public openDialog(isNewUser: boolean): void {
    this.store.dispatch(new SetNewUserStatus(isNewUser));
    this.dialog.open(LoginComponent);
  }
}
