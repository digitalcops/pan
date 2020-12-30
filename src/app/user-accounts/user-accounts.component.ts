import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from './../utils';
import { AppService } from './../app.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserService } from './user.service';
import { UserCols } from './user.model';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss'],
})
export class UserAccountsComponent implements OnInit, OnDestroy {
  total = 0;
  rowNumber = 0;
  pageSize = 0;
  rows = 50;
  isChecked = false;
  showMoreNotification: Array<any> = [];
  page = 1;
  checkboxArr: Array<any> = [];
  index: number;
  selectAll = false;
  usersData: Array<any> = [];
  openMail = false;
  openMailSubs: Subscription;
  openTextMsg = false;
  openTextMsgSubs: Subscription;
  userCols = UserCols;
  filterData = {};
  rolesList: Array<any> = [];
  roleSubscription: Subscription;
  dataSubscription: Subscription;
  pagingEvent: any;
  pageData: any;
  selectedUserList: Array<any> = [];

  constructor(
    public userService: UserService,
    public messageService: MessageService,
    public appService: AppService,
    public utils: Utils,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscribePopups();
    this.roleSubscription = this.appService.rolesSource$.subscribe((roles: any) => {
      this.rolesList = _.clone(roles);
    });
    this.dataSubscription = this.appService.getUpdatedData$.subscribe((data) => {
      if (data) {
        this.getUsersList(this.page, this.rows);
      }
    });
  }

  ngOnDestroy() {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
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
   * To load users initially
   * @param event Table event
   */
  loadUsers(event) {
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
        this.getFilteredUsers(this.filterData, event);
      }
      else {
        this.pageData = { page: this.page, limit: this.rows };
        this.getUsersList(this.page, this.rows);
      }
    }

    else {
      this.onSortUserTable(event.sortField, event.sortOrder)
    }
  }

  onSortUserTable(fieldName, sortOrder) {
  }

  /**
   * To get users list
   * @param page Page Selected page
   * @param limit Selected rows
   */
  getUsersList(page, limit) {
    this.selectAll = false;
    this.userService.getUsers({ page, limit }).subscribe((response) => {
      this.usersData = response.body.results ? response.body.results : [];
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'User Accounts', count: this.total });
      if (this.usersData.length > 0) {
        this.usersData.forEach((user) => user['selected'] = false);
      }
    });
  }

  /**
   * To Update User
   * @param rowData Row data
   */
  updateUser(rowData) {
    const userData = { group_id: rowData.groups, is_active: rowData.is_active, user_id: rowData.id };
    this.userService.updateUser(userData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    });
  }

  updateStateFiled(rowData) {
    const payload = { emp_status: rowData.emp_status, user_id: rowData.id };
  }
  /**
   * To get filters data
   * @param filter Selected filters
   */
  getFilterData(filter) {
    const augmentedFilters = this.utils.formatFilters(filter, this.page, this.rows);
    const userFilters = {
      page: augmentedFilters.page,
      limit: augmentedFilters.limit,
      is_active: augmentedFilters.is_active,
      created_at__range: augmentedFilters.created_at__range,
      groups: augmentedFilters.groups,
      search_keyword: augmentedFilters.search_keyword
    };
    this.filterData = this.utils.removeUnnecessaryKeys(userFilters);
    this.getFilteredUsers(this.filterData, this.pagingEvent);
  }

  /**
   * To get filtered users list
   * @param filters Selected filters
   */
  getFilteredUsers(filters, event: any = null) {
    this.selectAll = false;
    this.userService.getFilteredUsers(filters).subscribe((response: any) => {
      this.usersData = response.body.results ? response.body.results : [];
      this.total = response.body.count ? response.body.count : 0;
      this.appService.updateHeaderName({ name: 'User Accounts', count: this.total });
      if (this.usersData.length > 0) {
        this.usersData.forEach((user) => user['selected'] = false);
      }
    });
  }

  updateAll(value) {
    this.selectAll = value;
    if (value) {
      this.checkboxArr = [];
      this.selectedUserList = [];
      this.isChecked = true;
      this.isChecked = true;
      this.usersData.forEach(el => {
        this.selectedUserList.push(el);
        this.checkboxArr.push(true);
      });
    }
    else {
      this.checkboxArr = [];
      this.selectedUserList = [];
      this.usersData.forEach(el => {
        this.checkboxArr.push(false);
      });
      this.isChecked = false;
    }
    this.appService.getCheckboxValue(this.selectAll);
    this.appService.getGroupsCheckboxValue((this.selectedUserList.length > 0));
    this.appService.updateSelectedDataAdded(this.selectedUserList);
  }

  /**
  * To update checkbox
  * @param event Checkbox
  */
  recipientsData(e, groupVal, rowindex) {
    if (this.usersData.length === this.checkboxArr.length) {
      this.checkboxArr.forEach(el => {
        if (el) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      })
    }
    if (e) {
      this.checkboxArr[rowindex] = true;
      this.selectedUserList.push(groupVal);
    } else {
      this.checkboxArr[rowindex] = false;
      this.selectAll = false;

      const i= this.selectedUserList.indexOf(groupVal);
      this.selectedUserList.splice(i, 1);
    }
    const flag = this.selectedUserList.length !== 0;
    this.appService.getCheckboxValue(flag);

    this.appService.getGroupsCheckboxValue((this.selectedUserList.length > 0));
    this.appService.updateSelectedDataAdded(this.selectedUserList);

    this.selectAll = (this.selectedUserList.length === this.usersData.length)
  }
  onEditContactData(rowData) {
    this.router.navigate(['/hrms/agent-detail-formtab/contact-form-tab'], {
      queryParams: {
        userId: rowData.id,
        prefix: rowData.prefix,
      },
      queryParamsHandling: 'merge',
    });
  }

  updateRowData(r, i) {
    this.index = i;
    this.appService.updateContactProfile(r);
  }

  userBulkOperation(eventUserData: any): void {
    switch (eventUserData.type) {
      case "EXPORT_ALL_USER":
        this.exportAllUser();
        break;

      case "EXPORT_SELECTED_USER":
        this.exportSelectedUser(eventUserData.user_id);
        break;
    }
  }

  exportAllUser() {
    this.userService.exportAllUsers().subscribe((response: any) => {
      this.onFileDownload(response);
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
    });
  }

  exportSelectedUser(selectedUserIds: Array<any>): void {
    const payload = {
      "user_id": selectedUserIds
    };
    this.userService.exportSelectedUsers(payload).subscribe((response) => {
      this.onFileDownload(response);
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
    });
  }

  onFileDownload(response) {
    const file = new Blob([response], { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'user.csv');
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File exported successfully' });
  }

  openAddPopUp() {
    this.appService.openAddTaskMorePopup('SAVE');
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
}
