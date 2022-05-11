import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  EMAIL_PATTERN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
} from 'src/app/constants/constants';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  public isNewUser: boolean = true;

  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_PATTERN),
    ]),
  });

  public authForm: FormGroup = new FormGroup({
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_PATTERN),
    ]),
  });

  constructor(private store: Store) {
    this.isNewUser = this.store.selectSnapshot(PMSState.SetNewUserStatus);
  }

  public validateFormFields(): void {
    this.registrationForm.get('name')?.markAsTouched();
    this.registrationForm.get('mail')?.markAsTouched();
    this.registrationForm.get('password')?.markAsTouched();
    this.authForm.get('mail')?.markAsTouched();
    this.authForm.get('password')?.markAsTouched();
  }
}
