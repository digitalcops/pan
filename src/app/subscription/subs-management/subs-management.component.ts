import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoicingService } from '../invoicing.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './subs-management.component.html',
  styleUrls: ['./subs-management.component.scss'],
})
export class SubManagementComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total = 0;
  rowNumber = 0;
  pageSize = 50;
  rows = 50;
  page = 1;
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'Status' },
    { field: 'referenceNumber', header: 'Reference Id' },
    { field: 'customer', header: 'Customer' },
    { field: 'salesPerson', header: 'Sales Person' },
    { field: 'total', header: 'Invoice Count' },
    { field: 'expirationDate', header: 'Next Invoice Date' },
    { field: 'createdAt', header: 'Created Date' },
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
    public invoicingService: InvoicingService,
    public router: Router,
    public messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.appService.updateHeaderName({
      name: 'All Subscriptions',
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
    this.router.navigate(["subscription/all-subscription/mutate-allsubs"], {
      queryParams: { id: rowData.id },
    });
  }

  onCreateInvoiceClick(data) {
    this.appService.showCustomLoader(true);
    this.invoicingService.createInvoiceFromSub(data).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice created successfully' });
      this.appService.getUpdatedData(true);
      this.appService.showCustomLoader(false);
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
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
      payload["next_invoice_date"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    if (filter["due_date__range"] && (filter["due_date__range"]["start"] !== "") && (filter["due_date__range"]["end"] !== "")) {
      payload["created_at"] = {
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
        next_invoice_date: this.invoicingService.fetchOnlyDate(element.next_invoice_date),
        created_at: this.invoicingService.fetchOnlyDateTime(element.created_at)
      });
    });
    this.appService.showLoader(false);
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.invoicingService.getAllSubMgmt(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'All Subscriptions', count: this.total });
      this.appService.showCustomLoader(false);
    });
  }

  ngOnDestroy(): void {
  }
}
