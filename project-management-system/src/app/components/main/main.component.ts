import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY_USER } from 'src/app/constants/constants';
import { IBoard, IStore, IToken, IUser } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetBoards, SetToken } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit {
  public items: IBoard[] = [];

  public searchValue: string = '';

  private token: string = '';

  constructor(private http: HttpService, private store: Store) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.store.subscribe((store: IStore): void => {
      this.items = JSON.parse(store.PMSState.boards);
    });
  }

  public changeSearchValue(e: Event): void {
    this.searchValue = (e.target as HTMLInputElement).value;
  }

  public signIn(): void {
    this.http.signIn(EMPTY_USER).subscribe((data: IToken | IUser): void => {
      this.store.dispatch(new SetToken((data as IToken).token));
      this.token = this.store.selectSnapshot(PMSState.token);
      this.http.getBoards(this.token).subscribe((boards: IBoard[]): void => {
        this.store.dispatch(new SetBoards(JSON.stringify(boards)));
      });
    });
  }
}
