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
export class SubscriptionService {

  callId = null;
  plansDataForm: FormGroup;
  productsDataForm: FormGroup;
  saleOrderDataForm: FormGroup;
  salesTeamDataForm: FormGroup;
  showProductFormError:boolean;
  showSaleTeamFormError:boolean;
  showSaleOrderFormError:boolean;
  showPlanFormError:boolean;
  constructor(
    public sharedService: SharedService,
    public _formBuilder: FormBuilder,
    public http: HttpClient
  ) { }

  /**
   * To get users list
   * @param data Params
   */
  getAllPlans(data): Observable<any> {
    let url = config.getAllPlanUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

// ----------------------------------------------------------------------------------
  createSaleOrder(data): Observable<any> {
    return this.sharedService.postData(config.createSaleOrderUrl, data);
  }

  singleSaleOrder(id): Observable<any> {
    let url = config.updateSaleOrderUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.getData(url);
  }

  updateSaleOrder(data, id): Observable<any> {
    let url = config.updateSaleOrderUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.putData(url, data);
  }

  getAllSaleOrder(data): Observable<any> {
    let url = config.getAllSaleOrderUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }
  createInvoiceFromSO(data): Observable<any> {
    let url = config.createInvoiceeSaleOrderUrl;
    url = url.replace(':orderId',data.id);
    return this.sharedService.postData(url, null);
  }

  createSaleOrderLine(data): Observable<any> {
    return this.sharedService.postData(config.createSaleOrderLineUrl, data);
  }

  updateSaleOrderLine(data): Observable<any> {
    let url = config.updateSaleOrderLineUrl;
    url = url.replace(':orderId',data.id);
    return this.sharedService.putData(url, data);
  }

  singleSaleOrderLine(id): Observable<any> {
    let url = config.getSingleSaleOrderLineUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.getData(url);
  }

  getAllSaleOrderLineUrl(data): Observable<any> {
    let url = config.getAllSaleOrderUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createProducts(data): Observable<any> {
    return this.sharedService.postData(config.createProductsUrl, data);
  }

  updateProducts(data, id): Observable<any> {
    let url = config.updateProductsUrl;
    url = url.replace(':productId',id);
    return this.sharedService.putData(url, data);
  }

  getAllProducts(data): Observable<any> {
    let url = config.getAllProductsUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createPlans(data): Observable<any> {
    return this.sharedService.postData(config.createPlanUrl, data);
  }

  updatePlans(data, id): Observable<any> {
    let url = config.updatePlanUrl;
    url = url.replace(':planId',id);
    return this.sharedService.putData(url, data);
  }

  updatePlanTags(data, id): Observable<any> {
    let url = config.updatePlanUrl;
    url = url.replace(':planId',id);
    return this.sharedService.patchData(url, data);
  }

  getPlansModel(data:any = null) {
    const formData = ({
      name: (data && data.name) ? data.name : null,
      invoicing_period_value: (data && data.invoicing_period_value) ? data.invoicing_period_value : null,
      invoicing_period_type: (data && data.invoicing_period_type) ? data.invoicing_period_type : null,
      tags: (data && data.tags) ? data.tags.map((obj) => ({
        id: obj.id,value: obj.name,display: obj.name
      })) : [],
      terms_and_conditions: (data && data.terms_and_conditions) ? data.terms_and_conditions : null,
      payment_terms: (data && data.payment_terms) ? data.payment_terms : null,
      duration: (data && data.duration) ? data.duration : "Forever", 
      customer_closable: data ? data.customer_closable : false,
      code: (data && data.code) ? data.code : null,
      status: (data && data.status) ? ((data.status === 'na') ? 'open' : data.status) : 'open',
    });
    this.preparePlanFormGroup(this.getPlanFormGroup(formData));
  }

  getSaleTeamModel(data:any = null) {
    const formData = ({
      name: (data && data.name) ? data.name : null,
      is_active: data ? data.is_active : true,
      team_leader: (data && data.team_leader) ? data.team_leader.id : null,
      team_members: (data && data.team_members) ? data.team_members.map(obj => obj.id) : [],

    });
    this.prepareSaleTeamFormGroup(this.getSaleTeamFormGroup(formData));
  }

  getProductsModel(data:any = null) {
    const formData = ({
      product_name: (data && data.product_name) ? data.product_name : null,
      product_type: (data && data.product_type) ? data.product_type : null,
      sales_price: (data && data.sales_price) ? data.sales_price : null,
      customer_tax: (data && data.customer_tax) ? data.customer_tax.id : null,
      internal_reference: (data && data.internal_reference) ? data.internal_reference : null,
      hsn_code: (data && data.hsn_code) ? data.hsn_code : null,
      hsn_description: (data && data.hsn_description) ? data.hsn_description : null,
      internal_notes: (data && data.internal_notes) ? data.internal_notes : null,
      plan: (data && data.plan) ? data.plan.id : null,
      sales_description: (data && data.sales_description) ? data.sales_description : null
    });
    this.prepareProductFormGroup(this.getProductsFormGroup(formData));
  }

  getSaleOrderModel(data:any = null) {
    const formData = ({
      customer: (data && data.customer) ? data.customer.id : null,
      shipping_address: (data && data.shipping_address) ? data.shipping_address : null,
      billing_address: (data && data.billing_address) ? data.billing_address : null,
      quotation_date: (data && data.quotation_date) ? this.fetchOnlyDatePartStringStamp(data.quotation_date) : null,
      payment_terms: (data && data.payment_terms) ? data.payment_terms : null,
      quotation_expiry_date: (data && data.quotation_expiry_date) ? this.fetchOnlyDatePartStringStamp(data.quotation_expiry_date) : null,
      sales_person: (data && data.sales_person) ? data.sales_person.id : null,
      expected_delivery_date: (data && data.expected_delivery_date) ? this.fetchOnlyDatePartStringStamp(data.expected_delivery_date) : null,
      delivery_date: (data && data.delivery_date) ? this.fetchOnlyDatePartStringStamp(data.delivery_date) : null,
      terms_and_conditions: (data && data.terms_and_conditions) ? data.terms_and_conditions : null,
      status: (data && data.status) ? data.status : 'draft',
      source: (data && data.source) ? data.source : null,
      sales_team: (data && data.sales_team) ? data.sales_team.id : null,
      
      fiscal_position: (data && data.fiscal_position) ? data.fiscal_position : null,
      journal: (data && data.journal) ? data.journal : null,
      online_payment: (data && data.online_payment) ? data.online_payment : false,
      online_signature: (data && data.online_signature) ? data.online_signature : false,
      gst_treatment: (data && data.gst_treatment) ? data.gst_treatment : null,
      customer_reference: (data && data.customer_reference) ? data.customer_reference : null,
      terms_conditions: (data && data.terms_conditions) ? data.terms_conditions : null,
      tags: (data && data.tags) ? data.tags.map((obj) => ({
        id: obj.id,value: obj.name,display: obj.name
      })) : [],
    });
    this.prepareSaleOrderFormGroup(this.getSaleOrderFormGroup(formData));
  }

  private preparePlanFormGroup(data:any): void {
    if (!this.plansDataForm) {
        this.plansDataForm = this._formBuilder.group(data);
    }
  }

  private prepareSaleTeamFormGroup(data:any): void {
    if (!this.salesTeamDataForm) {
        this.salesTeamDataForm = this._formBuilder.group(data);
    }
  }

  private prepareProductFormGroup(data:any): void {
    if (!this.productsDataForm) {
        this.productsDataForm = this._formBuilder.group(data);
    }
  }

  private prepareSaleOrderFormGroup(data:any): void {
    if (!this.saleOrderDataForm) {
        this.saleOrderDataForm = this._formBuilder.group(data);
    }
  }

  private getProductsFormGroup(data:any): any {
    return ({
      product_name: new FormControl(data.product_name, [Validators.required]),
      product_type: new FormControl(data.product_type),
      sales_price: new FormControl(data.sales_price),
      customer_tax: new FormControl(data.customer_tax),
      hsn_code: new FormControl(data.hsn_code),
      hsn_description: new FormControl(data.hsn_description),
      internal_notes: new FormControl(data.internal_notes),
      plan: new FormControl(data.plan),
      sales_description: new FormControl(data.sales_description),
    });
  }

  private getSaleOrderFormGroup(data:any): any {
    return ({
      customer: new FormControl(data.customer, [Validators.required]),
      shipping_address: new FormControl(data.shipping_address, [Validators.required]),
      billing_address: new FormControl(data.billing_address, [Validators.required]),
      quotation_date: new FormControl(data.quotation_date, [Validators.required]),
      payment_terms: new FormControl(data.payment_terms, [Validators.required]),
      quotation_expiry_date: new FormControl(data.quotation_expiry_date),
      sales_person: new FormControl(data.sales_person, [Validators.required]),
      expected_delivery_date: new FormControl(data.expected_delivery_date),
      delivery_date: new FormControl(data.delivery_date),
      terms_and_conditions: new FormControl(data.terms_and_conditions),
      status: new FormControl(data.status, [Validators.required]),
      source: new FormControl(data.source, [Validators.required]),
      sales_team: new FormControl(data.sales_team, [Validators.required]),

      fiscal_position: new FormControl(data.fiscal_position),
      journal: new FormControl(data.journal),
      online_payment: new FormControl(data.online_payment),
      online_signature: new FormControl(data.online_signature),
      gst_treatment: new FormControl(data.gst_treatment),
      customer_reference: new FormControl(data.customer_reference),
      terms_conditions: new FormControl(data.terms_conditions),
      tags: new FormControl(data.tags)
    });
  }

  private getPlanFormGroup(data:any): any {
    return ({
      name: new FormControl(data.name, [Validators.required]),
      invoicing_period_value: new FormControl(data.invoicing_period_value, [Validators.required]),
      invoicing_period_type: new FormControl(data.invoicing_period_type, [Validators.required]),
      tags: new FormControl(data.tags),
      terms_and_conditions: new FormControl(data.terms_and_conditions),
      payment_terms: new FormControl(data.payment_terms, [Validators.required]),
      duration: new FormControl(data.duration),
      customer_closable: new FormControl(data.customer_closable),
      code: new FormControl(data.code),
      status: new FormControl(data.status),
    });
  }

  private getSaleTeamFormGroup(data:any): any {
    return ({
      is_active: new FormControl(data.is_active),
      name: new FormControl(data.name, [Validators.required]),
      team_leader: new FormControl(data.team_leader, [Validators.required]),
      team_members: new FormControl(data.team_members, [Validators.required]),
    });
  }

  preparePlanPayload(): any {
    const augmentedPayload = {
        ...this.plansDataForm.value,
    };
    return augmentedPayload;
  }

  prepareProductPayload(): any {
    const augmentedPayload = {
        ...this.productsDataForm.value,
    };
    return augmentedPayload;
  }

  prepareSaleOrderPayload(): any {
    const augmentedPayload = {
        ...this.saleOrderDataForm.value,
        tags: this.saleOrderDataForm.value.tags.map(obj=>obj.id)
    };
    return augmentedPayload;
  }

  prepareSaleTeamPayload(): any {
    const augmentedPayload = {
        ...this.salesTeamDataForm.value,
    };
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

  getAllSalesTeam(data) {
    let url = config.getAllSalesTeamUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  getAllSalesPerson(data) {
    let url = config.getAllSalesTeamUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  getUsers(data): Observable<any> {
    let getUserUrl = config.getUsers;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(getUserUrl, {});
  }

  getCountries() {
    const getCountryUrl = config.getCountries;
    return this.sharedService.getData(getCountryUrl);
  }

  getTaxes(data): Observable<any> {
    let getUserUrl = config.getAllTaxesUrl;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(getUserUrl, {});
  }
  getModalData() {
    return forkJoin([this.getCustomerList({page:1, limit:1000}), this.getAllSalesTeam({page:1, limit:1000}),
      this.getUsers({page:1, limit:1000}), this.getAllProducts({page:1, limit:1000})
      , this.getAllAddress({page:1, limit:1000})
      , this.getCountries()
      , this.getAllSaleOrder({page:1, limit:1000})
      , this.getTaxes({page:1, limit:1000})
      , this.getAllPlans({page:1, limit:1000})
    ]);
  }

  getStatesList(countryId) {
    let getStateUrl = config.getStates;
    getStateUrl = getStateUrl.replace(':countryId', countryId);
    return this.sharedService.getData(getStateUrl);
  }

  getSaleModalData() {
    return forkJoin([
      this.getUsers({page:1, limit:1000})
      // , this.getTaxes({page:1, limit:1000})
    ]);
  }

  createSaleTeam(data): Observable<any> {
    return this.sharedService.postData(config.createSalesTeamUrl, data);
  }

  updateSaleTeam(data, id): Observable<any> {
    let url = config.updateSalesTeamUrl;
    url = url.replace(':salesId',id);
    return this.sharedService.putData(url, data);
  }

  getSingleSaleTeam(id): Observable<any> {
    let url = config.getSingleSalesTeamUrl;
    url = url.replace(':salesId',id);
    return this.sharedService.getData(url);
  }

  getAllSaleTeamUrl(data): Observable<any> {
    let url = config.getAllSalesTeamUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createAddress(data): Observable<any> {
    return this.sharedService.postData(config.createAddressUrl, data);
  }

  getAllAddress(data): Observable<any> {
    let url = config.getAllAddressUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  createTags(data): Observable<any> {
    return this.sharedService.postData(config.createTagsTeamUrl, data);
  }

  singleTags(id): Observable<any> {
    let url = config.getSingleTagsTeamUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.getData(url);
  }

  updateTags(data, id): Observable<any> {
    let url = config.getSingleTagsTeamUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.putData(url, data);
  }

  getAllTags(data): Observable<any> {
    let url = config.getAllTagsTeamUrl;
    url = url.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(url, data);
  }

  updateSingleFieldSaleOrder(data, id): Observable<any> {
    let url = config.updateSaleOrderUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.patchData(url, data);
  }
  updateSingleFieldInvoices(data, id): Observable<any> {
    let url = config.updateInvoicingUrl;
    url = url.replace(':orderId',id);
    return this.sharedService.patchData(url, data);
  }
  updateSingleFieldSubPlan(data, id): Observable<any> {
    let url = config.updatePlanUrl;
    url = url.replace(':planId',id);
    return this.sharedService.patchData(url, data);
  }
  updateSingleFieldSalesTeam(data, id): Observable<any> {
    let url = config.updateSalesTeamUrl;
    url = url.replace(':salesId',id);
    return this.sharedService.patchData(url, data);
  }
  updateSingleFieldTags(data, id): Observable<any> {
    let url = config.updateTagsTeamUrl;
    url = url.replace(':id',id);
    return this.sharedService.patchData(url, data);
  }
  bulkUpdateOrderLine(data): Observable<any> {
    return this.sharedService.postData(config.updateBulkOrderLine, data);
  }
}
