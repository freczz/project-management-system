import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import PMSState from 'src/app/store/pms.state';

import environment from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
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
