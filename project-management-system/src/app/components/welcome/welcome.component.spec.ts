import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import PMSState from 'src/app/store/pms.state';

import environment from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import WelcomeComponent from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;

  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
      ],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
