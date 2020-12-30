import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticateGuard } from './autheticate.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'forget-email-password/:user_id/:hash',
     component: ResetPasswordComponent,
  },
  {
    path: 'activate-email/:id/:token',
    component: ActivateEmailComponent,
  },
  {
    path: 'activate-user-email/:id/:token',
    component: ActivateEmailComponent,
    canActivate: [AuthGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticateRoutingModule { }
