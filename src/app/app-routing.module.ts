import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
      import('./module/landing/landing.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'internal',
    loadChildren: () =>
      import('./module/internal-landing/internal-landing.module').then((m) => m.InternalLandingModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
