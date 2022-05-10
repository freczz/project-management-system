import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainComponent from './components/main/main.component';
import WelcomeComponent from './components/welcome/welcome.component';
import ErrorComponent from './components/error/error.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
