import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { CustomerService } from './../customer.service';
import { Subscription } from 'rxjs';
import { Utils } from '../../utils';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { MessageService as PMessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { paymentsOptions, sourceOptions, statusOptions } from './add-customer.model';

@Component({
  selector: 'app-add-quotaions',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss', '../../../assets/stylesheets/detail-page.scss'],
})
export class AddCustomerComponent implements OnInit {
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
  customerList = [];
  salesTeamList = [];
  taxList = [];
  productsList = [];
  salesPersonList = [];
  SearchCountryField = SearchCountryField;
  countryISO = CountryISO;
  preferredCountries: CountryISO[] = [this.countryISO.UnitedStates, this.countryISO.UnitedKingdom];
  isActiveList = [
    {label: "Individual", value: "individual"},
    {label: "Company", value: 'company'}
  ];
  addOrderLine = false;
  data = {}
  checklistData = [];
  allData = null;
  saleOrderId = 0;
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
  openProductSubs: Subscription;

  saleData = {
    selected: false,
    sale_order: 0,
    id: 0,
    product: false,
    description: false,
    responsibility: null,
    quantity: null,
    unit_price: null,
    tax: null,
    subtotal: null,
  };
  constructor(
    public appService: AppService,
    public customerService: CustomerService,
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
    this.customerService.customerDataForm = null;
    this.customerService.showCustomerFormError = false;
    this.getModalData();
    this.openProductSubs = this.appService.openSubQuotation.subscribe(res => {
    });

    this.route.queryParams.subscribe((params) => {
      this.saleOrderId = params.id ? params.id : 0;
      if (this.saleOrderId !== 0) {
        this.getSaleOrderData();
      }
      else {
        this.customerService.getCustomersModel();
        this.appService.showCustomLoader(false);
      }
    });
    this.appService.updateHeaderName({ name: 'Customers', count: this.total });
  }

  getModalData(): void {
    this.appService.showCustomLoader(true);
    this.customerService.getSaleModalData().subscribe((response) => {
      this.salesPersonList = response[0].body.results.map((obj) => {
        return ({
          label: `${obj.full_name}`,
          value: obj.id
        })
      });

      this.customerList = response[1].body.results.map((obj) => {
        return ({
          label: `${obj.name}`,
          value: obj.id
        })
      });
      this.appService.showCustomLoader(false);
    });
  }

  getSaleOrderData() {
    this.customerService.getSingleCustomers(this.saleOrderId).subscribe((response) => {
      this.allData = response.data;
      this.customerService.getCustomersModel(response.data);
    }, err => this.showError(err));
  }

  updateLabel(event, rowData, key) {
    rowData[key] = false;
    if (event.target.value.length > 0) {
      rowData[key] = true;
    }
  }

  getChecklistData() {

  }

  /**
 * On file select
 * @param event Input event
 */
  onFileSelect(event, rowData) {
    this.selectedFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('filename', this.selectedFileName);
    formData.append('inside_location', 'ticket_attachments');
    if (event.target.files[0].size > 2000000) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size should not exceeds by 2mb' });
      return;
    }
    this.httpclient.post<any>(config.uploadFile, formData).subscribe((response) => {
      rowData.sample_document_url = response.url;
      rowData.sample_document_id = response.id;
      rowData.sample_document_name = this.utils.filterTicketAttachmentName(response.url)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
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

  deleteChecklistItem() {
    this.checklistData = this.checklistData.filter(obj => !obj.selected);
    this.total = this.checklistData.length;
    this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
  }

  addChecklistItem() {
    this.saleData = {
      selected: false,
      id: 0,
      sale_order: this.saleOrderId,
      product: false,
      description: false,
      responsibility: null,
      quantity: null,
      unit_price: null,
      tax: null,
      subtotal: null,
    };
    this.addOrderLine = true;
  }

  onEditTransactionData(rowData) {
    this.saleData = {
      ...this.saleData,
      ...rowData,
      product: (rowData.product && rowData.product.id) ? rowData.product.id : rowData.product,
      tax: (rowData.tax && rowData.tax.id) ? rowData.tax.id : rowData.tax 
    };
    this.addOrderLine = true;
  }   

  addOrderLineRow(payload) {
    this.customerService.createCustomers(payload).subscribe((response) => {
      this.checklistData.unshift({ ...this.saleData });
      this.addOrderLine = false;
      this.total = this.checklistData.length;
      this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sales Team created successfully" });
      this.getSaleOrderData();
    }, err => this.showError(err));
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
    this.router.navigate(["customer/all-customers"]);
  }

  updateFormInfo(payload) {
    this.customerService.updateCustomers(payload, this.saleOrderId).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  addUpdateChecklist() {
    this.customerService.showCustomerFormError = true;
    if (this.customerService.customerDataForm.valid) {
      const payload = this.customerService.prepareCustomerPayload();
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

  addFormInfo(payload, close = true) {
    this.customerService.createCustomers(payload).subscribe((response) => {
      if (close) {
        this.showResMessage(response);
      }
      else {
        this.saleOrderId = response.body.data.id;
        this.saleData.sale_order = this.saleOrderId;
        this.addOrderLineRow(this.saleData);
      }
    }, err => this.showError(err));
  }

  showError(serverError) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong` });
  }
  
  ngOnDestroy() {
    this.openProductSubs && this.openProductSubs.unsubscribe();
  }
}
