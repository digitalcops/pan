import { Utils } from './../../utils';
import { Router } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { AppService } from '../../app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transactions',
  templateUrl: './sales-team.component.html',
  styleUrls: ['./sales-team.component.scss'],
})
export class AllSalesTeamComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total = 0;
  rowNumber = 0;
  pageSize = 50;
  rows = 50;
  page = 1;
  statusOption = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false }
  ];
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'Status' },
    { field: 'teamName', header: 'Team Name' },
    { field: 'referenceNumber', header: 'Leader Name' },
    { field: 'customer', header: 'Members List' },
    { field: 'creationDate', header: 'Created Date' },
    { field: 'expirationDate', header: 'Updated Date' },
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
  subTemplateData = [this.data, this.data, this.data, this.data, this.data]
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
      name: 'Sales Team',
      count: this.subTemplateData.length
    });
  }

  changeStatusSub(item, rowData) {
    const payload = { is_active: item.value, id: rowData.id };
    this.appService.showCustomLoader(true);
    this.subscriptionService.updateSingleFieldSalesTeam(payload, rowData.id).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Status updated successfully" });
      this.appService.showCustomLoader(false);
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
    this.router.navigate(["subscription/sales-team/mutate-salesteam"], {
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
      payload["created_at_range"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    if (filter["due_date__range"] && (filter["due_date__range"]["start"] !== "") && (filter["due_date__range"]["end"] !== "")) {
      payload["updated_at_range"] = {
        start: this.getDates(filter.due_date_source[0]),
        end: this.getDates(filter.due_date_source[1])
      }
    }
    if (filter.status !== "") {
      payload["is_active"] = filter["status"];
    }
    if (filter.sales_person) {
      payload["team_leader"] = filter["sales_person"];
    }
    this.filterData = payload;
    this.getTransactions(this.filterData);
  }

  augmentContactData(data): any {
    this.viewsAndActivityData = [];
    data.forEach(element => {
      this.viewsAndActivityData.push({
        selected: false,
        toggleAttachment: true,
        ...element,
        created_at: this.utils.fetchOnlyDateTime(element.created_at),
        updated_at: this.utils.fetchOnlyDateTime(element.updated_at)
      });
    });
    this.appService.showLoader(false);
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllSaleTeamUrl(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
      this.appService.showCustomLoader(false);
    });
  }

  ngOnDestroy(): void {
  }
}
