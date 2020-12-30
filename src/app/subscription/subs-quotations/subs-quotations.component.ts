import { Utils } from './../../utils';
import { Router } from '@angular/router';
import { SubscriptionService } from './../subscription.service';
import { AppService } from '../../app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transactions',
  templateUrl: './subs-quotations.component.html',
  styleUrls: ['./subs-quotations.component.scss'],
})
export class SubQuotationsComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total = 0;
  rowNumber = 0;
  pageSize = 50;
  rows = 50;
  page = 1;
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'Status' },
    { field: 'referenceNumber', header: 'Order Id' },
    { field: 'customer', header: 'Customer' },
    { field: 'salesPerson', header: 'Sales Person' },
    { field: 'total', header: 'Total' },
    { field: 'creationDate', header: 'Delivery Date' },
    { field: 'expirationDate', header: 'Quotation Expiry Date' },
    { field: 'edit', header: 'Action' },
  ];
  data = {
    is_active: true,
    status: "Active",
    referenceNumber: "Ref 001",
    customer: "Mark 001",
    salesPerson: "Josh 001",
    total: 100,
    creationDate: new Date(),
    expirationDate: new Date(),
  };
  items = [
    { label: 'Create Invoice', icon: 'exp-icon', command: (event) => { this.onCreateInvoiceClick(event.item.data); } },
  ];
  viewsAndActivityData: any
  filterData: any = {};
  subTemplateData = [];
  userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
  ];
  constructor(
    public appService: AppService,
    public subscriptionService: SubscriptionService,
    public router: Router,
    public utils: Utils,
    public messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.appService.updateHeaderName({
      name: 'Subscription Quotation',
      count: this.subTemplateData.length
    });
  }

  loadTransactions(event) {
    this.rows = event.rows;
    this.pageSize = (event.first) + this.rows;
    this.rowNumber = (event.first) + 1;
    this.page = (event.first / this.rows) + 1;
    const filterKeys = Object.keys(this.filterData);
    if (filterKeys.length > 0) {
      this.filterData['page'] = this.page;
      this.filterData['limit'] = this.rows;
      this.getTransactions(this.filterData);
    } else {
      this.filterData = { page: this.page, limit: this.rows };
      this.getTransactions(this.filterData);
    }
  }

  toggleMenu(menu, event, rowData) {
    this.items.forEach((menuItem) => {
      menuItem["data"] = rowData;
    });
    menu.toggle(event);
  }

  onEditTransactionData(rowData) {
    this.router.navigate(["subscription/subscription-quotation/mutate-quotation"], {
      queryParams: { id: rowData.id },
    });
  }

  onCreateInvoiceClick(data) {
    if((data.status === 'draft') || (data.status === 'quotation') || (data.status === 'quotation_sent')) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Invoice for only sales order can be created" });
    }
    else if((data.status === 'expired') || (data.status === 'cancelled')) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Your Sales order is already ${data.status}` });
    }
    else {
      this.appService.showCustomLoader(true);
      this.subscriptionService.createInvoiceFromSO(data).subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice created successfully' });
        this.appService.getUpdatedData(true);
        this.appService.showCustomLoader(false);
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
    }
  }

  getDates(date) {
    return date.toString().substr(0, date.toString().lastIndexOf("(") - 1);
  }

  getFilterData(filter) {
    const payload = { page: this.page, limit: this.rows };
    if (filter.search_keyword && (filter.search_keyword.trim() !== "")) {
      payload["search_keyword"] = filter["search_keyword"]
    }
    if (filter["created_at__range"] && (filter["created_at__range"]["start"] !== "") && (filter["created_at__range"]["end"] !== "")) {
      payload["quotation_expiry_date"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    if (filter["due_date__range"] && (filter["due_date__range"]["start"] !== "") && (filter["due_date__range"]["end"] !== "")) {
      payload["delivery_date"] = {
        start: this.getDates(filter.due_date_source[0]),
        end: this.getDates(filter.due_date_source[1])
      }
    }
    if (filter.status && (filter.status.trim() !== "")) {
      payload["status"] = filter["status"];
    }
    if (filter.sales_person) {
      payload["sales_person"] = filter["sales_person"];
    }
    this.filterData = payload;
    this.getTransactions(this.filterData);
  }

  augmentContactData(data): any {
    this.viewsAndActivityData = [];
    data.forEach(element => {
      this.viewsAndActivityData.push({
        selected: false,
        ...element,
        status_label: element.status.replace("_", " "),
        delivery_date: this.utils.fetchOnlyDate(element.delivery_date),
        quotation_expiry_date: this.utils.fetchOnlyDate(element.quotation_expiry_date),
      });
    });
    this.appService.showLoader(false);
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllSaleOrder(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'Subscription Quotation', count: this.total });
      this.appService.showCustomLoader(false);
    });
  }

  ngOnDestroy(): void {
  }
}
