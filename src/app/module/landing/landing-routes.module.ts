import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './pages/login/login.component';
import { StartLayoutComponent } from '../layout/start-layout/start-layout.component';


const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    children: [
      { path: 'start', component: StartComponent },
      { path: 'login', component: LoginComponent },
      {
        path: '**', redirectTo: 'start'
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
