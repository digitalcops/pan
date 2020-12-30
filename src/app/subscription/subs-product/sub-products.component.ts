import { Utils } from './../../utils';
import { Subscription } from 'rxjs';
import { SubscriptionService } from './../subscription.service';
import { AppService } from '../../app.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transactions',
  templateUrl: './sub-products.component.html',
  styleUrls: ['./sub-products.component.scss'],
})
export class SubProductsComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total= 0;
  rowNumber= 0;
  viewsAndActivityData:any
  filterData: any = {};
  transactionData: any = {};
  pageSize= 50;
  rows= 50;
  page= 1;
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'HSN Code' },
    { field: 'productName', header: 'Product Name' },
    { field: 'reference', header: 'Internal Reference' },
    { field: 'productType', header: 'Product Type' },
    { field: 'subscriptionPlan', header: 'Subscription Plan' },
    { field: 'salesPrice', header: 'Sales price' },
    { field: 'createdDate', header: 'Created Date' },
    { field: 'edit', header: 'Action' },
  ];
 data = {
  is_active: true,
  status: "Active",
  productName: "Name 001",
  productType: "Type 001",
  reference: "Self",
  salesPrice: 1000,
  createdDate: new Date(),
 }
  openPlanSubs: Subscription;
  subTemplateData = []
  userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
  ];
  constructor(
    public appService: AppService,
    public subscriptionService : SubscriptionService,
    public utils: Utils,
    public messageService: MessageService,
    ) {
  }

  onEditTransactionData(rowData) {
    this.appService.updateSubProductPopup({state: true, data: rowData});
  }

  getDates(date) {
    return date.toString().substr(0, date.toString().lastIndexOf("(")-1);
  } 

  getFilterData(filter) {
    const payload = { page: this.page, limit: this.rows};
    if(filter.search_keyword && (filter.search_keyword.trim() !== "")) {
      payload["search_keyword"] = filter["search_keyword"]
    }
    if(filter["created_at__range"] && (filter["created_at__range"]["start"] !== "") && (filter["created_at__range"]["end"] !== "")) {
      payload["created_at_range"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    if(filter.status && (filter.status.trim() !== "")) {
      payload["status"] = filter["status"];
    }
    if(filter.product_type && (filter.product_type.trim() !== "")) {
      payload["product_type"] = filter["product_type"];
    }
    if(filter.subscription_plan) {
      payload["subscription_plan"] = filter["subscription_plan"];
    }
    if(filter.created_by) {
      payload["created_by"] = filter["created_by"];
    }
    this.filterData = payload;
    this.getTransactions(this.filterData);
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
      this.transactionData = [this.filterData.page, this.filterData.limit];
      this.getTransactions(this.filterData);
    } else {
      this.filterData = { page: this.page, limit: this.rows };
      this.getTransactions(this.filterData);
    }
  }

  augmentContactData(data): any {
    this.viewsAndActivityData = [];
    data.forEach(element => {
      this.viewsAndActivityData.push({
        selected: false,
        ...element,
        created_at: this.utils.fetchOnlyDateTime(element.created_at)
      });
    });
    this.appService.showLoader(false);
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllProducts(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'Subscription Product', count: this.total });
      this.appService.showCustomLoader(false);
    });
  }
  
  ngOnInit(): void {
    this.appService.updateHeaderName({ name: 'Subscription Product', 
      count: this.subTemplateData.length });

      this.openPlanSubs = this.appService.openSubProduct.subscribe(res => {
        if(res.state === false) {
          this.getTransactions(this.filterData);
        }
      });
  }

  ngOnDestroy(): void {
    this.openPlanSubs && this.openPlanSubs.unsubscribe();
  }
}
