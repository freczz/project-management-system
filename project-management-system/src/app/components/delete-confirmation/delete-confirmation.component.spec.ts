import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import DeleteConfirmationComponent from './delete-confirmation.component';

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
