import { termsTypeMapping } from './../shared/subs-plan/subs-plan.model';
import { SubscriptionService } from './subscription.service';
import { config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { Utils } from './../utils';
import { AppService } from './../app.service';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { PopUpService } from '../shared/pop-up/pop-up.service'
import { Title } from '@angular/platform-browser';
import { UserService } from '../user-accounts/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { FilterService } from '../filter/filter.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './sub-template.component.html',
  styleUrls: ['./sub-template.component.scss'],
})
export class SubTemplateComponent implements OnInit, OnDestroy {
  activeTransaction = 1;
  total= 0;
  rowNumber= 0;
  pageSize= 50;
  rows= 50;
  page= 1;
  group_name : string;
  openNotes= false;
  openNotesList= false;
  openMail= false;
  openTextMsg= false;
  termsTypeMapping = termsTypeMapping;

  openNotesSubs: Subscription;
  openNotesListSubs: Subscription;
  openMailSubs: Subscription;
  refreshContactSubs: Subscription;
  openTextMsgSubs: Subscription;

  contactdata: Array<any> = [];
  filterData: any = {};
  SelectedContacts = [];
  selectAllCheckbox: boolean;
  selectedTabName= "transactions_details";
  openImportPop: boolean;
  checkboxArr: Array<any> = [];
  isChecked= false;
  showpopupNotes= false;
  transactionModal= false;
  singleCheck: boolean;
  modalSubscription: Subscription;
  countSubscription: Subscription;
  selectedContactsSubscription: Subscription;
  openPlanSubs: Subscription;
  emailList: Array<any> = [];
  selectedContacts: Array<any> = [];
  groups: any;
  groupData: Array<any> = [];
  pageData: any;
  transactionData: any = {};
  rowData: any;
  index: number;
  totalContact: any;
  selectedTransactions: number;
  fileName: string;
  selectedFile: any;
  showMoreFilteBar: boolean;
  selctedPropertyName: string;
  resetModels= false;
  viewsAndActivityColoumns = [
    { field: 'is_active', header: 'Status' },
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'recurrence', header: 'Payment Terms' },
    { field: 'created_date', header: 'Created Date' },
    { field: 'edit', header: 'Action' },
  ];
 brokerAdminData:any
 viewsAndActivityData:any
 data = {
  is_active: true,
  status: "Active",
  code: "Code 001",
  name: "Template 001",
  recurrence: "1 Year",
  created_date: new Date(),
 }
 subTemplateData = [this.data,this.data,this.data,this.data,this.data]
  userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
  ];
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;
  @ViewChild('fileUploadDrag', { static: true }) fileUploadDrag: ElementRef;
  allTaskSubs: Subscription;
  constructor(
    public subscriptionService : SubscriptionService,
    public userService: UserService,
    public appService: AppService,
    public utils: Utils,
    public popUpService: PopUpService,
    public title: Title,
    public messageService: MessageService,
    public router: Router,
    public httpclient: HttpClient,
    public filterService: FilterService,
    ) {
    this.selectAllCheckbox = false;
  }
  toggle() {
    setTimeout(() => {
      this.showMoreFilteBar = true;
      this.appService.openfilterSidebar(true);
    }, 20)
  }
  ngOnInit(): void {
    this.subscribePopups();
    this.group_name = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).group_name
    : "";
    this.allTaskSubs = this.appService.getUpdatedData$.subscribe((data) => {
      if (data) {
        this.getTransactions({ page: this.page, limit: this.rows });
        this.appService.getCheckboxValue(false);
      }
    });
    this.appService.updateHeaderName({ name: 'Subscription Plan', count: this.subTemplateData.length });
    this.modalSubscription = this.appService.modalState$.subscribe((state) => {
      if (state) {
        this.transactionModal = state;
      }
    });
    this.openPlanSubs = this.appService.openSubPlan.subscribe(res => {
      if(res.state === false) {
        this.getTransactions(this.filterData);
      }
    });

    this.countSubscription = this.appService.countSource.subscribe(res => {
      this.totalContact = res['contact_count'];
    });
  }

  openAddPopUp() {
    this.appService.openAddTaskMorePopup('SAVE');
  }

  sendMailPopUp() {
    this.appService.openMailPopup(true);
  }

  deleteTransactionStatus(transaction_id, index) {
    const payload = {
      transaction_delete: {
        ids: [transaction_id]
      }
    };
    this.filterService.bulkUpdateTransactions(payload).subscribe((response) => {
      if (response) {
        this.viewsAndActivityData.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Transaction deleted successfully`
        });
      }
    },
      (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
      });
  }

  importSample() {
    
  }

  onImportClick() {
    
  }

  onFileSelect(event) {
    this.selectedFile = '';
    this.fileName = '';
    const splittedFiles = event.target.files[0].name.split('.');
    if (splittedFiles[splittedFiles.length - 1] === 'csv') {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    } else {
      this.fileUpload.nativeElement.value = '';
      this.fileUploadDrag.nativeElement.value = '';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only CSV files Allowed' });
      return;
    }
  }

  Filter() {
    this.appService.updateTransactionSidebarState({
      state: true,
      data:5
    });
  };

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
    if(filter.created_by) {
      payload["created_by"] = filter["created_by"];
    }
    this.filterData = payload;
    this.getTransactions(this.filterData);
  }

  importTransactions(event) {
    this.openImportPop = true;
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

  /**
  * To get Contact List
  * @param pageData Pagination data
  */

  searchTransactions(pageData): void {
    
  }

  getTransactions(pageData): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllPlans(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results);
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'Subscription Plan', count: this.total });
      this.selectAllCheckbox = false;
      this.appService.showCustomLoader(false);
      this.isChecked = false;
    });
  }

  onAllTransactionSelected(event) {
    let count = 0;
    this.viewsAndActivityData.forEach(element => {
        element.selected = event
        if(element.selected) {
          count++;
        }
    });
    this.selectedTransactions = count;
    this.appService.getCheckboxValue((count > 0));
    this.appService.updateSelectedDataAdded(this.viewsAndActivityData.filter(obj => obj.selected));
  }

  removeTransactions() {
    let is_deleted = [];
    this.viewsAndActivityData.forEach(element => {
      if(element.selected) {
        is_deleted.push(element.transaction_id)
      }
    });
    this.popUpService.deleteTransactionStatus({is_deleted: is_deleted}).subscribe((response) => {
      this.filterData['page'] = this.page;
      this.filterData['limit'] = this.rows;
      this.appService.showLoader(true);
      this.getTransactions(this.filterData);
      response && this.messageService.add({ severity: 'success', summary: 'Success',
                                            detail: response["body"]["message"] });
    },
    (e)=> {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message});
    });
  }

  exportSelectedTransaction() : void
  {
    
  }

  onSingleTransactionSelected(event) {
    let count = 0;
    this.viewsAndActivityData.forEach(element => {
      if(element.selected) {
        count++;
      }
    });
    this.selectedTransactions = count;
    this.selectAllCheckbox = (this.viewsAndActivityData.length === count);
    this.appService.getCheckboxValue((count > 0));
    this.appService.updateSelectedDataAdded(this.viewsAndActivityData);
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

  demo(val) {
    if (val) {
      this.transactionModal = false;
    }
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.openTextMsgSubs) {
      this.openTextMsgSubs.unsubscribe();
    }
    if (this.openMail) {
      this.openMailSubs.unsubscribe();
    }
    if (this.openNotesSubs) {
      this.openNotesSubs.unsubscribe();
    }

    this.selectedContactsSubscription && this.selectedContactsSubscription.unsubscribe();
    this.openPlanSubs && this.openPlanSubs.unsubscribe();
  }

    /**
   * To popup opening subscription
   */
  subscribePopups() {
    this.openTextMsgSubs = this.appService.textpopup.subscribe(res => {
      this.openTextMsg = res;
    });
    this.openMailSubs = this.appService.openMail.subscribe(res => {
      this.openMail = res;
    });
    this.openNotesSubs = this.appService.notePopup.subscribe(res => {
      this.openNotes = res;
    });
  }

  getUserDetails(r, i): void {
    this.appService.showLoader(true);
  }

  updateRowData(r, i) {
    this.index = i;
    this.appService.updateContactProfile(r);
    this.appService.updateSidebarState(true)
  }

  onEditTransactionData(rowData) {
    this.appService.updateSubPlanPopup({state: true, data: rowData});
  }   

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  transactionFunction(tab: number) {
    this.activeTransaction = tab;
  }
}
