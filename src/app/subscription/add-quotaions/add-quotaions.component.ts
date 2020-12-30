import { PopUpService } from './../../shared/pop-up/pop-up.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from './../subscription.service';
import { Utils } from '../../utils';
import { HttpClient } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { MessageService as PMessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { paymentsOptions, sourceOptions, statusOptions } from './add-quotaions.model';

@Component({
  selector: 'app-add-quotaions',
  templateUrl: './add-quotaions.component.html',
  styleUrls: ['./add-quotaions.component.scss', '../../../assets/stylesheets/detail-page.scss'],
})
export class AddQuotaionsComponent implements OnInit {
  @ViewChild('addTemplateForm') addTemplateForm: FormGroupDirective;
  sourceOptions = sourceOptions;
  statusOptions = statusOptions;
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
  billingList = [];
  shippingList = [];
  countriesData: Array<any> = [];
  states: Array<any> = [];
  tags: Array<any> = [];
  customerList = [];
  addressList = [
    { label: 'Billing Address', value: 'billing' },
    { label: 'Shipping Address', value: 'shipping' },
    { label: 'Other', value: 'other' },
  ];
  salesTeamList = [];
  taxList = [];
  productsList = [];
  salesPersonList = [];
  addOrderLine = false;
  addAddress = false;
  data = {}
  checklistData = [];
  allData = null;
  saleOrderId = 0;
  activeIndex = 0;
  optionalProductCols = [];
  checklistCols = [
    { field: 'doc', header: 'Product' },
    { field: 'notes', header: 'Description' },
    { field: 'mandatory', header: 'Quantity' },
    { field: 'common', header: 'Unit Price' },
    { field: 'duedate', header: 'Taxes' },
    { field: 'snooze', header: 'Subtotal' },
    { field: 'edit', header: 'Action' },
  ];
  openProductSubs: Subscription;
  saleData = {selected: false,sale_order: 0,id: 0,product: false,description: false,quantity: null,unit_price: null,tax: null,subtotal: null};
  addressData = {contact: null,address_type: null,street1: null,street2: null,zip: null,city: null,state: null,country: null};
  tagsData: any;
  tagEvent: any;
  newTag = false;
  constructor(
    public appService: AppService,
    public subscriptionService: SubscriptionService,
    public route: ActivatedRoute,
    public pMessageService: PMessageService,
    public router: Router,
    public popUpService: PopUpService,
    public messageService: MessageService,
    public httpclient: HttpClient,
    public utils: Utils,
  ) {
  }
  selectedFileName: string;
  ngOnInit() {
    this.subscriptionService.saleOrderDataForm = null;
    this.getTagsList();
    this.getModalData();
    this.route.queryParams.subscribe((params) => {
      this.saleOrderId = params.id ? params.id : 0;
      if (this.saleOrderId !== 0) {
        //this.getSaleOrderData();
      }
      else {
        this.subscriptionService.getSaleOrderModel();
        this.appService.showCustomLoader(false);
      }
    });
    this.appService.updateHeaderName({ name: 'Subscription Quotation', count: this.total });
  }

  changeStatusSub(item) {
    const payload = {status: item.value};
    if(this.saleOrderId && this.saleOrderId !== 0) {
      this.appService.showCustomLoader(true);
      this.subscriptionService.updateSingleFieldSaleOrder(payload,this.saleOrderId).subscribe((response) => {
        this.subscriptionService.saleOrderDataForm.patchValue({
          status: item.value
        });
        this.statusOptions.forEach((element, index) => {
          if (this.subscriptionService.saleOrderDataForm.value.status === element.value) {
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

  getAddressData(): void {
    this.subscriptionService.getAllAddress({page: 1, limit: 1000}).subscribe((response) => {
      this.updateAddress(response.body.results);
    });
  }

  getModalData(): void {
    this.appService.showCustomLoader(true);
    this.countriesData = [];
    this.subscriptionService.getModalData().subscribe((response) => {
      this.customerList = response[0].body.results.map((obj) => {
        return ({label: obj.full_name,value: obj.id})
      });
      this.salesTeamList = response[1].body.results.map((obj) => {
        return ({ label: obj.name, value: obj.id, data: obj.team_members })
      });
      this.productsList = response[3].body.results.map((obj) => {
        return ({label: obj.product_name,value: obj.id})
      });
      response[5].data.forEach(country => {
        this.countriesData.push({label: country.name,value: country.code});
      });
      this.updateAddress(response[4].body.results);
      this.taxList = response[7].body.results.map((obj) => {
        return ({
          label: `${obj.tax_name} (${obj.tax_value}${obj.tax_type === 'percentage' ? '%' : ''})`,
          value: obj.id})
      });
      if (this.saleOrderId !== 0) {
        this.getSaleOrderData();
      }
      this.appService.showCustomLoader(false);
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

  getSaleOrderData() {
    this.subscriptionService.singleSaleOrder(this.saleOrderId).subscribe((response) => {
      this.allData = response.data;
      this.subscriptionService.getSaleOrderModel(response.data);
      this.checklistData = [];
      this.onSalesTeamChange({value:this.allData.sales_team.id}, false);
      this.statusOptions.forEach((element, index) => {
        if (this.subscriptionService.saleOrderDataForm.value.status === element.value) {
          this.activeIndex = index;
        }
      });
      response.data.lines.forEach(element => {
        this.checklistData.push({
          selected: false,sale_order: this.saleOrderId,...element
        });
      });

    }, err => this.showError(err));
  }

  getChecklistData() {
  }

  /**
 * On file select
 * @param event Input event
 */
  onFileSelect(event, rowData) {
  }

  onAllEmployeeSelected(event) {
    this.selectedchecklistItem = event ? this.checklistData.length : 0;
    this.checklistData.forEach(obj => {
      obj.selected = event
    });
  }

  onSingleChecklistSelected() {
    this.selectedchecklistItem = 0;
    this.checklistData.forEach(obj => {
      if (obj.selected) {
        this.selectedchecklistItem += 1;
      }
    });
  }

  deleteChecklistItem(in_id = null) {
    const payload = {order_line_ids: []}
    if(!in_id) {
      this.checklistData.forEach(obj => {
        if (obj.selected) {
          payload.order_line_ids.push(obj.id);
        }
      });
    }
    else {
      payload.order_line_ids.push(in_id.id);
    }
    this.subscriptionService.bulkUpdateOrderLine(payload).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Subscription Quotation deleted successfully" });
      this.checklistData = this.checklistData.filter(obj => !obj.selected);
      this.total = this.checklistData.length;
      this.appService.updateHeaderName({ name: 'Subscription Quotation', count: this.total });
    });
  }

  addChecklistItem() {
    this.saleData = {
      selected: false,id: 0,sale_order: this.saleOrderId,product: null,description: null,quantity: null,unit_price: null,tax: null,subtotal: null
    };
    this.addOrderLine = true;
  }

  addAddressItem(type) {
    this.addressData = {
      contact: null,address_type: type,street1: null,street2: null,zip: null,city: null,state: null,country: null,
    };
    this.addAddress = true;
    this.states = [];
  }

  onEditTransactionData(rowData) {
    this.saleData = {
      ...this.saleData, ...rowData,
      product: (rowData.product && rowData.product.id) ? rowData.product.id : rowData.product,
      tax: (rowData.tax && rowData.tax.id) ? rowData.tax.id : rowData.tax
    };
    this.addOrderLine = true;
  }

  addOrderLineRow(payload) {
    delete payload.id;
    this.subscriptionService.createSaleOrderLine(payload).subscribe((response) => {
      this.addOrderLine = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale order line created successfully" });
      this.getSaleOrderData();
    }, err => this.showError(err));
  }

  onSalesTeamChange(event, reset=true) {
    const salesTeam = this.salesTeamList.filter(obj => obj.value === event.value)[0];
    this.salesPersonList = salesTeam.data.map((obj)=>{
      return ({ label: `${obj.name}`, value: obj.id })
    });
    debugger
    if(reset) {
      this.subscriptionService.saleOrderDataForm.patchValue({sales_person: null})
    }
  }

  augmentTags(tags) {
    let updatedData = [];
    tags.forEach(element => {
      if (element.active) {
        updatedData.push({
          id: element.id,value: element.name
        })
      }
    });
    return updatedData;
  }

   /**
   * On Tag Add
   * @param event Tag event
   */
  onTagAdd(event) {
    const tagExist = this.tags.some((tag) => tag.value === event.display);
    if (!tagExist) {
      this.tagEvent = event;
      this.tags.push({ id: undefined, value: event.display })
      this.addTag({ name: event.display });
    }
  }

  /**
   * To add tag
   * @param tagName Tag Name
   */
  addTag(tagName) {
    this.popUpService.addTag(tagName).subscribe((response: any) => {
      for (const tag of this.tags) {
        if (tag.display === tagName.name) {
          tag['id'] = response.body.id;
          break;
        }
      }
    }, (serverError) => {
      if (typeof serverError.error.message === "object") {
        const message = serverError.error.message;
        for (const key in message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message[key] });
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      }
      const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === tagName.name);
      const tagIndex = this.tags.findIndex((tag) => tag.value === tagName.name);
      this.tagsData.splice(recentTagIndex, 1);
      this.tags.splice(tagIndex, 1);
    });
  }

  addTagToList() {
    this.addTag({ name: this.tagEvent.display });
    this.newTag = false;
  }

  dontAddTag() {
    const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === this.tagEvent.display);
    this.tagsData.splice(recentTagIndex, 1);
    this.newTag = false;
  }

  /**
  * On Tag Remove
  * @param event Tag Event
  */
  onTagRemove(event) {
    const tagExist = this.tags.some((tag) => tag.id === event.id);
    if (!tagExist) {
      this.tags.unshift({ id: event.id, value: event.value });
    }
  }

  getTagsList() {
    this.subscriptionService.getAllTags({page:1, limit:1000}).subscribe((response) => {
      this.tags = response.body.results ? this.augmentTags(response.body.results) : [];
    }, () => {});
  }

  addAddressToTable() {
    this.subscriptionService.createAddress(this.addressData).subscribe((response) => {
      this.addAddress = false;
      this.getAddressData();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Address added created successfully" });
    }, err => this.showError(err));
  }

  addToTable() {
    if (this.saleOrderId === 0) {
      if (this.subscriptionService.saleOrderDataForm.valid) {
        this.addFormInfo(this.subscriptionService.prepareSaleOrderPayload(), false);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill the fields for sales order first" });
      }
    }
    else {
      if (this.saleData.id === 0) {
        const payload = { ...this.saleData };
        delete payload.id;
        this.addOrderLineRow(payload);
      }
      else {
        const payload = { ...this.saleData };
        this.subscriptionService.updateSaleOrderLine(payload).subscribe((response) => {
          this.addOrderLine = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sale order line updated successfully" });
          this.getSaleOrderData();
        }, err => this.showError(err));
      }
    }
  }

  loadChecklistItem(event) {
    this.rows = event.rows;
    this.pageSize = (event.first) + this.rows;
    this.rowNumber = (event.first) + 1;
    this.page = (event.first / this.rows) + 1;
  }

  showResMessage(response) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.body["message"] });
    this.appService.getUpdatedData(true);
  }

  updateFormInfo(payload) {
    this.subscriptionService.updateSaleOrder(payload, this.saleOrderId).subscribe((response) => {
      this.showResMessage(response);
      this.router.navigate(["subscription/subscription-quotation"]);
    }, err => this.showError(err));
  }

  addFormInfo(payload, close = true) {
    this.subscriptionService.createSaleOrder(payload).subscribe((response) => {
      if (close) {
        this.showResMessage(response);
        this.router.navigate(["subscription/subscription-quotation"]);
      }
      else {
        this.saleOrderId = response.body.data.id;
        this.saleData.sale_order = this.saleOrderId;
        this.addOrderLineRow(this.saleData);
      }
    }, err => this.showError(err));
  }

  addUpdateChecklist() {
    this.subscriptionService.showProductFormError = true;
    if (this.subscriptionService.saleOrderDataForm.valid) {
      const payload = this.subscriptionService.prepareSaleOrderPayload();
      if (this.saleOrderId !== 0) {
        this.updateFormInfo(payload);
      }
      else {
        this.addFormInfo(payload);
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Required field cannot be blank" });
    }
  }

  showError(serverError) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${serverError.error.error}` });
  }

  ngOnDestroy() {
    this.openProductSubs && this.openProductSubs.unsubscribe();
  }
}
