import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { config } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class SubPlansService {
  cachedUserData = null;
  callId = null;
  pageDataForm: FormGroup;
  constructor(readonly sharedService: SharedService,
    public _formBuilder: FormBuilder,
    ) { }

  getPageModel(data:any = null) {
    const formData = ({
      phone_to: (data && data.phone_to) ? data.phone_to : [],
      status: (data && data.status) ? data.status : "Draft",
      call_outcome: (data && data.call_outcome) ? data.call_outcome : null,
      phone_from: (data && data.phone_from) ? data.phone_from : "(999) 999-9999",
      schedule_time: (data && data.schedule_time) ? 
        this.fetchOnlyDatePartStringStamp(data.schedule_time) : null,
      notes: (data && data.notes) ? data.notes : "",
      module_types: (data && data.module_types) ? data.module_types : "",
      association_ids: (data && data.association_ids) ? data.association_ids.map(element => 
        {
          return ({
            itemName: `${element.full_name} (${element.email})`,
            id: element.id 
          })
        }) : [],
      assigned_to: (data && data.assigned_to) ? data.assigned_to.id : null,
      attachments: (data && data.attachments) ? data.attachments : [],
    });
    this.prepareFormGroup(this.getFormGroup(formData));
  }

  fetchOnlyDatePartStringStamp(timestamp: string) {
    let time = timestamp;
    let moment_d = moment(time);
    let rawDate = new Date(moment_d.toString());
    moment_d = moment_d.add(Math.abs(rawDate.getTimezoneOffset()), 'minutes');
    rawDate = new Date(moment_d.toString());
    return rawDate;
  }

  getCallDetails(id): Observable<any> {
    let getCallNoteByIdUrl = config.getCallNoteByIdUrl + id;
    return this.sharedService.getData(getCallNoteByIdUrl);
  }

  private prepareFormGroup(data:any): void {
    if (!this.pageDataForm) {
        this.pageDataForm = this._formBuilder.group(data);
    }
  }

  private getFormGroup(data:any): any {
    return ({
      phone_to: new FormControl(data.phone_to, [Validators.required]),
      status: new FormControl(data.status, [Validators.required]),
      call_outcome: new FormControl(data.call_outcome),
      phone_from: new FormControl(data.phone_from),
      schedule_time: new FormControl(data.schedule_time, [Validators.required]),
      notes: new FormControl(data.notes, [Validators.required]),
      module_types: new FormControl(data.module_types, [Validators.required]),
      association_ids: new FormControl(data.association_ids, [Validators.required]),
      assigned_to: new FormControl(data.assigned_to),
      attachments: new FormControl(data.attachments),
    });
  }


  preparePayload(id:any): any {
    const augmentedPayload = {
        ...this.pageDataForm.value,
    };
    if(id && id !== 0) {
      augmentedPayload["id"] = id;
    }
    augmentedPayload.association_ids = augmentedPayload.association_ids.map(obj => obj.id);
    return augmentedPayload;
  }

  sendSMS(sendSMSModel): Observable<any> {
    const url = config.sendSMSUrl;
    return this.sharedService.postData(url , sendSMSModel);
  }

  getAssociatedInfo(type) {
    const url = config.getAssociatedListUrl;
    return this.sharedService.postData(url , {types: type});
  }

  addCallInfo(sendSMSModel): Observable<any> {
    const url = config.addUpdateCallNoteUrl;
    return this.sharedService.postData(url , sendSMSModel);
  }

  updateCallInfo(sendSMSModel): Observable<any> {
    const url = config.addUpdateCallNoteUrl;
    return this.sharedService.putData(url , sendSMSModel);
  }

  statusDeleteInfo(sendSMSModel): Observable<any> {
    const url = config.addUpdateCallNoteUrl;
    return this.sharedService.patchData(url , sendSMSModel);
  }

  getUsers(data): Observable<any> {
    if(this.cachedUserData) {
      return of(this.cachedUserData);
    }
    else {
      let getUserUrl = config.getUsers;
      getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
      return this.sharedService.getData(getUserUrl);
    }
  }
}
