import { CompanyInfoDetails, IDropDownList, ICountyList, roleOptionsList, countyOptionsList } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { config } from './../../../../config';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './../../../../shared/pop-up/pop-up.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {

  roleList: IDropDownList[];
  labelList: ICountyList[];
  loggedInUserId: number;
  companyInfoDetails : CompanyInfoDetails;
  companyInfoEditForm: FormGroup;
  selectedFile: string;
  selectedImgUrl= '';
  selectedFileName: string;
  states: Array<IDropDownList> = [];

  saveButtonClickedSubscription: Subscription;

  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder  
  ) {
    this.roleList = roleOptionsList;
    this.labelList =  countyOptionsList;
   }

  ngOnInit() {
    this.getStates();
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.selectedFile = "";
    this.setDefaultFormState();
    this.getCompanyInfo();

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateCompanyInfo();
    });
  }

  setDefaultFormState()
  {
    this.companyInfoDetails = new CompanyInfoDetails(this.loggedInUserId);
    this.setFormState();
  }

  getCompanyInfo()
  {
    this.profileService.getCompanyInfo(this.loggedInUserId).subscribe((res) => {
      if(res) {
        this.companyInfoDetails = res.data;
        this.setFormState();
      }
    });
  }

  updateCompanyInfo()
  {
    if(this.companyInfoEditForm.valid)
    {
      let requestData = this.companyInfoEditForm.value;
  
      requestData.user_id = this.loggedInUserId;
      requestData.w9_url = this.selectedFile;
  
      this.profileService.updateCompanyInfo(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      });

    }
    else
    {
      const controls = this.companyInfoEditForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${name} is required` });
          }
      }
    }
  }

 /**
   * To get State list
   * @param event Selected country
   */
  getStates() {
    this.popUpService.getStatesList("US").subscribe((response) => {
      this.states = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];
    }, () => {
    });
  }

  setFormState(): void {
    this.companyInfoEditForm = this._formBuilder.group({
      id: new FormControl(this.companyInfoDetails.id),
      company_name: new FormControl(this.companyInfoDetails.company_name, [Validators.required]),
      company_type: new FormControl(this.companyInfoDetails.company_type , [Validators.required]),
      ein: new FormControl(this.companyInfoDetails.ein, [Validators.required]),
      mailing_address: new FormControl(this.companyInfoDetails.mailing_address, [Validators.required]),
      mailing_city: new FormControl(this.companyInfoDetails.mailing_city, [Validators.required]),
      mailing_state: new FormControl(this.companyInfoDetails.mailing_state, [Validators.required]),
      mailing_zip_code: new FormControl(this.companyInfoDetails.mailing_zip_code, [Validators.required]),
      mailing_county: new FormControl(this.companyInfoDetails.mailing_county),
      w9_url: new FormControl(this.companyInfoDetails.w9_url),
      mailing_country: new FormControl("United States of America")
    });
  }

    /**
   * On file select
   * @param event Input event
   */
  onFileSelect(event) {
    this.selectedFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('filename', this.selectedFileName);
    formData.append('inside_location', 'contact_attachments');

    this.httpclient.post<any>(config.uploadFile, formData).subscribe((response) => {
      this.selectedFile = response.url;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      this.selectedFileName = "";
      this.selectedFile = "";
    });
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
