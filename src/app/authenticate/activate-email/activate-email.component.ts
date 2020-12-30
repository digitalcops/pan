import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss'],
})
export class ActivateEmailComponent implements OnInit {
  user_id: number;
  token: string;
  public hash: string;
  constructor(
    public route: ActivatedRoute,
    public authService: AuthenticateService,
    public router: Router,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.user_id = params['id'];
      this.hash = params['token'];
    });
    const data = {
      user_id: this.user_id,
      hash: this.hash,
    };
    this.authService.verifyEmail(data).subscribe((res => {
    }));
    this.authService.verifyUserEmail(data).subscribe((res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Email has been activate successfully' });
    }));
  }

  sign() {
    this.router.navigate(['/login']);
  }
}
