import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BASE_URL, EMPTY_ITEM_TO_DELETE } from '../constants/constants';
import {
  IBoard,
  IItemToDelete,
  INewBoardFormData,
  IUser,
} from '../interfaces/interfaces';
import PMSState from '../store/pms.state';

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  private itemToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  constructor(private http: HttpClient, private store: Store) {}

  public signUp(formData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${BASE_URL}signup`, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  public signIn(formData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${BASE_URL}signin`, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  public getBoards(token: string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${BASE_URL}boards`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  public createBoard(
    formData: INewBoardFormData,
    token: string
  ): Observable<INewBoardFormData> {
    return this.http.post<INewBoardFormData>(`${BASE_URL}boards`, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  public deleteBoard(
    itemForDelete: string,
    token: string
  ): Observable<IItemToDelete> {
    this.itemToDelete = JSON.parse(
      this.store.selectSnapshot(PMSState.itemToDelete)
    );
    let resultLink: string = `boards/${this.itemToDelete.boardId}`;
    if (this.itemToDelete.columnId) {
      resultLink += `/columns/${this.itemToDelete.columnId}`;
    }
    if (this.itemToDelete.taskId) {
      resultLink += `/tasks/${this.itemToDelete.taskId}`;
    }
    return this.http.delete<IItemToDelete>(`${BASE_URL}${resultLink}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
