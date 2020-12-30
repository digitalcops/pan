import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CaptchaModule } from 'primeng/captcha';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    CaptchaModule
  ]
})
export class LoginModule { }
