import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Scroll,
  RouterEvent,
  RouteConfigLoadEnd,
  ActivationEnd,
} from '@angular/router';

@Component({
  selector: 'pms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  public hasHeader: boolean = true;

  constructor(private router: Router) {}

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
