import { GeneralSettingDetails, IDropDownList } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from '../../../../shared/pop-up/pop-up.service';
@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {

  zone: IDropDownList[];
  mode: IDropDownList[];

  loggedInUserId: number;
  generalSettingsInfo : GeneralSettingDetails;
  generalSettingsEditForm: FormGroup;
  
  saveButtonClickedSubscription: Subscription;

  constructor(
    public messageService: MessageService,
    public popUpService: PopUpService,
    public appService: AppService,
    public profileService: ProfileService,
    public _formBuilder: FormBuilder
  ) {
    this.zone = [
                  {label: 'Hawaiian Time Zone-U.S.', value: 'Hawaiian Time Zone-U.S.'},
                  {label: 'Alaskan Time Zone-U.S.', value: 'Alaskan Time Zone-U.S.'},
                  {label: 'Pacific TimeZone-U.S.', value: 'Pacific TimeZone-U.S.'},
                  {label: 'Mountain TimeZone-U.S.', value: 'Mountain TimeZone-U.S.'},
                  {label: 'Central TimeZone-U.S.', value: 'Central TimeZone-U.S.'},
                  {label: 'Eastern TimeZone-U.S.', value: 'Eastern TimeZone-U.S.'}
                ];
    this.mode = [
                  {label: 'From Computer', value: 'From Computer'},
                  {label: 'From Mobile', value: 'From Mobile'}
                ];
   }

  ngOnInit() {
    this.loggedInUserId = this.profileService.getLoggedinUserId();

    this.setDefaultFormState();
    this.getGeneralSettingsDetails();

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateGeneralSettingsInfo();
    });
  }

  updateGeneralSettingsInfo() {
    if(this.generalSettingsEditForm.valid)
    {
      let requestData = this.generalSettingsEditForm.value;
  
      this.profileService.updateGeneralSettingInfo(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      });
    }
    else
    {
      const controls = this.generalSettingsEditForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${name} is required` });
          }
      }
    }
  }

  setDefaultFormState() {
    this.generalSettingsInfo = new GeneralSettingDetails(this.loggedInUserId);
    this.setFormState();
  }

  setFormState() {
    this.generalSettingsEditForm = this._formBuilder.group({
      user_id: new FormControl(this.generalSettingsInfo.user_id),
      time_zone: new FormControl(this.generalSettingsInfo.time_zone),
      set_time: new FormControl(this.generalSettingsInfo.set_time),
    });
  }

  getGeneralSettingsDetails()
  {
    this.profileService.getGeneralSettingInfo(this.loggedInUserId).subscribe((res) => {
      if(res)
      {
        this.generalSettingsInfo = res["data"];
        this.setFormState();
      }
    });
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
