import { SubscriptionService } from './../subscription.service';
import { Subscription } from 'rxjs';
import { Utils } from '../../utils';
import { HttpClient } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { MessageService as PMessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { paymentsOptions, sourceOptions, statusOptions } from './add-all-subscription.model';
import { InvoicingService } from '../invoicing.service';

@Component({
  selector: 'app-add-quotaions',
  templateUrl: './add-all-subscription.component.html',
  styleUrls: ['./add-all-subscription.component.scss', '../../../assets/stylesheets/detail-page.scss'],
})
export class AddAllSubscriptionComponent implements OnInit {
  @ViewChild('addTemplateForm') addTemplateForm: FormGroupDirective;
  sourceOptions = sourceOptions;
  statusOptions = statusOptions;
  activeIndex = 0;
  paymentsOptions = paymentsOptions;
  templateId: number;
  maxChars = 2000;
  total = 0;
  page = 1;
  rowNumber = 0;
  activeCategory = 1;
  pageSize = 50;
  rows = 50;
  remainChars = 0;
  viewState = true;
  loggedInUser: string;
  selectedchecklistItem = 0;
  selectAllCheckbox: boolean;
  customerList = [];
  salesTeamList = [];
  taxList = [];
  plansList = [];
  productsList = [];
  salesPersonList = [];
  billingList = [];
  shippingList = [];
  isActiveList = [
    { label: "Active", value: true },
    { label: "Inactive", value: false }
  ];
  addOrderLine = false;
  data = {}
  checklistData = [];
  allData = null;
  saleOrderId = 0;
  countriesData: Array<any> = [];
  optionalProductCols = [];
  checklistCols = [
    { field: 'doc', header: 'Product' },
    { field: 'notes', header: 'Description' },
    { field: 'responsibility', header: 'Responsibility' },
    { field: 'mandatory', header: 'Quantity' },
    { field: 'common', header: 'Unit Price' },
    { field: 'duedate', header: 'Taxes' },
    { field: 'snooze', header: 'Subtotal' },
    { field: 'edit', header: 'Action' },
  ];
  currentDate = new Date();
  openProductSubs: Subscription;
  addressData = { contact: null, address_type: null, street1: null, street2: null, zip: null, city: null, state: null, country: null };
  addAddress = false;
  states: Array<any> = [];
  addressList = [
    { label: 'Billing Address', value: 'billing' },
    { label: 'Shipping Address', value: 'shipping' },
    { label: 'Other', value: 'other' },
  ];
  constructor(
    public appService: AppService,
    public invoicingService: InvoicingService,
    public subscriptionService: SubscriptionService,
    public route: ActivatedRoute,
    public pMessageService: PMessageService,
    public router: Router,
    public messageService: MessageService,
    public httpclient: HttpClient,
    public utils: Utils,
  ) {
  }
  selectedFileName: string;
  ngAfterViewInit() { }

  ngOnInit() {
    this.invoicingService.allSubsDataForm = null;
    this.invoicingService.showAllSubsFormError = false;
    this.getModalData();
    this.route.queryParams.subscribe((params) => {
      this.saleOrderId = params.id ? params.id : 0;
      if (this.saleOrderId !== 0) {
        //this.getSaleOrderData();
      }
      else {
        this.invoicingService.getAllSubsModel();
        this.appService.showCustomLoader(false);
      }
    });
    this.appService.updateHeaderName({ name: 'All Subscriptions', count: this.total });
  }

  addAddressItem(type) {
    this.addressData = {
      contact: null, address_type: type, street1: null, street2: null, zip: null, city: null, state: null, country: null,
    };
    this.addAddress = true;
    this.states = [];
  }

  addAddressToTable() {
    this.subscriptionService.createAddress(this.addressData).subscribe((response) => {
      this.addAddress = false;
      this.getAddressData();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Address added created successfully" });
    }, err => this.showError(err));
  }

  getAddressData(): void {
    this.subscriptionService.getAllAddress({ page: 1, limit: 1000 }).subscribe((response) => {
      this.updateAddress(response.body.results);
    });
  }

  getStates(event) {
    this.subscriptionService.getStatesList(event.value).subscribe((response) => {
      this.states = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];
    }, () => {
    });
  }

  getModalData(): void {
    this.appService.showCustomLoader(true);
    this.countriesData = [];
    this.subscriptionService.getModalData().subscribe((response) => {
      this.customerList = response[0].body.results.map((obj) => {
        return ({ label: obj.full_name, value: obj.id })
      });
      this.salesTeamList = response[1].body.results.map((obj) => {
        return ({ label: obj.name, value: obj.id, data: obj.team_members })
      });
      this.productsList = response[3].body.results.map((obj) => {
        return ({ label: obj.product_name, value: obj.id, data: obj.plan })
      });
      response[5].data.forEach(country => {
        this.countriesData.push({ label: country.name, value: country.code });
      });
      this.updateAddress(response[4].body.results);
      this.taxList = response[7].body.results.map((obj) => {
        return ({
          label: `${obj.tax_name} (${obj.tax_value}${obj.tax_type === 'percentage' ? '%' : ''})`,
          value: obj.id
        })
      });
      this.plansList = response[8].body.results.map((obj) => {
        return ({ label: obj.name, value: obj.id })
      });
      if (this.saleOrderId !== 0) {
        this.getSaleOrderData();
      }
      this.appService.showCustomLoader(false);
    });
  }

  onProductChange(event) {
    const product = this.productsList.filter(obj => obj.value === event.value)[0];
    this.invoicingService.allSubsDataForm.patchValue({plan: product.data.id})
  }

  onSalesTeamChange(event, reset=true) {
    const salesTeam = this.salesTeamList.filter(obj => obj.value === event.value)[0];
    this.salesPersonList = salesTeam.data.map((obj)=>{
      return ({ label: `${obj.name}`, value: obj.id })
    });
    if(reset) {
      this.invoicingService.allSubsDataForm.patchValue({sales_person: null})
    }
  }


  updateAddress(list) {
    this.shippingList = [];
    this.billingList = [];
    list.forEach((obj) => {
      if (obj.address_type === 'billing') {
        this.billingList.push({
          label: `${obj.street1}, ${obj.city}, ${obj.state}, ${obj.zip}, ${obj.country}`,
          value: obj.id
        })
      }
      if (obj.address_type === 'shipping') {
        this.shippingList.push({
          label: `${obj.street1}, ${obj.city}, ${obj.state}, ${obj.zip}, ${obj.country}`,
          value: obj.id
        })
      }
    });
  }

  changeStatusSub(item) {
    const payload = {status: item.value};
    if(this.saleOrderId && this.saleOrderId !== 0) {
      this.appService.showCustomLoader(true);
      this.invoicingService.updateSingleFieldSubMgmt(payload,this.saleOrderId).subscribe((response) => {
        this.invoicingService.allSubsDataForm.patchValue({
          status: item.value
        });
        this.statusOptions.forEach((element, index) => {
          if (this.invoicingService.allSubsDataForm.value.status === element.value) {
            this.activeIndex = index;
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Status updated successfully" });
        this.appService.showCustomLoader(false);
      }, err => this.showError(err));
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please save the form, then update the status" });
    }
  }

  getSaleOrderData() {
    this.appService.showCustomLoader(true);
    this.invoicingService.singleSubMgmt(this.saleOrderId).subscribe((response) => {
      this.allData = response.data;
      this.invoicingService.getAllSubsModel(response.data);
      this.onSalesTeamChange({value:this.allData.sales_team.id}, false);
      this.statusOptions.forEach((element, index) => {
        if (this.invoicingService.allSubsDataForm.value.status === element.value) {
          this.activeIndex = index;
        }
      });
      this.appService.showCustomLoader(false);
    }, err => this.showError(err));
  }

  showResMessage(response) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.body["message"] });
    this.appService.getUpdatedData(true);
    this.router.navigate(["subscription/all-subscription"]);
  }

  updateFormInfo(payload) {
    this.invoicingService.updateSubMgmt(payload, this.saleOrderId).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  addFormInfo(payload, close = true) {
    this.invoicingService.createSubMgmt(payload).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  addUpdateChecklist() {
    this.invoicingService.showAllSubsFormError = true;
    if (this.invoicingService.allSubsDataForm.valid) {
      const value = this.invoicingService.allSubsDataForm.value;
      if (this.utils.isStartDateGreater(value.start_timestamp, value.close_timestamp)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "The closing date should be greater than start date" });
      }
      else {
        const payload = this.invoicingService.prepareAllSubsPayload();
        if (this.saleOrderId !== 0) {
          this.updateFormInfo(payload);
        }
        else {
          this.addFormInfo(payload);
        }

      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Required field cannot be blank" });
    }
  }

  showError(serverError) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong` });
  }

  ngOnDestroy() {
    this.openProductSubs && this.openProductSubs.unsubscribe();
  }
}
