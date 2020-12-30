import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Observable, forkJoin } from 'rxjs';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  callId = null;
  customerDataForm: FormGroup;
  showCustomerFormError:boolean;
  constructor(
    public sharedService: SharedService,
    public _formBuilder: FormBuilder,
    public http: HttpClient
  ) { }

  createCustomers(data): Observable<any> {
    return this.sharedService.postData(config.createContactsUrl, data);
  }

  getSingleCustomers(id): Observable<any> {
    let url = config.getSingleContactUrl;
    url = url.replace(':contactId',id);
    return this.sharedService.getData(url);
  }

  updateCustomers(data, id): Observable<any> {
    let url = config.updateContactsUrl;
    url = url.replace(':contactId',id);
    return this.sharedService.putData(url, data);
  }

  getAllCustomers(data): Observable<any> {
    let url = config.getAllContactsUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  getCustomersModel(data:any = null) {
    const formData = ({
      first_name: (data && data.first_name) ? data.first_name : null,
      middle_name: (data && data.middle_name) ? data.middle_name : null,
      last_name: (data && data.last_name) ? data.last_name : null,
      email: (data && data.email) ? data.email : null,
      contact_type: (data && data.contact_type) ? data.contact_type : null,
      mobile: (data && data.mobile) ? data.mobile : null,
      phone: (data && data.phone) ? data.phone : null,
      website_link: (data && data.website_link) ? data.website_link : null,
      sales_person: (data && data.sales_person) ? data.sales_person.id : null,
      sales_team: (data && data.sales_team) ? data.sales_team.id : null,
      internal_notes: (data && data.internal_notes) ? data.internal_notes : null,
    });
    this.preparCustomersFormGroup(this.getCustomersFormGroup(formData));
  }

  private preparCustomersFormGroup(data:any): void {
    if (!this.customerDataForm) {
        this.customerDataForm = this._formBuilder.group(data);
    }
  }

  private getCustomersFormGroup(data:any): any {
    return ({
      // name: new FormControl(data.name, [Validators.required]),
      first_name: new FormControl(data.first_name, [Validators.required]),
      middle_name: new FormControl(data.middle_name),
      last_name: new FormControl(data.last_name, [Validators.required]),
      email: new FormControl(data.email),
      contact_type: new FormControl(data.contact_type, [Validators.required]),
      mobile: new FormControl(data.mobile),
      phone: new FormControl(data.phone),
      website_link: new FormControl(data.website_link),
      sales_person: new FormControl(data.sales_person, [Validators.required]),
      internal_notes: new FormControl(data.internal_notes),
      sales_team: new FormControl(data.sales_team, [Validators.required]),
    });
  }

  prepareCustomerPayload(): any {
    const augmentedPayload = {
        ...this.customerDataForm.value,
    };

    if (augmentedPayload.phone) {
      augmentedPayload['phone'] = augmentedPayload.phone.number.includes("+") ?
        `${augmentedPayload.phone.number}` :
        `${augmentedPayload.phone.dialCode} ${augmentedPayload.phone.number}`;
    }
    else {
      augmentedPayload['phone'] = null;
    }

    if (augmentedPayload.mobile) {
      augmentedPayload['mobile'] = augmentedPayload.mobile.number.includes("+") ?
        `${augmentedPayload.mobile.number}` :
        `${augmentedPayload.mobile.dialCode} ${augmentedPayload.mobile.number}`;
    }
    return augmentedPayload;
  }

  fetchOnlyDatePartStringStamp(timestamp: string) {
    let time = timestamp;
    let moment_d = moment(time);
    let rawDate = new Date(moment_d.toString());
    moment_d = moment_d.add(Math.abs(rawDate.getTimezoneOffset()), 'minutes');
    rawDate = new Date(moment_d.toString());
    return rawDate;
  }

  getCustomerList(data) {
    let url = config.getAllContactsUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  getUsers(data): Observable<any> {
    let getUserUrl = config.getUsers;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(getUserUrl, {});
  }

  getTaxes(data): Observable<any> {
    let getUserUrl = config.getAllTaxesUrl;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(getUserUrl, {});
  }

  getAllSalesTeam(data) {
    let url = config.getAllSalesTeamUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  getSaleModalData() {
    return forkJoin([
      this.getUsers({page:1, limit:1000})
      ,this.getAllSalesTeam({page:1, limit:1000})
    ]);
  }

}
