import { CaptchaModule } from 'primeng/captcha';
import { DialogModule } from 'primeng/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import { AuthGuardGuard } from './auth-guard.guard';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent, ResetPasswordComponent, ActivateEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogModule,
    AuthenticateRoutingModule,
    CaptchaModule
  ],
  providers: [AuthGuardGuard],
})
export class AuthenticateModule { }
