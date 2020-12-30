import { ICountyList, IRoleDropDownList, ServiceAreaInfoDetails, countyOptionsList } from './../../../profile.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { config } from './../../../../config';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { AppService } from './../../../../app.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './../../../../shared/pop-up/pop-up.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss', '../../../../../assets/stylesheets/form.scss'],
})
export class AddAreaComponent implements OnInit {
  invalidCNAME = false;
  CNAME: string;
  ZNAME: string;
  invalidZNAME=false;
  loggedInUserId: number;
  serviceAreaInfoDetails : ServiceAreaInfoDetails;
  serviceAreaInfoEditForm: FormGroup;
  countriesData: Array<IRoleDropDownList> = [];
  statesList: Array<IRoleDropDownList> = [];

  @Output() modalState = new EventEmitter<boolean>();
  @Output() updateServiceData = new EventEmitter<boolean>();
  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
  ) { 
    this.getCountries();
  }

  ngOnInit() { 
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.setDefaultFormState();
    this.updateServiceAreaInfo();
  }

  getCountries() {
    this.appService.showLoader(true);
    this.popUpService.getModalData().subscribe((response) => {
      const countries = response[0].data ? response[0].data : [];
      countries.forEach(country => {
        this.countriesData.push({
          label: country.name,
          value: country.code
        });
      });
  
      this.getStates({value: "US"});
    }, (error) => {
    });
  }

  getStates(event) {
    this.popUpService.getStatesList(event.value).subscribe((response) => {
      this.statesList = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];

      this.serviceAreaInfoDetails = new ServiceAreaInfoDetails(this.loggedInUserId,
                                                               this.statesList[0] ? this.statesList[0].value.toString() : '',
                                                               event.value);
      this.setFormState(event);
      this.appService.showLoader(false);

    }, () => {
    });
  }
  
  serviceModal(){
    this.modalState.emit(false);
  }

  setDefaultFormState()
  {
    this.serviceAreaInfoDetails = new ServiceAreaInfoDetails(0, '', '' );
    this.setFormState();
  }

  setFormState(val?) {
    this.serviceAreaInfoEditForm = this._formBuilder.group({
      id: new FormControl(this.serviceAreaInfoDetails.id),
      city: new FormControl(this.serviceAreaInfoDetails.city, [Validators.required]),
      state: new FormControl(this.serviceAreaInfoDetails.state),
      county: new FormControl(this.serviceAreaInfoDetails.county),
      country: new FormControl(val.originalEvent ? val.originalEvent.target.textContent:''),
      zip_code: new FormControl(this.serviceAreaInfoDetails.zip_code, [Validators.required]),
      community: new FormControl(this.serviceAreaInfoDetails.community),
      user_id: new FormControl(this.serviceAreaInfoDetails.user_id),
      country_code: new FormControl(val.value ? val.value:''),
    });
  }

  updateServiceAreaInfo()
  {
    if(this.serviceAreaInfoEditForm.value.user_id !==0)
    {
      if(this.serviceAreaInfoEditForm.valid)
      {
        let requestData = this.serviceAreaInfoEditForm.value;
    
        this.profileService.updateServiceAreaInfo(requestData).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
          this.updateServiceData.emit();
        },
        (serverError) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
        });
      }
      else
      {
        const controls = this.serviceAreaInfoEditForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `${name} is required` });
            }
        }
      }
    }
  }
}
