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

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${BASE_URL}users`);
  }

  public editUser(userData: IUser, id: string): Observable<IUser> {
    return this.http.put<IUser>(`${BASE_URL}users/${id}`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${BASE_URL}users/${id}`);
  }

  public signUp(formData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${BASE_URL}signup`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public signIn(formData: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${BASE_URL}signin`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${BASE_URL}boards`);
  }

  public createBoard(
    formData: INewBoardFormData
  ): Observable<INewBoardFormData> {
    return this.http.post<INewBoardFormData>(`${BASE_URL}boards`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public deleteItem(): Observable<IItemToDelete> {
    let resultLink: string;
    this.itemToDelete = JSON.parse(
      this.store.selectSnapshot(PMSState.itemToDelete)
    );
    if (this.itemToDelete.userId) {
      resultLink = `users/${this.itemToDelete.userId}`;
    } else {
      resultLink = `boards/${this.itemToDelete.boardId}`;
      if (this.itemToDelete.columnId) {
        resultLink += `/columns/${this.itemToDelete.columnId}`;
      }
      if (this.itemToDelete.taskId) {
        resultLink += `/tasks/${this.itemToDelete.taskId}`;
      }
    }
    return this.http.delete<IItemToDelete>(`${BASE_URL}${resultLink}`);
  }
}
