import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import NewBoardDialogComponent from './new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'pms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    this.dialog.open(NewBoardDialogComponent);
  }
}
