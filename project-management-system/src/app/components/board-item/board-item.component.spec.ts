import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import ColumnsFilterPipe from 'src/app/pipes/columns-filter.pipe';
import ColumnsSearchPipe from 'src/app/pipes/columns-search.pipe';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import BoardItemComponent from './board-item.component';

describe('BoardItemComponent', () => {
  let component: BoardItemComponent;
  let fixture: ComponentFixture<BoardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardItemComponent, ColumnsFilterPipe, ColumnsSearchPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
