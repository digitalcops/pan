import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', './../authenticate.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetEmail: string;
  constructor(
    public router: Router,
    public authService: AuthenticateService,
    public messageService: MessageService
  ) { }

  ngOnInit() { }

  /**
   * To reset password
   * @param email Email
   */
  forgotPassword(email) {
    email = email.toLowerCase();
    this.authService.forgotPassword(email).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Recovery email send successfully'});
      this.router.navigate(['login']);
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    });
  }

}
