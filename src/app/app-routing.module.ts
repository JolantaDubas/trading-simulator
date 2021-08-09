import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/auth/user.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UserGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/no-auth/no-auth.module').then((m) => m.NoAuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
