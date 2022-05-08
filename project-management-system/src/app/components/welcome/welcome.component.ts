import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { team } from 'src/app/constants/constants';
import { ITeam } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'pms-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('expandTitle', [
      state('initial', style({ paddingTop: '50px' })),
      transition('void => *', animate('0.7s')),
    ]),
  ],
})
export default class WelcomeComponent {
  public state: string = 'initial';

  public team: ITeam[] = team;
}
