import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  IBoard,
  IColumns,
  IPostColumns,
  IResponse,
  IStore,
} from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import { Subscription } from 'rxjs';
import { filterTitle } from 'src/app/utilities/utils';

@Component({
  selector: 'pms-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export default class BoardItemComponent implements OnInit, OnDestroy {
  private token: string = '';

  private cloneDataColumns: IColumns[] = [];

  private subscription: Subscription | undefined;

  public boardTitle: string = '';

  public searchValue: string = '';

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.getBoardId();
  }

  public setFilteredTitle(value: string): string {
    this.boardTitle = value;
    return filterTitle(this.boardTitle);
  }

  public drop(event: CdkDragDrop<IColumns[]>): void {
    moveItemInArray(
      this.http.dataColumns,
      event.previousIndex,
      event.currentIndex
    );

    this.http.dataColumns.forEach((column: IColumns): void => {
      this.http
        .updateColumn(
          {
            title: column.title,
            order: column.order,
          },
          column.id,
          this.token
        )
        .subscribe((data: IPostColumns): IPostColumns => data);
    });
  }

  public changeSearchValue(e: Event): void {
    this.searchValue = (e.target as HTMLInputElement).value;
  }

  private getBoardId(): void {
    const routeParams: ParamMap = this.route.snapshot.paramMap;
    const boardId: string | null = routeParams.get('id');
    this.subscription = this.store.subscribe((store: IStore): void => {
      const dataBoards: IBoard[] = JSON.parse(store.PMSState.boards);
      const currentBoard: IBoard | undefined = dataBoards?.find(
        (board: IBoard): boolean => {
          this.boardTitle = board.title;
          return board.id === boardId;
        }
      );
      if (currentBoard) {
        this.http
          .getDataBoard(currentBoard.id, this.token)
          .subscribe((item: IResponse): void => {
            this.http.dataColumns = item.columns;
          });
        this.http.currentBoardId = currentBoard.id;
        this.cloneDataColumns = this.http.dataColumns;
      } else {
        this.router.navigate(['/error']);
      }
    });
  }

  public isResponseSuccess(): boolean {
    return this.cloneDataColumns === this.http.dataColumns;
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
