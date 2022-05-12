import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  EMAIL_PATTERN,
  EMPTY_USER_DATA,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
} from 'src/app/constants/constants';
import { IUser, IUserData } from 'src/app/interfaces/interfaces';
import HttpService from 'src/app/services/http.service';
import { SetItemToDelete, SetUserData } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';
import DeleteConfirmationComponent from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'pms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export default class ProfileComponent implements OnInit {
  public editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_PATTERN),
    ]),
  });

  public userData: IUserData = EMPTY_USER_DATA;

  private token: string = '';

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.userData = JSON.parse(this.store.selectSnapshot(PMSState.userData));
    this.token = this.store.selectSnapshot(PMSState.token);
    this.editProfileForm.get('name')?.setValue(this.userData.name);
    this.editProfileForm.get('login')?.setValue(this.userData.login);
  }

  public editProfile(formData: IUser): void {
    if (this.editProfileForm.valid) {
      this.http
        .editUser(formData, this.userData.id)
        .subscribe((newUser: IUser): void => {
          this.store.dispatch(
            new SetUserData(
              JSON.stringify({
                id: this.userData.id,
                name: newUser.name,
                login: newUser.login,
                password: formData.password,
              })
            )
          );
          this.router.navigate(['/']);
        });
    }
  }

  public openDialog(): void {
    this.store.dispatch(
      new SetItemToDelete(
        JSON.stringify({
          userId: this.userData.id,
          title: '',
          boardId: '',
          columnId: '',
          taskId: '',
        })
      )
    );
    this.dialog.open(DeleteConfirmationComponent);
  }

  public validateFormFields(): void {
    this.editProfileForm.get('name')?.markAsTouched();
    this.editProfileForm.get('login')?.markAsTouched();
    this.editProfileForm.get('password')?.markAsTouched();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
