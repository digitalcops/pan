import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { Password } from '../autheticate.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss','./../authenticate.scss'],
})
export class ResetPasswordComponent implements OnInit {
passwordModel: Password;
invalid = false;
newPassword: '';
confirmPasswords : '';
user_id : number;
hash: string;
password: string;
  constructor(
    public route: ActivatedRoute,
    public authService: AuthenticateService,
    public router: Router,
    public messageService: MessageService,
  ) {
    this.passwordModel = new Password();
  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.user_id = params['user_id'];
      this.hash = params['hash'];
      this.password = params['password'];
    });
  }

  resetPassword() {
    let data = {
      user_id: this.user_id,
      hash: this.hash,
      password: this.newPassword,
    }
    this.authService.resetPassword(data).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Password has been reset successfully'});
      this.router.navigate(['/login']);
    },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
      });
  }

}
