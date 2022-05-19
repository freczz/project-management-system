import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BASE_URL, EMPTY_ITEM_TO_DELETE } from '../constants/constants';
import {
  IBoard,
  IColumns,
  IItemToDelete,
  INewBoardFormData,
  IPostColumns,
  IPostTasks,
  IPutTasks,
  IResponse,
  ITasks,
  IUser,
  IUsers,
} from '../interfaces/interfaces';
import PMSState from '../store/pms.state';
import { setRequestLink } from '../utilities/utils';

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  private itemToDelete: IItemToDelete = EMPTY_ITEM_TO_DELETE;

  public dataColumns: IColumns[] = [];

  public currentBoardId: string = '';

  constructor(private http: HttpClient, private store: Store) {
    this.currentBoardId = this.store.selectSnapshot(PMSState.currentBoardId);
  }

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

  public deleteColumn(columnId: string): Observable<IColumns> {
    return this.http.delete<IColumns>(
      `${BASE_URL}boards/${this.currentBoardId}/columns/${columnId}`
    );
  }

  public deleteTask(columnId: string, taskId: string): Observable<ITasks> {
    return this.http.delete<ITasks>(
      `${setRequestLink(this.currentBoardId, columnId)}/${taskId}`
    );
  }

  public createColumn(formData: IPostColumns): Observable<IPostColumns> {
    return this.http.post<IPostColumns>(
      `${BASE_URL}boards/${this.currentBoardId}/columns`,
      formData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  public getUser(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`${BASE_URL}users`);
  }

  public getTasks(token: string, columnId: string): Observable<ITasks[]> {
    return this.http.get<ITasks[]>(
      `${setRequestLink(this.currentBoardId, columnId)}`
    );
  }

  public getTask(
    token: string,
    columnId: string,
    taskId: string
  ): Observable<ITasks> {
    return this.http.get<ITasks>(
      `${setRequestLink(this.currentBoardId, columnId)}/${taskId}`
    );
  }

  public createTask(
    formData: IPostTasks,
    token: string,
    columnId: string
  ): Observable<IPostTasks> {
    return this.http.post<IPostTasks>(
      `${setRequestLink(this.currentBoardId, columnId)}`,
      formData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  public getColumn(columnId: string): Observable<IColumns> {
    return this.http.get<IColumns>(
      `${BASE_URL}boards/${this.currentBoardId}/columns/${columnId}`
    );
  }

  public getDataBoard(boardId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${BASE_URL}boards/${boardId}`);
  }

  public updateColumn(
    formData: IPostColumns,
    columnId: string
  ): Observable<IPostColumns> {
    return this.http.put<IPostColumns>(
      `${BASE_URL}boards/${this.currentBoardId}/columns/${columnId}`,
      formData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  public updateTask(
    formData: IPutTasks,
    columnId: string,
    taskId: string
  ): Observable<IPutTasks> {
    return this.http.put<IPutTasks>(
      `${setRequestLink(this.currentBoardId, columnId)}/${taskId}`,
      formData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
