import { PublicInfoDetails } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-public-info',
  templateUrl: './public-info.component.html',
  styleUrls: ['./public-info.component.scss'],
})
export class PublicInfoComponent implements OnInit {

  biography: any;
  maxChars = 500;
  contacts;
  loggedInUserId: number;
  publicInfoDetails: PublicInfoDetails;
  publicInfoEditForm: FormGroup;

  saveButtonClickedSubscription: Subscription;

  constructor(
    public messageService: MessageService,
    public appService: AppService,
    public profileService: ProfileService,
    public _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.setDefaultFormState();
    this.getProfileInfo();

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updatePublicInfoData();
    });
  }

  setDefaultFormState() {
    this.publicInfoDetails = new PublicInfoDetails(this.loggedInUserId);
    this.setFormState();
  }

  getProfileInfo() {
    this.profileService.getPublicInfo(this.loggedInUserId).subscribe((res) => {
      if (res) {
        this.publicInfoDetails = res.data;
        this.setFormState();
      }
    });
  }

  setFormState(): void {
    this.publicInfoEditForm = this._formBuilder.group({
      user_id: new FormControl(this.publicInfoDetails.user_id),
      language: new FormControl(this.publicInfoDetails.language, [Validators.required]),
      business_title: new FormControl(this.publicInfoDetails.business_title),
      experience: new FormControl(this.publicInfoDetails.experience),
      team_name: new FormControl(this.publicInfoDetails.team_name),
      slogan: new FormControl(this.publicInfoDetails.slogan),
      specialties: new FormControl(this.publicInfoDetails.specialties, [Validators.required]),
      biography: new FormControl(this.publicInfoDetails.biography),
      education: new FormControl(this.publicInfoDetails.education),
      awards: new FormControl(this.publicInfoDetails.awards),
      interests: new FormControl(this.publicInfoDetails.interests),
      books: new FormControl(this.publicInfoDetails.books),
      movies: new FormControl(this.publicInfoDetails.movies),
      travel: new FormControl(this.publicInfoDetails.travel),
    });
  }

  updatePublicInfoData() {
    if (this.publicInfoEditForm.valid) {
      let requestData = this.publicInfoEditForm.value;

      this.profileService.updatePublicInfo(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
      },
        (serverError) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
        });

    }
    else {
      const controls = this.publicInfoEditForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${name} is required` });
        }
      }
    }
  }

  cancelButtonClicked() {
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
