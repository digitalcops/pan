import { MobileOption } from './../../../../shared/pop-up/pop-up.model';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ContactInfoDetails, IDropDownList, workTypeOptionsList, genderTypeOptionsList } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from '../../../../shared/pop-up/pop-up.service';
import { EmailsOption, PhoneOption } from '../../../../contacts/contact.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {

  roleList: Array<IDropDownList>;
  EmailList = EmailsOption;
  PhoneList =  PhoneOption;
  genderList: Array<IDropDownList>;
  country_code: any;
  contactEditForm: FormGroup;
  userDetails: ContactInfoDetails;
  checked= false;
  loggedInUserId: number;
  countriesData: Array<IDropDownList> = [];
  statesList: Array<IDropDownList> = [];
  mailingStatesList: Array<any> = [];
  
  saveButtonClickedSubscription: Subscription;

  SearchCountryField = SearchCountryField;
  countryISO = CountryISO;
  preferredCountries: CountryISO[] = [this.countryISO.UnitedStates, this.countryISO.UnitedKingdom];
  mobileOptions: Array<any> = [];
  
  constructor(
              public messageService: MessageService,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
    ) { 
    this.roleList = [
                    {label: '', value:''},
                      ];
    this.genderList = genderTypeOptionsList;

    this.getCountries();
    this.contactEditForm = this._formBuilder.group({});
  }

  ngOnInit() {
    
    this.mobileOptions.push(new MobileOption());
    this.mobileOptions.push(new MobileOption());
    this.mobileOptions.push(new MobileOption());

    this.profileService.broadcastButtonStateToParent(false);
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.setDefaultFormState();
    this.appService.updateHeaderName({ name: 'My Profile'});

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateContact();
    });
  }

  setDefaultFormState()
  {
    this.userDetails = new ContactInfoDetails(this.loggedInUserId); 
    this.setFormState();
  }

  getCountries() {
    this.popUpService.getModalData().subscribe((response) => {
      const countries = response[0].data ? response[0].data : [];
      countries.forEach(country => {
        this.countriesData.push({
          label: country.name,
          value: country.code
        });
      });

      this.getUserDetails();
    }, (error) => {
    });
  }

   /**
   * To update Email/Mobile label state
   * @param event Input Event
   * @param rowData Selected row
   * @param key Key to update
   */
  updateLabel(event, rowData, key) {
    rowData[key] = false;
    if (event.target.value.length > 0) {
      rowData[key] = true;
    }
  }

  getStates(event, initialCall = false) {
    if(!initialCall)
    {
      const formValues = this.contactEditForm.value;

      this.userDetails = formValues; 
      this.userDetails.state = "";

      this.userDetails.user_fixed_details = {
                                              groups : formValues.groups,
                                              first_name : formValues.first_name,
                                              middle_name:formValues.middle_name,
                                              last_name:formValues.last_name,
                                              email : formValues.email,
                                              group_name: formValues.group_name,
                                              country_code:formValues.country_code
                                            };
    this.mapPhoneNumberValues()
    this.setFormState();
    }

    this.popUpService.getStatesList(event.value).subscribe((response) => {
      this.statesList = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];
    }, () => {
    });

  }

  getMailingStates(event, initialCall = false) {
    if(!initialCall)
    {
      const formValues = this.contactEditForm.value;

      this.userDetails = formValues; 
      this.userDetails.mailing_state = "";

      this.userDetails.user_fixed_details = {
                                              groups : formValues.groups,
                                              first_name : formValues.first_name,
                                              middle_name:formValues.middle_name,
                                              last_name:formValues.last_name,
                                              email : formValues.email,
                                              group_name: formValues.group_name,
                                              country_code: formValues.country_code
                                          };
      this.mapPhoneNumberValues()
      this.setFormState();
    }

    this.popUpService.getStatesList(event.value).subscribe((response) => {
      this.mailingStatesList = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];
    }, () => {
    });
  }

  updateContact()
  {
    if(this.contactEditForm.valid && this.contactEditForm.value.primary_mobile)
    {
      let requestData = {...this.contactEditForm.value};
  
      const countryObj = this.countriesData.filter((obj)=> obj.value === requestData.country_code);
      const mailingCountryObj = this.countriesData.filter((obj)=> obj.value === requestData.mailing_country_code);
      
      requestData.country = countryObj[0].label;
      requestData.mailing_country = mailingCountryObj[0].label;

      if(requestData.primary_mobile)
      {
        requestData['primary_mobile'] = requestData.primary_mobile.number.includes("+") ?
                                        `${requestData.primary_mobile.number}` :
                                        `${requestData.primary_mobile.dialCode} ${requestData.primary_mobile.number}`;
      }
      else
      {
        requestData['primary_mobile'] = null;
      }

      if(requestData.secondary_mobile)
      {
        requestData['secondary_mobile'] = requestData.secondary_mobile.number.includes("+") ?
                                        `${requestData.secondary_mobile.number}` :
                                        `${requestData.secondary_mobile.dialCode} ${requestData.secondary_mobile.number}`;
      }
      else
      {
        requestData['secondary_mobile'] = null;
      }

      if(requestData.other_mobile)
      {
        requestData['other_mobile'] = requestData.other_mobile.number.includes("+") ?
                                        `${requestData.other_mobile.number}` :
                                        `${requestData.other_mobile.dialCode} ${requestData.other_mobile.number}`;
      }
      else
      {
        requestData['other_mobile'] = null;
      }
  
      delete requestData.roleId;
      delete requestData.name;
      delete requestData.email;
      delete requestData.first_name;
      delete requestData.middle_name;
      delete requestData.last_name;
      delete requestData.email_label;
      delete requestData.groups;

      this.profileService.updateUserDetail(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      });
    }
    else
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Required fields cannot be blank` });
    }
  }
  
  getUserDetails()
  {
    this.profileService.getUserDetail(this.loggedInUserId).subscribe((res) => {
      if(res)
      {
        this.userDetails = {...this.userDetails, ...res.data};

        const groups = this.userDetails.user_fixed_details.groups;
  
        this.roleList = [
                          {label: groups, value: groups},
                        ];

        if(this.userDetails.country_code !== "")
        {
          this.getStates({value: this.userDetails.country_code}, true);
        }

        if(this.userDetails.mailing_country_code !== "")
        {
          this.getMailingStates({value: this.userDetails.mailing_country_code}, true);
        }
        this.mapPhoneNumberValues()
        this.setFormState();
      }
    });
  }

  mapPhoneNumberValues()
  {
    if(this.userDetails.primary_mobile && this.userDetails.primary_mobile["number"])
    {
      this.userDetails.primary_mobile = this.userDetails.primary_mobile["number"];
    }
    else if (!this.userDetails.primary_mobile){
      this.userDetails.primary_mobile = ""
    }

    if(this.userDetails.secondary_mobile && this.userDetails.secondary_mobile["number"])
    {
      this.userDetails.secondary_mobile = this.userDetails.secondary_mobile["number"];
    }
    else if (!this.userDetails.secondary_mobile){
      this.userDetails.secondary_mobile = ""
    }

    if(this.userDetails.other_mobile && this.userDetails.other_mobile["number"])
    {
      this.userDetails.other_mobile = this.userDetails.other_mobile["number"];
    }
    else if (!this.userDetails.other_mobile){
      this.userDetails.other_mobile = ""
    }
  }

  modifyAddressFields()
  {
    const formValues = this.contactEditForm.value;

    this.userDetails = formValues; 

    if(formValues.same_as_home_address)
    {
      this.userDetails.mailing_address = formValues.home_address;
      this.userDetails.mailing_city = formValues.city;
      this.userDetails.mailing_state = formValues.state;
      this.userDetails.mailing_zip_code = formValues.zip_code;
      this.userDetails.mailing_county = formValues.county;
      this.userDetails.mailing_country_code = formValues.country_code;

      if(this.userDetails.mailing_country_code && (this.userDetails.mailing_country_code !== ""))
      {
        this.getMailingStates({value: this.userDetails.mailing_country_code}, true);
      }
    }
    
    this.userDetails.user_fixed_details = {
                                            groups : formValues.groups,
                                            first_name : formValues.first_name,
                                            middle_name:formValues.middle_name,
                                            last_name:formValues.last_name,
                                            email : formValues.email,
                                            group_name: formValues.group_name,
                                            country_code: formValues.country_code
                                          };
                                          
    this.mapPhoneNumberValues()
    this.setFormState();
  }

  setFormState(): void {
    this.contactEditForm = this._formBuilder.group({
      user_id: new FormControl(this.userDetails.user_id),
      
      groups: new FormControl(this.userDetails.user_fixed_details.groups),
      first_name: new FormControl(this.userDetails.user_fixed_details.first_name),
      middle_name: new FormControl(this.userDetails.user_fixed_details.middle_name),
      last_name: new FormControl(this.userDetails.user_fixed_details.last_name),
      email: new FormControl(this.userDetails.user_fixed_details.email),
      email_label: new FormControl(""),
      gender: new FormControl(this.userDetails.gender),
      primary_mobile: new FormControl(this.userDetails.primary_mobile),
      primary_mobile_label: new FormControl(this.userDetails.primary_mobile_label),
      secondary_mobile: new FormControl(this.userDetails.secondary_mobile),
      secondary_mobile_label: new FormControl(this.userDetails.secondary_mobile_label),
      other_mobile: new FormControl(this.userDetails.other_mobile),
      other_mobile_label: new FormControl(this.userDetails.other_mobile_label),
      secondary_email: new FormControl(this.userDetails.secondary_email),
      secondary_email_label: new FormControl(this.userDetails.secondary_email_label),
      other_email: new FormControl(this.userDetails.other_email),
      other_email_label: new FormControl(this.userDetails.other_email_label),
      fax: new FormControl(this.userDetails.fax),
      skype_user_name: new FormControl(this.userDetails.skype_user_name),
      licence_no: new FormControl(this.userDetails.licence_no, [Validators.required]),
      website_url_1: new FormControl(this.userDetails.website_url_1),
      website_url_2: new FormControl(this.userDetails.website_url_2),
      home_address: new FormControl(this.userDetails.home_address, [Validators.required]),
      city: new FormControl(this.userDetails.city, [Validators.required]),
      state: new FormControl('' , [Validators.required]),
      zip_code: new FormControl(this.userDetails.zip_code, [Validators.required]),
      county: new FormControl(this.userDetails.county),
      country_code: new FormControl(this.userDetails.user_fixed_details.country_code, [Validators.required]),
      same_as_home_address: new FormControl(this.userDetails.same_as_home_address),
      mailing_address: new FormControl(this.userDetails.mailing_address, [Validators.required]),
      mailing_city: new FormControl(this.userDetails.mailing_city, [Validators.required]),
      mailing_state: new FormControl('', [Validators.required]),
      mailing_zip_code: new FormControl(this.userDetails.mailing_zip_code, [Validators.required]),
      mailing_county: new FormControl(this.userDetails.mailing_county),
      mailing_country_code: new FormControl('', [Validators.required]),
    });
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }

}