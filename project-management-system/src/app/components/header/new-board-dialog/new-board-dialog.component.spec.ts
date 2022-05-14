import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import NewBoardDialogComponent from './new-board-dialog.component';

describe('NewBoardDialogComponent', () => {
  let component: NewBoardDialogComponent;
  let fixture: ComponentFixture<NewBoardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBoardDialogComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(NewBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
