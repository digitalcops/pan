import { environment } from './../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../autheticate.model';
import { AuthenticateService } from '../authenticate.service';
import { AuthUtils } from '../autheticate.utils';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './../authenticate.scss'],
})
export class LoginComponent implements OnInit {
  loginModel: Login;
  captchaEnabled = false;
  env = environment;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: any;
  agentName: string;
  constructor(
    public router: Router,
    public authService: AuthenticateService,
    public messageService: MessageService,
    public authUtils: AuthUtils,
    public appService: AppService
  ) {
    this.loginModel = new Login();
  }

  ngOnInit() {
    let data = localStorage.getItem('rem_d');
    if (data) {
      data = JSON.parse(data);
      const rememberMe = (data["remember_me"] === 1);
      if (rememberMe) {
        this.loginModel.email = data["email"];
        this.loginModel.password = data["password"];
        this.loginModel.remember_me = (data["remember_me"] === 1);
      }
    }
  }

  /**
   * To login user
   * @param formData Login Form Data 
   */
  login(formData) {
    formData['email'] = formData.email.toLowerCase();
    formData['remember_me'] = formData['remember_me'] ? 1 : 0;
    localStorage.setItem('rem_d', JSON.stringify(formData));

    this.authService.login(formData).subscribe((response: any) => {
      const data = response.body.data;
      const loggedInUser = {
        token: response.body.token,
        name: data.first_name,
        id: data.id,
        group_name: data.group_name
      };
      localStorage.setItem('role', data.group_name)
      if (data.group_name === 'Agent') {
        const name = data.first_name.concat(data.middle_name == null ? ' ' : data.middle_name, data.last_name)
        localStorage.setItem("name", name)
      }
      else if (data.group_name === 'Broker') {
        const brokername = data.first_name.concat(data.middle_name == null ? ' ' : data.middle_name, data.last_name)
        localStorage.setItem("name", brokername)
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      this.router.navigate(['subscription']);
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
