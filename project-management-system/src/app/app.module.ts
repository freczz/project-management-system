import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import environment from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import PMSState from './store/pms.state';

import AppComponent from './app.component';
import MainComponent from './components/main/main.component';
import MainItemComponent from './components/main/main-item/main-item.component';
import SearchPipe from './pipes/search.pipe';
import HeaderComponent from './components/header/header.component';
import NewBoardDialogComponent from './components/header/new-board-dialog/new-board-dialog.component';
import DeleteConfirmationComponent from './components/delete-confirmation/delete-confirmation.component';
import FooterComponent from './components/footer/footer.component';
import WelcomeComponent from './components/welcome/welcome.component';
import ErrorComponent from './components/error/error.component';
import LoginComponent from './components/login/login.component';
import ResponseInterceptor from './services/response.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MainItemComponent,
    NewBoardDialogComponent,
    SearchPipe,
    WelcomeComponent,
    ErrorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([PMSState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class AppModule {}
