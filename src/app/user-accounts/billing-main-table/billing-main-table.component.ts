import { Component, OnInit ,HostListener} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Utils } from '../../utils';
import { AppService } from '../../app.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-billing-main-table',
  templateUrl: './billing-main-table.component.html',
  styleUrls: ['./billing-main-table.component.scss'],
})
export class BillingMainTableComponent implements OnInit {
  total= 0;
  showMoreNotification : Array<any> = [];        
  rowNumber= 0;
  pageSize= 50;
  rows= 50;
  last_follow_up: Array<any> = [];
  next_follow_up: Array<any> = [];
  days: Array<any> = [];
  daysDiffernce: any;
  page= 1;
  openNotes= false;
  openNotesList= false;
  openMail= false;
  openTextMsg= false;
  openNotesSubs: Subscription;
  openNotesListSubs: Subscription;
  openMailSubs: Subscription;
  refreshContactSubs: Subscription;
  openTextMsgSubs: Subscription;
  contactdata: Array<any> = [];
  filterData: any = {};
  messageList: Array<any> = [];
  SelectedContacts = [];
  selectAllCheckbox: boolean;
  checkboxArr: Array<any> = [];
  isChecked= false;
  showpopupNotes= false;
  transactionModal= false;
  singleCheck: boolean;
  modalSubscription: Subscription;
  countSubscription: Subscription;
  selectedContactsSubscription: Subscription;
  emailList: Array<any> = [];
  selectedContacts: Array<any> = [];
  groups: any;
  groupData: Array<any> = [];
  pageData: any;
  rowData: any;
  index: number;
  totalContact: any;
  viewsAndActivityColoumns = [
    { field: 'status', header: 'Status' },
    { field: 'name', header: 'Name' },
    { field: 'detail', header: 'Details' },
    { field: 'type', header: 'Type' },
    { field: 'date', header: 'Date' },
    { field: 'amount', header: ' Amount' },
    { field: 'edit', header: 'Action' },
  ];
  
  viewsAndActivityData=[{
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  {
    name:"Nathan Dumlao",
    mailid:"nathandumlao@gmail.com",
    detail:'Details',
    type:'Payment To' ,
    date:'12/21/2019' ,
    time:'12:45 PM',
    amount:'$2,800,000' ,
    edit:'',
  }, 
  ];
  status = [
    { label: 'Completed', value: 'Completed ' },
    { label: 'Paid', value: 'Paid' },
  ];
userUpdateStatus = [
  { label: 'Active', value: true },
  { label: 'Deactive', value: false },
];


  constructor(
    public appService: AppService,
    public utils: Utils,
    public title: Title,
    public messageService: MessageService,
    public router: Router,
  ) {
    this.selectAllCheckbox = false;
  }

  ngOnInit(): void {
    this.subscribePopups();
    this.appService.updateHeaderName({ name: 'Billing History', count: 1 });
  }
  ngOnDestroy() {

    if (this.openTextMsgSubs) {
      this.openTextMsgSubs.unsubscribe();
    }
    if (this.openMail) {
      this.openMailSubs.unsubscribe();
    }
  }

  subscribePopups() {
    this.openTextMsgSubs = this.appService.textpopup.subscribe(res => {
      this.openTextMsg = res;
    });

    this.openMailSubs = this.appService.openMail.subscribe(res => {
      this.openMail = res;
    });
  }

   /**
   *  opening add and update task popup
   *  select role
   */
  openAddPopUp() {
    this.appService.openAddTaskPopup('SAVE');
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }

  sendMailPopUp() {
    this.appService.openMailPopup(true);
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }


  updateRowData(r, i) {
    this.index = i;
    this.appService.updateContactProfile(r);
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(index) {
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }
  showMoreNotificationPop(index) {
    this.showMoreNotification[index] = !this.showMoreNotification[index];
  }
  routeLink(id) {
    this.router.navigate(['/website-management/blogedit'], {
        queryParams: {
            id: id
        }
    })
}
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
