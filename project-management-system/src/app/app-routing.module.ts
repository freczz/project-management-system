import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import BoardItemComponent from './components/board-item/board-item.component';
import MainComponent from './components/main/main.component';
import WelcomeComponent from './components/welcome/welcome.component';
import ErrorComponent from './components/error/error.component';
import ProfileComponent from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'board/:id',
    component: BoardItemComponent,
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
