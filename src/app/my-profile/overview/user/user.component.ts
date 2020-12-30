import { ProfileService } from './../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { defaultImagePath } from '../../profile.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  group_name:string;
  loggedInUserId: number;
  userAllDetails: any;

  constructor(public appService: AppService,
    public messageService: MessageService,
    public route: ActivatedRoute,
    public profileService: ProfileService,
  ) {

  }

  ngOnInit() {
    this.profileService.broadcastButtonStateToParent(true);
    this.group_name = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).group_name
    : "";
    if((this.group_name === 'HR') || (this.group_name === 'HR-Recruiter')){
     $('#naid').hide();
    }
    if((this.group_name === 'HR') || (this.group_name === 'HR-Recruiter')){
      $('.licenses-hr').hide();
     }
    this.userAllDetails = {
      first_name: "",
      last_name: "",
      middle_name: "",
      groups: "",
      email: "",
      is_active: false,
      id: "",
      user_fixed_details: {
        name: "",
        groups: "",
        email: ""
      },
      user_profileInfo: {
        licence_no: "",
        secondary_mobile: "",
        other_mobile: "",
        primary_mobile: "",
        skype_user_name: "",
        email: "",
        secondary_email: "",
        other_email: "",
        home_address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        mailing_address: "",
        mailing_city: "",
        mailing_state: "",
        mailing_zip_code: "",
        mailing_country: "",
        website_url_1: "",
        website_url_2: "",
      },
      user_publicInfo: {
        language: "",
        biography: "",
        awards: "",
        specialties: "",
        experience: "",
      },
      user_companyInfo: {
        ein: "",
        company_name: "",
        company_type: "",
        mailing_address: "",
        mailing_city: "",
        mailing_state: "",
        mailing_zip_code: "",
        mailing_country: "",
      },
      user_realtorInfo: {
        mls_public_id: "",
      },
      user_generalSettingInfo: {
        time_zone: "",
      },
      user_socialmediaInfo: {
        facebook_url: "",
        twitter_url: "",
        linkedin_url: "",
        pinterest_url: "",
        youtube_url: "",
        instagram_url: "",
        google_plus_url: "",
        wordpress_url: "",
        blog_url: "",
      },
      user_imageInfo: {
        image_url: ""
      }
    };

    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.route.queryParams.subscribe((params) => {
      if(params.userId) {
        this.loggedInUserId = params.userId;
      }
    });
    this.getUserAllDetails();
    this.appService.updateHeaderName({ name: 'My Profile' });
  }

  getUserAllDetails() {
    this.profileService.getUserAllDetails(this.loggedInUserId).subscribe((res) => {
      if (res) {
        this.userAllDetails = { ...res.data };

        if (!this.userAllDetails.user_imageInfo.image_url) {
          this.userAllDetails.user_imageInfo.image_url = defaultImagePath;
        }

        const url_prefix = "http://";
        const user_socialmediaInfo = this.userAllDetails.user_socialmediaInfo;

        this.userAllDetails.user_companyInfo.mailing_country = "US";

        this.userAllDetails.user_socialmediaInfo = {
          facebook_url: url_prefix + user_socialmediaInfo.facebook_url,
          twitter_url: url_prefix + user_socialmediaInfo.twitter_url,
          linkedin_url: url_prefix + user_socialmediaInfo.linkedin_url,
          pinterest_url: url_prefix + user_socialmediaInfo.pinterest_url,
          youtube_url: url_prefix + user_socialmediaInfo.youtube_url,
          instagram_url: url_prefix + user_socialmediaInfo.instagram_url,
          google_plus_url: url_prefix + user_socialmediaInfo.google_plus_url,
          wordpress_url: url_prefix + user_socialmediaInfo.wordpress_url,
          blog_url: url_prefix + user_socialmediaInfo.blog_url,
        };
      }
    });
  }

  jumpToLink(link) {
    var win = window.open(link, '_blank');
    win.focus();
  }
}
