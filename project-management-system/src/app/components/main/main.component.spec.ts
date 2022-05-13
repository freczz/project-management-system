import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import environment from 'src/environments/environment';
import PMSState from 'src/app/store/pms.state';
import { NgxsModule } from '@ngxs/store';
import SearchPipe from 'src/app/pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import MainComponent from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, SearchPipe],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        BrowserAnimationsModule,
        MatInputModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
