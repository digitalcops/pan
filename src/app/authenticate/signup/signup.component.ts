import { environment } from './../../../environments/environment';
import { AuthUtils } from './../autheticate.utils';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from './../authenticate.service';
import { SignUp } from './../autheticate.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './../authenticate.scss'],
})
export class SignupComponent implements OnInit {
  signUpModel: SignUp;
  signUpSuccess = false;
  env = environment;
  captchaEnabled = false;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: any;
  constructor(
    public authService: AuthenticateService,
    public messageService: MessageService,
    public authUtils: AuthUtils,
    public router: Router
  ) {
    this.signUpModel = new SignUp();
  }

  ngOnInit() {
  }

  /**
   * To sign up
   * @param formData Form data
   */
  signUpUser(formData) {
    this.authService.signup(formData).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sign up successful' });
      this.signUpSuccess = true;
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      this.captchaEnabled = false;
      this.recaptchaElement.reset();
    });
  }

  /**
   * To enable button on captcha success
   * @param event Captcha success
   */
  onCaptchaSuccess(event) {
    this.captchaEnabled = true;
  }

  /**
   * On captcha expire
   */
  onCaptchaExpire() {
    this.captchaEnabled = false;
  }

}
