import {  RealtorMembershipDetails, 
          IAssociationProviderList, 
          stateAssociationListOptionsList, 
          localAssociationListOptionsList, 
          MLSProviderListOptionsList } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../../../../shared/pop-up/pop-up.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-realtor-memberships',
  templateUrl: './realtor-memberships.component.html',
  styleUrls: ['./realtor-memberships.component.scss'],
})
export class RealtorMembershipsComponent implements OnInit {

  loggedInUserId: number;
  realtorInfoDetails : RealtorMembershipDetails;
  realtorInfoEditForm: FormGroup;
  stateAssociationList: Array<IAssociationProviderList>;
  localAssociationList: Array<IAssociationProviderList>;
  MLSProviderList: Array<IAssociationProviderList>;
  settings

  saveButtonClickedSubscription: Subscription;

  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.settings = {
                      singleSelection: false,
                      showCheckbox:true,
                      enableSearchFilter: false,
                      searchBy:["itemName"],
                      enableCheckAll: false,
                      selectAllText: 'Select All',
                      lazyLoading: true,
                      unSelectAllText: 'Unselect All',
                      searchPlaceholderText: 'Search all records', 
                    };

    this.stateAssociationList = stateAssociationListOptionsList;
    this.localAssociationList = localAssociationListOptionsList;
    this.MLSProviderList =  MLSProviderListOptionsList;

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      this.updateRealtorInfo();
    });

    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.setDefaultFormState();
    this.getRealtorInfo();
  }

  setDefaultFormState() {
    this.realtorInfoDetails = new RealtorMembershipDetails(this.loggedInUserId);
    this.setFormState();
  }

  setFormState(): void {
    this.realtorInfoEditForm = this._formBuilder.group({
      id: new FormControl(this.realtorInfoDetails.id),
      membership_name: new FormControl(this.realtorInfoDetails.membership_name),
      membership_id: new FormControl(this.realtorInfoDetails.membership_id),
      national_association_realtor_id: new FormControl(this.realtorInfoDetails.national_association_realtor_id),
      state_association_realtor: new FormControl(this.realtorInfoDetails.state_association_realtor),
      local_association_realtor: new FormControl(this.realtorInfoDetails.local_association_realtor),
      mls_provider: new FormControl(this.realtorInfoDetails.mls_provider),
      mls_public_id: new FormControl(this.realtorInfoDetails.mls_public_id),
      mls_public_id2: new FormControl(this.realtorInfoDetails.mls_public_id2),
      mls_public_id3: new FormControl(this.realtorInfoDetails.mls_public_id3),
      user_id: new FormControl(this.realtorInfoDetails.user_id),
    });
  }

  formatSelectedValues(selectedItems)
  {
    return selectedItems.map((item) => item.id).join();
  }

  updateRealtorInfo()
  {
    let requestData = {...this.realtorInfoEditForm.value};

    requestData.state_association_realtor = this.formatSelectedValues(requestData.state_association_realtor);
    requestData.local_association_realtor = this.formatSelectedValues(requestData.local_association_realtor);
    requestData.mls_provider = this.formatSelectedValues(requestData.mls_provider);
    requestData.user_id = this.loggedInUserId;
    
    this.profileService.updateRealtorInfo(requestData).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    },
    (serverError) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
    });
  }

  getRealtorInfo()
  {
    this.profileService.getRealtorInfo(this.loggedInUserId).subscribe((res) => {
      if(res) {
        const data = res.data;
        const state_association_realtor = (data.state_association_realtor === "") ? [] : data.state_association_realtor.split(",");
        const local_association_realtor = (data.local_association_realtor === "") ? [] : data.local_association_realtor.split(",");
        const mls_provider = (data.mls_provider === "") ? [] : data.mls_provider.split(",");

        this.realtorInfoDetails = data;
        this.realtorInfoDetails.state_association_realtor = this.stateAssociationList.filter((item)=> (state_association_realtor.indexOf(item["id"]) !==(-1)));
        this.realtorInfoDetails.local_association_realtor = this.localAssociationList.filter((item)=> (local_association_realtor.indexOf(item["id"]) !==(-1)));
        this.realtorInfoDetails.mls_provider = this.MLSProviderList.filter((item)=> (mls_provider.indexOf(item["id"]) !==(-1)));
        
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
