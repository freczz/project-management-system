import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import MainItemComponent from './main-item.component';

describe('MainItemComponent', () => {
  let component: MainItemComponent;
  let fixture: ComponentFixture<MainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainItemComponent],
      imports: [
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(MainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
