import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import PMSState from 'src/app/store/pms.state';
import environment from 'src/environments/environment';

import ModalEditFormComponent from './modal-edit-form.component';

describe('ModalEditFormComponent', () => {
  let component: ModalEditFormComponent;
  let fixture: ComponentFixture<ModalEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        TextFieldModule,
        NgxsModule.forRoot([PMSState], {
          developmentMode: !environment.production,
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ModalEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
