import { Utils } from './../../utils';
import { Router } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { AppService } from '../../app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoicingService } from '../invoicing.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './subs-invoicing.component.html',
  styleUrls: ['./subs-invoicing.component.scss'],
})
export class SubInvoicingComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total = 0;
  rowNumber = 0;
  pageSize = 50;
  rows = 50;
  page = 1;
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'Status' },
    { field: 'referenceNumber', header: 'Invoice Number' },
    { field: 'customer', header: 'Customer Name' },
    { field: 'invoiceDate', header: 'Invoice Date' },
    { field: 'dueDate', header: 'Due Date' },
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
  viewsAndActivityData: any
  filterData: any = {};
  subTemplateData = []
  userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
  ];
  constructor(
    public appService: AppService,
    public invoicingService: InvoicingService,
    public router: Router,
    public messageService: MessageService,
    public utils: Utils,
    ) {
  }

  ngOnInit(): void {
    this.appService.updateHeaderName({
      name: 'Invoicing',
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

  onEditTransactionData(rowData) {
    this.router.navigate(["subscription/invoicing/mutate-invoice"], {
      queryParams: { id: rowData.id },
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
      payload["due_date"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    if (filter["due_date__range"] && (filter["due_date__range"]["start"] !== "") && (filter["due_date__range"]["end"] !== "")) {
      payload["invoice_date"] = {
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
        invoice_date: this.utils.fetchOnlyDate(element.invoice_date),
        due_date: this.utils.fetchOnlyDate(element.due_date),
      });
    });
    this.appService.showLoader(false);
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.invoicingService.getAllInvoicing(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'Invoicing', count: this.total });
      this.appService.showCustomLoader(false);
    });
  }

  ngOnDestroy(): void {
  }
}
