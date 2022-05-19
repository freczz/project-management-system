import { Component } from '@angular/core';
import { team } from 'src/app/constants/constants';
import { ITeam } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'pms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export default class FooterComponent {
  public contacts: ITeam[] = team;
}
