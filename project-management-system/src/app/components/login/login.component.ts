import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import {
  EMAIL_PATTERN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
} from 'src/app/constants/constants';
import { IToken, IUser } from 'src/app/interfaces/interfaces';
import httpService from 'src/app/services/http.service';
import { SetToken, SetUserData } from 'src/app/store/pms.action';
import PMSState from 'src/app/store/pms.state';

@Component({
  selector: 'pms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit {
  public isNewUser: boolean = true;

  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [
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
    login: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.pattern(PASSWORD_PATTERN),
    ]),
  });

  private token: string = '';

  public errorMessage: string = '';

  private currentLanguage: string = 'en';

  constructor(
    private store: Store,
    private http: httpService,
    private router: Router,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.isNewUser = this.store.selectSnapshot(PMSState.isNewUser);
    this.currentLanguage = this.store.selectSnapshot(PMSState.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  public getToken(formData: IUser): void {
    if (this.registrationForm.valid || this.authForm.valid) {
      this.http.signIn(formData).subscribe(
        (data: IToken | IUser) => {
          this.store.dispatch(new SetToken((data as IToken).token));
          this.store.dispatch(
            new SetUserData(
              JSON.stringify({
                id: '',
                name: '',
                login: formData.login,
                password: formData.password,
              })
            )
          );
          this.token = this.store.selectSnapshot(PMSState.token);
          this.router.navigate(['/']);
          this.dialog.closeAll();
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }

  public signUp(formData: IUser): void {
    if (this.registrationForm.valid || this.authForm.valid) {
      this.http.signUp(formData).subscribe(
        (): void => {
          this.getToken({
            login: formData.login,
            password: formData.password,
          });
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }

  public clearErrorMessage(): void {
    this.errorMessage = '';
  }

  public toggleAuthForm(): void {
    this.isNewUser = !this.isNewUser;
    this.authForm.reset();
    this.registrationForm.reset();
    this.errorMessage = '';
  }

  public validateFormFields(): void {
    this.registrationForm.get('name')?.markAsTouched();
    this.registrationForm.get('name')?.markAsUntouched();
    this.registrationForm.get('mail')?.markAsTouched();
    this.registrationForm.get('password')?.markAsTouched();
    this.authForm.get('mail')?.markAsTouched();
    this.authForm.get('password')?.markAsTouched();
  }
}
