import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import PMSState from '../store/pms.state';

@Injectable()
export default class ResponseInterceptor implements HttpInterceptor {
  private req: HttpRequest<string> = new HttpRequest(
    'GET' || 'POST' || 'DELETE',
    ''
  );

  private token: string = '';

  constructor(private store: Store) {}

  public intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    this.token = this.store.selectSnapshot(PMSState.token);
    this.req = req.clone({
      headers: req.headers
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${this.token}`),
    });
    return next.handle(this.req);
  }
}
