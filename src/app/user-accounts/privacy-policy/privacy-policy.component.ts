import { Subscription } from 'rxjs';
import { config } from '../../config';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../my-profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../../shared/pop-up/pop-up.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder  
  ) {}

  ngOnInit() {
    this.appService.updateHeaderName({ name: 'Privacy Policy', count: 1 });
  }
 
}
