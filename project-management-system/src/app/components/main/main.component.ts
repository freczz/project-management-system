import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY_USER_DATA } from 'src/app/constants/constants';
import {
  IBoard,
  IStore,
  IUser,
  IUserData,
} from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetBoards, SetToken, SetUserData } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit {
  public items: IBoard[] = [];

  private cloneItems: IBoard[] = [];

  public searchValue: string = '';

  private token: string = '';

  private userData: IUserData = EMPTY_USER_DATA;

  constructor(
    private http: HttpService,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    if (this.token) {
      this.store.subscribe((store: IStore): void => {
        this.items = JSON.parse(store.PMSState.boards);
      });
      this.getBoards();
      this.getCurrentUserData();
    } else {
      this.goToWelcomePage();
    }
  }

  private getBoards(): void {
    this.http.getBoards().subscribe(
      (boards: IBoard[]): void => {
        this.store.dispatch(new SetBoards(JSON.stringify(boards)));
      },
      (): void => {
        this.store.dispatch(new SetToken(''));
        this.store.dispatch(new SetBoards('[]'));
        this.goToWelcomePage();
      }
    );
    this.cloneItems = this.items;
  }

  public isResponseSuccess(): boolean {
    return this.cloneItems === this.items;
  }

  private getCurrentUserData(): void {
    this.userData = JSON.parse(this.store.selectSnapshot(PMSState.userData));
    this.http.getUsers().subscribe((user: IUser[] | IUserData[]): void => {
      const currentUserData: IUserData | undefined = (user as IUserData[]).find(
        (item: IUserData): boolean => item.login === this.userData.login
      );
      if (currentUserData) {
        this.store.dispatch(
          new SetUserData(
            JSON.stringify({
              id: currentUserData.id,
              name: currentUserData.name,
              login: this.userData.login,
              password: this.userData.password,
            })
          )
        );
        this.userData = JSON.parse(
          this.store.selectSnapshot(PMSState.userData)
        );
      }
    });
  }

  private goToWelcomePage(): void {
    this.router.navigate(['/welcome']);
  }

  public changeSearchValue(e: Event): void {
    this.searchValue = (e.target as HTMLInputElement).value;
  }
}
