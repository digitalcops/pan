import { ChangePasswordDetails } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from './../../../../shared/pop-up/pop-up.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  changePasswordInfo : ChangePasswordDetails;
  changePasswordEditForm: FormGroup;

  saveButtonClickedSubscription: Subscription;

  constructor(
    public messageService: MessageService,
    public popUpService: PopUpService,
    public appService: AppService,
    public profileService: ProfileService,
    public _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setDefaultFormState();
    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updatePasswordInfo();
    });
  }

  setDefaultFormState() {
    this.changePasswordInfo = new ChangePasswordDetails();
    this.setFormState();
  }

  setFormState() {
    this.changePasswordEditForm = this._formBuilder.group({
      current_password: new FormControl(this.changePasswordInfo.current_password, [Validators.required]),
      new_password: new FormControl(this.changePasswordInfo.new_password, [Validators.required]),
      confirm_new_password: new FormControl(this.changePasswordInfo.confirm_new_password, [Validators.required]),
    });
  }

  updatePasswordInfo() {
    if(this.changePasswordEditForm.valid)
    {
      let requestData = this.changePasswordEditForm.value;
  
      this.profileService.updateChangePasswordInfo(requestData).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
        this.setDefaultFormState();
      },
      (serverError) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
        this.setDefaultFormState();
      });
    }
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
