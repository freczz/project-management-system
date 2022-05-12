import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { IBoard, IStore } from 'src/app/interfaces/interfaces';
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

  constructor(
    private http: HttpService,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    if (!this.token) {
      this.goToWelcomePage();
    }
    this.store.subscribe((store: IStore): void => {
      this.items = JSON.parse(store.PMSState.boards);
    });
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
  }

  private goToWelcomePage(): void {
    this.router.navigate(['/welcome']);
  }

  public changeSearchValue(e: Event): void {
    this.searchValue = (e.target as HTMLInputElement).value;
  }
}
