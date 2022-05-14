import { Component, HostListener, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Scroll,
  RouterEvent,
  RouteConfigLoadEnd,
  ActivationEnd,
} from '@angular/router';
import { Store } from '@ngxs/store';
import {
  SetBoards,
  SetCurrentLanguage,
  SetItemToDelete,
  SetNewUserStatus,
  SetToken,
  SetUserData,
} from './store/pms.action';
import PMSState from './store/pms.state';

@Component({
  selector: 'pms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  public hasHeader: boolean = true;

  @HostListener('window: unload', ['$event'])
  handleUnloadEvent(): void {
    window.localStorage.setItem(
      'token',
      this.store.selectSnapshot(PMSState.token)
    );
    window.localStorage.setItem(
      'boards',
      this.store.selectSnapshot(PMSState.boards)
    );
    window.localStorage.setItem(
      'itemToDelete',
      this.store.selectSnapshot(PMSState.itemToDelete)
    );
    window.localStorage.setItem(
      'isNewUser',
      this.store.selectSnapshot(PMSState.isNewUser).toString()
    );
    window.localStorage.setItem(
      'userData',
      this.store.selectSnapshot(PMSState.userData)
    );
    window.localStorage.setItem(
      'currentLanguage',
      this.store.selectSnapshot(PMSState.currentLanguage)
    );
  }

  constructor(private router: Router, private store: Store) {
    const token: string = window.localStorage.getItem('token') ?? '';
    const boards: string = window.localStorage.getItem('boards') ?? '[]';
    const itemToDelete: string =
      window.localStorage.getItem('itemToDelete') ?? '{}';
    const isNewUser: string =
      window.localStorage.getItem('isNewUser') ?? 'false';
    const userData: string = window.localStorage.getItem('userData') ?? '{}';
    const currentLanguage: string =
      window.localStorage.getItem('currentLanguage') ?? 'en';
    window.localStorage.clear();
    this.store.dispatch(new SetToken(token));
    this.store.dispatch(new SetBoards(boards));
    this.store.dispatch(new SetItemToDelete(itemToDelete));
    this.store.dispatch(new SetNewUserStatus(isNewUser === 'true'));
    this.store.dispatch(new SetUserData(userData));
    this.store.dispatch(new SetCurrentLanguage(currentLanguage));
  }

  public ngOnInit(): void {
    this.router.events.subscribe(
      (
        params: RouterEvent | RouteConfigLoadEnd | ActivationEnd | Scroll
      ): void => {
        const path: string = (params as RouterEvent).url;
        if (params instanceof NavigationEnd) {
          this.hasHeader = path !== '/welcome';
        }
      }
    );
  }
}
