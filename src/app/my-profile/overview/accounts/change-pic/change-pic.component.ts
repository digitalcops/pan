import { defaultImagePath } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from './../../../../shared/pop-up/pop-up.service';
import { HttpClient } from '@angular/common/http';
import { config } from './../../../../config';

@Component({
  selector: 'app-change-pic',
  templateUrl: './change-pic.component.html',
  styleUrls: ['./change-pic.component.scss'],
})
export class ChangePicComponent implements OnInit {
  selectedFileName: any;

  uploadedImage: any;

  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;
  loggedInUserId: any;
  uploadedFileObject: any;
  defaultImagePath:string;

  saveButtonClickedSubscription: Subscription

  constructor(
              public httpclient: HttpClient,
              public messageService: MessageService,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.defaultImagePath = defaultImagePath;
    this.selectedFileName = "";
    this.uploadedImage = "";
    // this.getUserProfilePic();

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateSocialLinksInfo();
    });
  }

  getUserProfilePic() {
    this.profileService.getUserProfilePic(this.loggedInUserId).subscribe((res) => {
      if(res)
      {
        const image_url = res["data"].image_url;
        this.uploadedImage = (image_url === '') ? this.defaultImagePath : image_url;
        this.selectedFileName = image_url.substring(image_url.lastIndexOf("/") + 1); 
      }
      else
      {
        this.uploadedImage = this.defaultImagePath;
      }
    });
  }

  updateSocialLinksInfo() {
    if(this.selectedFileName !=="")
    {
      const formData = new FormData();
      formData.append('file', this.uploadedFileObject);
      formData.append('filename', this.selectedFileName.substring(0, this.selectedFileName.lastIndexOf(".")));
      formData.append('user_id', this.loggedInUserId);;
    
      this.profileService.updateUserProfilePic(formData).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
        },
        (serverError) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      });
    }
    else
    {
      this.profileService.removeUserProfilePic({user_id: this.loggedInUserId}).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
        this.uploadedImage = this.defaultImagePath;
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
    });
    }
  }

  onFileSelect(event)
  {
    const files = event.target.files;
    this.uploadedFileObject = files[0]; 
    this.selectedFileName = files[0].name;
   
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = (_event) => { 
        this.uploadedImage = reader.result; 
      }
      reader.readAsDataURL(files[0]);
    }
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  removeProfileImage()
  {
    this.uploadedFileObject = undefined;
    this.uploadedImage = undefined;
    this.selectedFileName = "";
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
