import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import environment from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
import MaterialModule from './material/material.module';
import BoardItemComponent from './components/board-item/board-item.component';
import TaskColumnComponent from './components/board-item/task-column/task-column.component';
import ColumnCreationComponent from './components/board-item/column-creation/column-creation.component';
import TaskItemComponent from './components/board-item/task-column/task-item/task-item.component';
import ModalEditFormComponent from './components/board-item/task-column/modal-edit-form/modal-edit-form.component';
import ColumnsFilterPipe from './pipes/columns-filter.pipe';
import ProfileComponent from './components/profile/profile.component';
import { createTranslateLoader } from './utilities/utils';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MainItemComponent,
    NewBoardDialogComponent,
    BoardItemComponent,
    TaskColumnComponent,
    ColumnCreationComponent,
    TaskItemComponent,
    ModalEditFormComponent,
    SearchPipe,
    WelcomeComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    ColumnsFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forRoot([PMSState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class AppModule {}
