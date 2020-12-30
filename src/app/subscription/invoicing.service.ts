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
export class InvoicingService {

  callId = null;
  invoiceDataForm: FormGroup;
  allSubsDataForm: FormGroup;
  showInvoiceFormError:boolean;
  showAllSubsFormError:boolean;
  constructor(
    public sharedService: SharedService,
    public _formBuilder: FormBuilder,
    public http: HttpClient
  ) { }

  createInvoiceFromSub(data): Observable<any> {
    let url = config.createSubInvoiceeSaleOrderUrl;
    url = url.replace(':orderId',data.id);
    return this.sharedService.postData(url, null);
  }

  createSubMgmt(data): Observable<any> {
    return this.sharedService.postData(config.createAllSubscriptionUrl, data);
  }

  singleSubMgmt(id): Observable<any> {
    let url = config.updateAllSubscriptionUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.getData(url);
  }

  updateSubMgmt(data, id): Observable<any> {
    let url = config.updateAllSubscriptionUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.putData(url, data);
  }

  updateSingleFieldSubMgmt(data, id): Observable<any> {
    let url = config.updateAllSubscriptionUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.patchData(url, data);
  }

  getAllSubMgmt(data): Observable<any> {
    let url = config.getAllSubscriptionUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createInvoicing(data): Observable<any> {
    return this.sharedService.postData(config.createInvoicingUrl, data);
  }

  singleInvoicing(id): Observable<any> {
    let url = config.updateInvoicingUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.getData(url);
  }

  updateInvoicing(data, id): Observable<any> {
    let url = config.updateInvoicingUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.putData(url, data);
  }

  getAllInvoicing(data): Observable<any> {
    let url = config.getAllInvoicingUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createInvoicingLine(data): Observable<any> {
    return this.sharedService.postData(config.createInvoiceLineUrl, data);
  }
  
  updateInvoicingLine(data, id): Observable<any> {
    let url = config.updateInvoiceLineUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.putData(url, data);
  }

  bulkDeleteInvoicingLine(data): Observable<any> {
    let url = config.updateInvoicingUrl;
    url = url.replace(':orderId',data.id);
    return this.sharedService.putData(url, data);
  }

  getPlansModel(data:any = null) {
    const formData = ({
      customer: (data && data.customer) ? data.customer.id : null,
      billing_address: (data && data.billing_address) ? data.billing_address.id : null,
      sales_person: (data && data.sales_person) ? data.sales_person.id : null,
      sales_team: (data && data.sales_team) ? data.sales_team.id : null,
      payment_terms: (data && data.payment_terms) ? data.payment_terms : null,
      status: (data && data.status) ? data.status : 'draft',
      source: (data && data.source) ? data.source : null,
      sale_order: (data && data.sale_order) ? data.sale_order.id : null,
    });
    this.preparePlanFormGroup(this.getPlanFormGroup(formData));
  }

  getAllSubsModel(data:any = null) {
    const formData = ({
      customer: (data && data.customer) ? data.customer.id : null,
      billing_address: (data && data.billing_address) ? data.billing_address.id : null,
      product: (data && data.product) ? data.product.id : null,
      plan: (data && data.plan) ? data.plan.id : null,
      order_line: (data && data.order_line) ? data.order_line.id : null,
      recurring_price: (data && data.recurring_price) ? data.recurring_price : null,
      start_timestamp: (data && data.start_timestamp) ? this.fetchOnlyDatePartStringStamp(data.start_timestamp) : null,
      close_timestamp: (data && data.close_timestamp) ? this.fetchOnlyDatePartStringStamp(data.close_timestamp) : null,
      next_invoice_date: (data && data.next_invoice_date) ? this.fetchOnlyDatePartStringStamp(data.next_invoice_date) : null,
      sales_person: (data && data.sales_person) ? data.sales_person.id : null,
      sales_team: (data && data.sales_team) ? data.sales_team.id : null,
      status: (data && data.status) ? data.status : 'draft',
    });
    this.prepareAllSubsFormGroup(this.getAllSubsFormGroup(formData));
  }

  private preparePlanFormGroup(data:any): void {
    if (!this.invoiceDataForm) {
        this.invoiceDataForm = this._formBuilder.group(data);
    }
  }

  private prepareAllSubsFormGroup(data:any): void {
    if (!this.allSubsDataForm) {
        this.allSubsDataForm = this._formBuilder.group(data);
    }
  }

  private getPlanFormGroup(data:any): any {
    return ({
      customer: new FormControl(data.customer, [Validators.required]),
      sales_person: new FormControl(data.sales_person, [Validators.required]),
      sales_team: new FormControl(data.sales_team),
      payment_terms: new FormControl(data.payment_terms, [Validators.required]),
      billing_address: new FormControl(data.billing_address, [Validators.required]),
      status: new FormControl(data.status, [Validators.required]),
      source: new FormControl(data.source, [Validators.required]),
      sale_order: new FormControl(data.sale_order),
    });
  }

  private getAllSubsFormGroup(data:any): any {
    return ({
      customer: new FormControl(data.customer, [Validators.required]),
      billing_address: new FormControl(data.billing_address),
      product: new FormControl(data.product, [Validators.required]),
      plan: new FormControl(data.plan, [Validators.required]),
      order_line: new FormControl(data.order_line),
      recurring_price: new FormControl(data.recurring_price, [Validators.required]),
      start_timestamp: new FormControl(data.start_timestamp),
      close_timestamp: new FormControl(data.close_timestamp),
      next_invoice_date: new FormControl(data.next_invoice_date),
      sales_person: new FormControl(data.sales_person),
      sales_team: new FormControl(data.sales_team),
      status: new FormControl(data.status),
    });
  }

  preparePlanPayload(): any {
    const augmentedPayload = {
        ...this.invoiceDataForm.value,
    };
    return augmentedPayload;
  }

  prepareAllSubsPayload(): any {
    const augmentedPayload = {
        ...this.allSubsDataForm.value,
    };
    return augmentedPayload;
  }
  fetchOnlyDate(timestamp: string) {
    return timestamp ? timestamp.substr(0, timestamp.indexOf("T")) : '';
  }

  fetchOnlyDateTime(timestamp: string) {
    let tempDate = timestamp.substr(timestamp.indexOf("T")).replace("T","").replace("Z","");
    tempDate = tempDate.substr(0, tempDate.lastIndexOf(":")).replace(":", "");
    tempDate = moment(tempDate, "hmm").format("HH:mm a");
    return ({
      date: timestamp.substr(0, timestamp.indexOf("T")),
      time: tempDate
    });
  }
    fetchOnlyDatePartStringStamp(timestamp: string) {
    let rawDate = null;
    if(timestamp) {
      let time = timestamp;
      let moment_d = moment(time);
      rawDate = new Date(moment_d.toString());
      moment_d = moment_d.add(Math.abs(rawDate.getTimezoneOffset()), 'minutes');
      rawDate = new Date(moment_d.toString());
    }
    return rawDate;
  }

  bulkUpdateInvoiceLine(data): Observable<any> {
    return this.sharedService.postData(config.updateBulkInvocieLine, data);
  }
}
