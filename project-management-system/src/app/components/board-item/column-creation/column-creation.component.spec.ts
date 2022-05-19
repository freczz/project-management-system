import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import ColumnCreationComponent from './column-creation.component';

describe('ColumnCreationComponent', () => {
  let component: ColumnCreationComponent;
  let fixture: ComponentFixture<ColumnCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnCreationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ColumnCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
