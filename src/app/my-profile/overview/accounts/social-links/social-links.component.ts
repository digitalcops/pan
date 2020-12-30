import { SocialMediaDetails } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from '../../../../shared/pop-up/pop-up.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {

  socialLinksForm: FormGroup;
  socialLinksDetails: SocialMediaDetails;
  loggedInUserId: number;

  saveButtonClickedSubscription: Subscription;

  constructor(
              public messageService: MessageService,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.setDefaultFormState();
    this.getSocialInfoDetails();

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateSocialLinksInfo();
    });
  }

  setDefaultFormState() {
    this.socialLinksDetails = new SocialMediaDetails(this.loggedInUserId);
    this.setFormState();
  }

  setFormState() {
    this.socialLinksForm = this._formBuilder.group({
      user_id: new FormControl(this.socialLinksDetails.user_id),
      facebook_url: new FormControl(this.socialLinksDetails.facebook_url),
      twitter_url: new FormControl(this.socialLinksDetails.twitter_url),
      linkedin_url: new FormControl(this.socialLinksDetails.linkedin_url),
      pinterest_url: new FormControl(this.socialLinksDetails.pinterest_url),
      youtube_url: new FormControl(this.socialLinksDetails.youtube_url),
      instagram_url: new FormControl(this.socialLinksDetails.instagram_url),
      google_plus_url: new FormControl(this.socialLinksDetails.google_plus_url),
      wordpress_url: new FormControl(this.socialLinksDetails.wordpress_url),
      blog_url: new FormControl(this.socialLinksDetails.blog_url),
    });
  }

  getSocialInfoDetails()
  {
    this.profileService.getSocialMediaInfo(this.loggedInUserId).subscribe((res) => {
      if(res)
      {
        this.socialLinksDetails = res["data"];
        this.setFormState();
      }
    });
  }

  updateSocialLinksInfo() {
    if(this.socialLinksForm.valid)
    {
      let requestData = this.socialLinksForm.value;
  
      this.profileService.updateSocialMediaInfo(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      });
    }
    else
    {
      const controls = this.socialLinksForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${name} is required` });
          }
      }
    }
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
