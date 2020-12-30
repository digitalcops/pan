import { Subscription, Subject } from 'rxjs';
import { Utils } from './../utils';
import { AppService } from './../app.service';
import { ContactService } from './contact.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ContactTableCols, ContactTableColsTab ,columnsData, ContactStatus, GroupOptions } from './contact.model';
import { PopUpService } from '../shared/pop-up/pop-up.service'
import { Title } from '@angular/platform-browser';
import { UserService } from '../user-accounts/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FilterService } from '../filter/filter.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],

})
export class ContactsComponent implements OnInit, OnDestroy {
  activeCategory = false;
  activeTabbing = 1;
  assignPagelayoutPopup =false;
  columnsData = columnsData;
  total = 0;
  rowNumber = 50;
  pageSize = 50;
  showMoreNotification : Array<any> = []; 
  rows = 50;
  last_follow_up: Array<any> = [];
  next_follow_up: Array<any> = [];
  days: Array<any> = [];
  daysDiffernce: any;
  page = 1;
  active = false;
  form_title: string;
  form_id: number;
  pagingEvent = null
  openNotes = false;
  openNotesList = false;
  openMail = false;
  openTextMsg = false;
  openCallMsg = false;
  openSinglePlaybookPopup = false

  openNotesSubs: Subscription;
  openNotesListSubs: Subscription;
  openMailSubs: Subscription;
  refreshContactSubs: Subscription;
  openTextMsgSubs: Subscription;
  openCallMsgSubs: Subscription;

  contactCols = ContactTableCols;
  contactColsTab =ContactTableColsTab;
  contactdata: Array<any> = [];
  statusOptions = ContactStatus;
  groupOption = GroupOptions;
  filterData: any = {};
  messageList: Array<any> = [];
  SelectedContacts = [];
  selectAllCheckbox: boolean;
  checkboxArr: Array<any> = [];
  isChecked = false;
  showpopupNotes = false;
  contactModal = false;
  singleCheck: boolean;
  modalSubscription: Subscription;
  countSubscription: Subscription;
  selectedContactsSubscription: Subscription;
  emailList: Array<any> = [];
  selectedContacts: Array<any> = [];
  groups: any;
  groupData: Array<any> = [];
  pageData: any;
  playBookCols: any[];
  rowData: any;
  index: number;
  totalContact: any;
  user: { name: any; id: any; };
  selectedData = 0;
  zoom = 12;
  MapHeight = '300';
  googelMapId= 'roadmap';
  googelMapSatelite= 'satellite';
  googelMapglobe= 'hybrid';
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    rotateControl: true,
    maxZoom: 15,
    minZoom: 8,
  };

  list1: any[];

  list2: any[];

  
  allNumbers: number[] = [];
  constructor(
    public userService: UserService,
    public contactService: ContactService,
    public appService: AppService,
    public utils: Utils,
    public popUpService: PopUpService,
    public title: Title,
    public messageService: MessageService,
    public router: Router,
    public filterService: FilterService,
  ) {
    for (let insertNumbers = 0; insertNumbers <= 100; insertNumbers++) {
      this.allNumbers.push(insertNumbers);
    }
    this.selectAllCheckbox = false;
  }

  ngOnInit(): void { 
      this.list1 = [
        { values:"Location Interest"},
        { values:"Budget"} ,
        { values:"Timeframe"},
        { values:"Criteria"},
        { values:"Property Type"},
        { values:"Main Features"} ,
        { values:"Qualified"},
        { values:"NextFollow Up"},
        { values:"Last"},
        { values:"Follow Up"} ,
        { values:"Last Login"} ,
        { values:"Source"},
        { values:"Campaign"},
        { values:"Owner"},
        { values:"Lender" },
      ];
      this.list2 = [];
     this.appService.updateHeaderName({ name: 'Customers', count: 0 });
    //  this.modalSubscription = this.appService.modalState$.subscribe((state) => {
    //   if (state) {
    //     this.contactModal = state;
    //   }
    // });
    // this.countSubscription = this.appService.countSource.subscribe(res => {
    //   this.totalContact = res['contact_count'];
    // });
    // this.appService.getContactData$.subscribe(flag => {
    //   this.getContactState(flag);
    // })
    // this.subscribePopups();
    // this.selectedContactsSubscription = this.appService.selectedContacts.subscribe(res => {
    //   if (res.length !== this.selectedContacts.length) {
    //     this.loadContactPageData(res);
    //   }
    // });
    // this.popUpService.getGroups().subscribe((response) => {
    //   const responsData = response.body.data ? response.body.data : [];
    //   responsData.forEach((group) => {
    //     if(group.is_active === true){
    //       this.groupData.push({ label: group.group_name, value: group.id });
    //     }
    //   });
    //   this.appService.updateGroupsData([...this.groupData]);
    //   this.appService.updateGroupsOptionData([...this.groupData]);
    // });
  }

  loadContactPageData(res) {
    this.appService.updateCheckedList(res);
    this.selectedContacts = [...res];
    this.emailList = [...res];
    if (res) {
      this.checkboxArr = [];
    }
    this.contactdata.forEach((el, index) => {
      if (this.selectedContacts.findIndex(item => item.id === el.id) === -1) {
        this.checkboxArr.push(false);
      } else {
        this.checkboxArr.push(true);
      }
    });
    this.selectAllCheckbox = true;
    this.resetCheckBoxList();
    if (this.checkboxArr.length === 0) {
      this.selectAllCheckbox = false;
    }
  }

  resetCheckBoxList() {
    this.checkboxArr.forEach(el => {
      if (!el) {
        this.selectAllCheckbox = false;
      }
    });
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

  /**
   * To load contact list
   * @param event Table event
   */
  loadContacts(event) {
    const updatedRows = event.rows;
    const updatedPageNumber = (event.first / event.rows) + 1;
    if (!event.sortField || (updatedRows !== this.rows) || (updatedPageNumber !== this.page)) {
      this.pagingEvent = event;
      this.rows = event.rows;
      this.pageSize = (event.first) + this.rows;
      this.rowNumber = (event.first) + 1;
      this.page = (event.first / this.rows) + 1;

      const filterKeys = Object.keys(this.filterData);
      if (filterKeys.length > 0) {
        this.filterData['page'] = this.page;
        this.filterData['limit'] = this.rows;
        this.getContacts(this.filterData, event);
      } else {
        this.pageData = { page: this.page, limit: this.rows };
        this.getContacts(this.pageData, event);
      }
    }
    else {
      this.onSortContactTable(event.sortField, event.sortOrder)
    }
  }

  onSortContactTable(fieldName, sortOrder) {
    this.contactdata.sort(this.contactService.dynamicSort(fieldName, sortOrder));
  }

  showAllContacts(event) {
    this.getContacts({page:1, limit: 5000});
  }

  augmentContactData(data): any {
    this.contactdata = [];
    data.forEach(element => {
      this.contactdata.push({
        selected: false,
        ...element,
        created_at: this.utils.fetchOnlyDateTime(element.created_at)
      });
    });
    this.appService.showLoader(false);
  }
  /**
   * To get Contact List
   * @param pageData Pagination data
   */
  getContacts(pageData: any, event: any = null): void {
    this.appService.showCustomLoader(true);
    this.contactService.getContacts(pageData).subscribe((response) => {
      this.augmentContactData(response.body.results ? response.body.results : []);
      this.total = response.body.count ? response.body.count : 0;
      for(const data of this.contactdata){
        if(data.mobile){
          data.mobile = data.mobile.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1-");
        } }
      this.appService.updateHeaderName({ name: 'Customers', count: this.total });
      this.selectAllCheckbox = false;
      this.isChecked = false;
      const arr = [];
      this.appService.updateSelectedContacts(arr);
      this.appService.updateCheckedList([...arr]);
      if (event) {
        this.onSortContactTable(event.sortField, event.sortOrder)
      }
      this.appService.showCustomLoader(false);
    });
  }

  isCheckEnable(value) {
    this.selectAllCheckbox = value;
    if (value) {
      this.checkboxArr = [];
      this.isChecked = true;
      this.appService.updateContactData(this.contactdata);
      this.messageList = [];
      this.contactdata.forEach((el, i) => {
        this.checkboxArr.push(true);
        if (el.mobile) {
          this.messageList.push({ 'id': i, 'itemName': el.mobile[0] });
        }
      })
      this.isChecked = true;
      this.appService.updateContactData(this.contactdata);
      this.emailList = [];
      this.contactdata.forEach(el => {
        this.emailList.push(el);
      });
      this.selectedContacts = this.emailList;
      this.appService.updateSelectedContacts(this.emailList);
    }
    else {
      this.messageList = [];
      this.checkboxArr = [];
      this.contactdata.forEach(el => {
        this.checkboxArr.push(false);
      })
      this.isChecked = false;
      this.emailList = [];
      this.isChecked = false;
      this.selectedContacts = this.emailList;
      this.appService.updateSelectedContacts(this.emailList);
    }
    this.appService.getCheckboxValue(this.selectAllCheckbox);
    this.appService.updateCheckedList(this.selectedContacts);
    this.appService.getCheckboxValue(this.selectAllCheckbox);
    this.appService.updateMessageList(this.messageList);
    this.appService.DropDownList(this.contactdata);
    this.selectAllCheckbox = (this.selectedContacts.length === this.contactdata.length);
  }
  
  getDates(date) {
    return date.toString().substr(0, date.toString().lastIndexOf("(")-1);
  } 

  /**
   * To get filters data
   * @param filter Selected filters
   */
  getFilterData(filter) {
    const augmentedFilters = this.utils.formatFilters(filter, this.page, this.rows);
    const contactFilters = { page: augmentedFilters.page,limit: augmentedFilters.limit,
      search_keyword: augmentedFilters.search_keyword,
      is_active: augmentedFilters.status,
    };
    if(filter["created_at__range"] && (filter["created_at__range"]["start"] !== "") && (filter["created_at__range"]["end"] !== "")) {
      contactFilters["created_at_range"] = {
        start: this.getDates(filter.create_date_source[0]),
        end: this.getDates(filter.create_date_source[1])
      }
    }
    this.filterData = this.utils.removeUnnecessaryKeys(contactFilters);
    this.getContacts(this.filterData, this.pagingEvent);
  }

  /**
   * To update Modal state
   * @param state Modal State
   */
  updateModalState(state) {
    this.contactModal = state;
  }

  recipientsData(e, userData, rowindex) {
    if (this.selectedContacts.length === 0) {
      this.emailList = [];
    }
    this.appService.updateContactData(this.contactdata);
    if (this.contactdata.length === this.checkboxArr.length) {
      this.checkboxArr.forEach(el => {
        if (el) {
          this.selectAllCheckbox = true;
        } else {
          this.selectAllCheckbox = false;
        }
      })
    }
    if (e) {
      if (userData.mobile) {
        this.messageList.push({ 'id': rowindex, 'itemName': userData.mobile[0] });
      }
      this.checkboxArr[rowindex] = true;
      this.emailList.push(userData);
      this.appService.updateContactData(this.contactdata);
    } else {
      this.checkboxArr[rowindex] = false;
      this.selectAllCheckbox = false;
      const index= this.messageList.indexOf(userData.name);
      this.messageList.splice(index, 1);
      const i= this.emailList.indexOf(userData);
      this.emailList.splice(i, 1);
    }
    const flag = this.messageList.length !== 0;
    this.appService.getCheckboxValue(flag);
    this.appService.updateMessageList(this.messageList);
    this.appService.DropDownList(this.contactdata);
    const flag2 = this.emailList.length !== 0;
    this.selectedContacts = this.emailList;
    this.appService.getCheckboxValue(flag2);
    this.appService.updateCheckedList(this.selectedContacts);
    this.appService.updateSelectedContacts(this.selectedContacts);
    this.resetCheckBoxList();
    this.selectAllCheckbox = (this.selectedContacts.length === this.contactdata.length);
  }

  removeTableData() {
    const isDeleted = [];
    this.contactdata.forEach(element => {
      if(element.selected) {
        isDeleted.push(element.id)
      }
    });
    this.sendDelPayload(isDeleted);
  }

  sendDelPayload(isDeleted) {
  }
  /**
   * To get contacts list on contact creation
   * @param state Contact state
   */
  getContactState(state) {
    if (state) {
      this.filterData['page'] = 1;
      this.filterData['limit'] = this.rows;
      this.getContacts(this.filterData, this.pagingEvent);
    }
  }

  updateRowData(r, i) {
    this.index = i;
    this.appService.updateContactProfile(r);
  }

  /**
   * To update Specific field
   * @param rowData Selected row
   * @param type Dropdown
   */
  updateSpecField(rowData, type, i=0) {
    const dataToSend = { contact_id: rowData.id };
    if (type === 'Status') {
      dataToSend['status'] = rowData.status;
    } else {
      dataToSend['groups'] = rowData.groupList;
    }
    this.contactService.updateContactField(dataToSend).subscribe((response) => {
      this.getContactState(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${type} updated successfully` });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went wrong' });
    });
  }

  /**
   * redirect to the edit contact form
   * @param rowData id for contact edit data
   */
  onEditContactData(rowData) {
        this.router.navigate(['/customer/mutate-customer'], {
      queryParams: {
        id: rowData.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * to add note
   * @param rowData 
   */
  addNote(rowData, rowindex) {
    this.appService.openNotePopup(true);
    this.checkboxArr[rowindex] = true;
    this.recipientsData(true, rowData, rowindex);
  }

  contactBulkOperation(eventContactData: any): void {
    switch (eventContactData.type) {
      case "EXPORT_ALL_CONTACT":
        this.exportAllContact();
        break;
      case "EXPORT_SELECTED_CONTACT":
        this.exportSelectedContact(eventContactData.contact_id);
        break;
    }
  }

  /**
   * To export contacts
   */
  exportAllContact() {
    this.contactService.exportAllContacts().subscribe((response: any) => {
      const file = new Blob([response], { type: 'text/csv;charset=utf-8' });
      saveAs(file, 'contacts.csv');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File exported successfully' });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
    });
  }
  onEditPlaybookData(rowData) {
    this.router.navigate(['/contacts/playbook/add-playbook'], {
      queryParams: {
        playbook_id: rowData.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  deleteSelectedSinglePlaybook(playbookID, index) {
    this.contactService.deleteSelectedSinglePlaybook(playbookID).subscribe((response) => {
      if (response) {
        this.playBookCols.splice(index, 1);
        this.messageService.add({severity: 'success',summary: 'Success',detail: `Playbook deleted successfully`});
      }
    },
      (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
      });
  }

  exportSelectedContact(selectedContactIds: Array<any>): void {
    this.contactService.exportSelectedContact(selectedContactIds);
  }

  cloneSelectedOpenPopup(id) {
    this.openSinglePlaybookPopup = true;
    this.form_title = `New Form ( ${moment(new Date()).format("LLLL")} ) - Clone`;
    this.form_id = id;
  }

  openAddPopUp() {
    this.appService.openAddTaskMorePopup('SAVE');
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }

  deleteContactStatus(id, index){
    const payload = {
      contact_delete: {
        ids: [id]
      }
    };
    this.filterService.bulkUpdateContacts(payload).subscribe((response) => {
          this.showMoreNotification = this.showMoreNotification.map(element => {
            return (false);
          });
          if (response) {
            this.contactdata.splice(index, 1);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Contact deleted successfully`
            });
          }
        },
          (e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
          });
  }

  sendMailPopUp() {
    this.appService.openMailPopup(true);
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }

  showMoreNotificationPop(index) {
    this.showMoreNotification[index] = !this.showMoreNotification[index];
  }
  @HostListener('document:click', ['$event'])
  clickedOutside(index) {
    this.showMoreNotification = this.showMoreNotification.map(element => {
      return (false);
    });
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  hideVisible(){
    this.active=!this.active;
   }
   tabbingFunction(tab: number) {
    this.activeTabbing = tab;
  }
  showHide(){
    this.active=!this.active;
   }
   Filter() {
    this.appService.updateTransactionSidebarState({
      state: true,
      data:5
    });
  };
  assignPagelayout(){
    this.assignPagelayoutPopup =true;
  };
}