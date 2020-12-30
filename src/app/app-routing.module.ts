import { ForgotPasswordComponent } from './authenticate/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticate/login/login.component';
import { InitialComponent } from './initial/initial.component';
import { InitialAuthGuard } from './initial/initial.guard';
import { ResetPasswordComponent } from './authenticate/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: InitialComponent,
    canActivate: [InitialAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'users',
        loadChildren: () => import('./user-accounts/user.module').then(m => m.UserModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./contacts/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('./subscription/sub-template.module').then(m => m.SubscriptionModule)
      },
      {
        path: 'maintainance',
        loadChildren: () => import('./maintainance/maintainance.module').then(m => m.MaintainanceModule)
      },
      {
        path: 'error',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
  },
  {
    path: 'forget-email-password/:user_id/:hash',
    component: ResetPasswordComponent,
    loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
