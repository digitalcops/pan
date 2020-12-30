import { AccessTypeList } from './../filter/filter.model';
import { AppExService } from './../../app-ex.service';
import { AuthenticateService } from "./../../authenticate/authenticate.service";
import { AppService } from "./../../app.service";
import { Subscription } from "rxjs";
import { MenuItem } from 'primeng/api';

import {
  ViewEncapsulation,
  Component, OnInit, OnDestroy, TemplateRef, Input, Renderer2, HostListener, Output, EventEmitter,
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ModalState } from "../shared.model";
import * as moment from "moment";
import { ProfileService } from "../../my-profile/profile.service";
import { Title } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() myOutput: EventEmitter<any> = new EventEmitter();
  outputString = "This is child means header";
  openCalendarMsg = false;
  openSubPlan = false;
  openSubProduct = false;
  openSubQuotation = false;
  showSidebarElement = false;
  showSearchField = false;
  items: MenuItem[];
  showNotification = false;
  public Editor = ClassicEditor;
  noteText: string;
  showHelpData = false;
  showAddNotification = false;
  settingSidebar = false;
  accessTypeList = AccessTypeList
  openNotesSubs: Subscription;
  openMailSubs: Subscription;
  openTextMsgSubs: Subscription;
  openCalenderSubs: Subscription;
  openPlanSubs: Subscription;
  openProductSubs: Subscription;
  openQuotationSubs: Subscription;

  openNotes = false;
  openMail = false;
  assignRequestPopup = false;
  assignUrlPopup = false;
  headerData = false;
  assignFolderPopup = false;
  assignSharePopup = false;
  openTextMsg = false;
  showAddActions = false;
  openSetting = false;
  showTaskPoup = false;
  contactData: Array<any> = [];
  allAssociatedContacts: Array<any> = [];
  countData: any = {};
  countExist = false;
  countSubs: Subscription;
  taskMode: string;
  showTaskPoupSubs: Subscription;
  showTaskPoupDataSubs: Subscription;
  tab: any = "tab1";
  tab1: any;
  tab2: any;
  tab3: any;
  pageData = { name: "", count: "" };
  userName = "";
  userInitial = "";
  sendTextMessageDescription: boolean;
  modal: ModalState;
  headerSub: Subscription;
  openSettingSubs: Subscription;
  showList = false;
  alertData: any = [];
  @Input() rolesList;
  fromEmployeeTab: boolean;
  unread: any;
  loggedInUserId: any;
  imageUrl = "";
  blogListTotal: any;
  parsedDocData = null;
  folderName = '';
  accessType = 'PERSONAL';
  constructor(
    public authService: AuthenticateService,
    public profileService: ProfileService,
    public appService: AppService,
    public route: ActivatedRoute,
    public router: Router,
    public renderer: Renderer2,
    readonly appExService: AppExService,
    public title: Title
  ) {
    this.modal = new ModalState();
  }
  documentOptions = [
    { label: 'Request Document' },
    { label: 'Upload Document' },
  ];
  ngOnInit() {
    this.showTaskPoupSubs = this.appService.openAddGroup.subscribe(res => {
      this.modal.addTag = true;
      this.appService.openSharedTag.next(res);
    });
    this.route.queryParams.subscribe((params) => {
      if (params.urlToOpen) {
        const s3Open = localStorage.getItem('s3Open');
        if (s3Open && (s3Open !== '')) {
          this.parsedDocData = JSON.parse(s3Open);
        }
      }
    });
    this.items = [{
      items: [
        {
          label: 'Add Folder', icon: 'common-bg-image add-folder-image', command: () => {
            this.assignFolder();
          }
        },
        {
          label: 'Upload File', icon: 'common-bg-image folder-file-header', command: () => {
            this.uploadImages();
          }
        },
        {
          label: 'Upload Folder ', icon: 'common-bg-image folder-upload-header', command: () => {
            this.uploadFolder();
          }
        }
      ]
    }];
    this.userName = localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")).name : "";
    this.userInitial = this.userName.substring(0, 1).toUpperCase();
    this.headerSub = this.appService.headerSource$.subscribe((page) => {
      this.pageData["name"] = page.name;
      this.pageData["count"] = page.count;
    });
    this.router.events.subscribe((routeObj) => {
      if (routeObj instanceof NavigationEnd) {
        this.modal = new ModalState();
        this.appService.updateModalState(false);
      }
    });

    // this.getUserProfilePic();
    this.getAllNotificationAlert();

    this.countSubs = this.appService.countSource.subscribe((count: any) => {
      if (count.task_count || count.contact_count) {
        this.countExist = true;
        this.countData = count;
        if (this.router.url === "/contacts/all-contacts") {
          this.getContacts(this.countData.contact_count);
        }
      }
    });

    this.showTaskPoupDataSubs = this.appService.openAddTaskHeaderData.subscribe(
      (res) => {
        this.taskMode = res;
        this.showTaskPoup = ((res === "SAVE") || (res === "UPDATE"));
      }
    );

    this.openNotesSubs = this.appService.noteHeaderPopup.subscribe((res) => {
      this.openNotes = res;
    });

    this.openMailSubs = this.appService.openHeaderMail.subscribe((res) => {
      this.openMail = res;
    });

    this.openTextMsgSubs = this.appService.textHeaderpopup.subscribe((res) => {
      this.openTextMsg = ((res === true) || (res.state === true));
    });
    this.openCalenderSubs = this.appService.openCalendar.subscribe(res => {
      this.openCalendarMsg = res;
    });
    this.openPlanSubs = this.appService.openSubPlan.subscribe(res => {
      this.openSubPlan = res.state;
      this.openCalendarMsg = res.state ? res.data : null;
    });
    this.openProductSubs = this.appService.openSubProduct.subscribe(res => {
      this.openSubProduct = res.state;
      this.openCalendarMsg = res.state ? res.data : null;
    });
    this.openQuotationSubs = this.appService.openSubQuotation.subscribe(res => {
      this.openSubQuotation = res;
    });
  }

  showResMessage() {
    this.appExService.updateFolderAdded({
      folderName: this.folderName,
      accessType: this.accessType
    });
    this.cancelFolder();
  }

  updatePageTitle(page) {
    this.title.setTitle(page);
    window.print();
    this.title.setTitle('Premier Agent Network');
  }

  getUserProfilePic() {
    this.loggedInUserId = this.profileService.getLoggedinUserId();
    this.profileService
      .getUserProfilePic(this.loggedInUserId)
      .subscribe((res) => {
        if (res) {
          this.imageUrl = res["data"].image_url;
        } else {
          this.imageUrl = "";
        }
      });
  }

  getAllNotificationAlert() {
  }

  ngOnDestroy() {
    if (this.headerSub) {
      this.headerSub.unsubscribe();
    }
    if (this.openMail) {
      this.openMailSubs.unsubscribe();
    }
    if (this.openNotesSubs) {
      this.openNotesSubs.unsubscribe();
    }
    this.openCalenderSubs && this.openCalenderSubs.unsubscribe();
    this.openPlanSubs && this.openPlanSubs.unsubscribe();

    this.openQuotationSubs && this.openQuotationSubs.unsubscribe();
    this.openProductSubs && this.openProductSubs.unsubscribe();
    this.openTextMsgSubs && this.openTextMsgSubs.unsubscribe();
  }

  /**
   * To Sign out user
   */
  signOut() {
    this.authService.logout().subscribe(() => {
      const remD = localStorage.getItem('rem_d')
      const auth = localStorage.getItem('auth')
      localStorage.clear();
      localStorage.setItem('rem_d', remD);
      localStorage.setItem('auth', auth);
      this.router.navigate(["login"]);
      this.appService.updateSidebarView(false);
    });
  }

  /**
   * To open Add new modal based on Selected page
   * @param type Modal Type
   */
  openAddNewModal(type) {
    this.fromEmployeeTab = false;
    switch (type) {
      case "Contacts":
        this.appService.updateModalState(true);
        break;
      case "Service Providers":
        this.modal.addService = true;
        break;
      case "Tags":
        this.modal.addTag = true;
        this.appService.openSharedTag.next(null);
        break;
      case "Transactions":
        this.appService.updateModalState(true);
        break;
      case "All Employees":
        this.fromEmployeeTab = true;
        this.modal.addUser = true;
        break;
      case "Categories":
        this.appService.updateModalState(true);
        break;
      case "Community":
        this.router.navigate(["/website-management/communityedit"]);
        break;
      case "Contracts":
        this.router.navigate(["/hrms/contract-oodo-form-tab"]);
        break;
      case "Employee Transfer":
        this.router.navigate(["/hrms/transfer-oodo-form-tab"]);
        break;
      case "All Positions":
        this.router.navigate(["/hrms/position-oodo-form-tab"]);
        break;
      case "Commission Plans":
        this.router.navigate(["/hrms/commision-oodo-form-tab"]);
        break;
      case "Offices":
        this.router.navigate(["/hrms/offices-oodo-form-tab"]);
        break;
      case "Make a Payment":
        this.router.navigate(["/users/payment"]);
        break;
      case "Billing History":
        this.router.navigate(["/users/payment"]);
        break;
      case "Departments":
        this.router.navigate(["/hrms/department-oodo-form-tab"]);
        break;
      case "All Applications":
        this.router.navigate(["/hrms/application-oodo-form-tab"]);
        break;
      case "Attendance":
        this.router.navigate(["/hrms/attendance-oodo-form-tab"]);
        break;
      case "Announcement":
        this.router.navigate(["/hrms/announcement-oodo-form-tab"]);
        break;
      case "HR Reminder":
        this.router.navigate(["/hrms/reminder-oodo-form-tab"]);
        break;
      case "Buildings":
        this.router.navigate(["/website-management/building-edit"]);
        break;
      case "Properties":
        this.router.navigate(["/website-management/propertiesedit"]);
        break;
      case "Pages":
        this.router.navigate(["/website-management/addpages"]);
        break;
      case "Groups":
        this.appService.updateModalState(true);
        break;
      case "Tickets":
        this.appService.updateModalState(true);
        break;
      case "Program":
        this.appService.updateModalState(true);
        break;
      case "Playbook":
        this.router.navigate(["contacts/playbook/add-playbook"], {
          queryParams: { templateId: null, view: false },
        });
        break;
      case "Template":
        this.router.navigate(["message/template/view-template"], {
          queryParams: { templateId: null, view: false },
        });
        break;
      case "Transactions Checklist":
        this.router.navigate(["transactions/checklist/view-checklist"], {
          queryParams: { templateId: null },
        });
        break;
      case "Meetings":
        this.openCalendarMsg = true;
        break;
      case "Subscription Plan":
        this.openSubPlan = true;
        break;
      case "Subscription Product":
        this.openSubProduct = true;
        break;
      case "Subscription Quotation":
        this.router.navigate(["subscription/subscription-quotation/mutate-quotation"]);
        break;
      case "Sales Team":
        this.router.navigate(["subscription/sales-team/mutate-salesteam"]);
        break;
      case "All Subscriptions":
        this.router.navigate(["subscription/all-subscription/mutate-allsubs"]);
        break;
      case "Invoicing":
        this.router.navigate(["subscription/invoicing/mutate-invoice"]);
        break;
      case "Customers":
        this.router.navigate(["customer/mutate-customer"]);
        break;
      case "My Listing(Residential Sale)":
      case "My Listing(Residential Lease)":
      case "My Listing(Residential Income)":
      case "My Listing(Land Lot)":
      case "My Listing(Mobile Homes)":
      case "My Listing(Commercial Sale)":
      case "My Listing(Commercial Lease)":
      case "My Listing(Business)":
      case "My Listing":
        this.router.navigate(["/property/add-leads-provider"]);
        break;
      default:
        this.modal.addUser = true;
    }
  }
  /**
   * To update Modal state
   * @param key Selected modal key
   */
  openSettingSidebar(key) {
    this.settingSidebar = key;
    this.appService.updateSettingSidebarState(key);
  }

  /**
   * To update Modal state
   * @param key Selected modal key
   */
  updateModalState(key) {
    this.modal[key] = false;
    this.modal["addContact"] = false;
    this.modal["addService"] = false;
  }

  activeTab(checkTab) {
    if (checkTab === 1) {
      this.tab = "tab1";
    } else if (checkTab === 2) {
      this.tab = "tab2";
    } else {
      this.tab = "tab3";
    }
  }

  openGroupModal() {
    this.appService.updateModalState(true);
  }

  openAddPopUp() {
    this.appService.openSharedTask.next("");
    this.appService.openAddTaskPopup('SAVE');

  }

  openAddTagPopUp() {
    this.appService.openAddTagPopup('SAVE');
    this.modal.addTag = true;
  }

  openAddGRoupPopUp() {
    this.appService.openAddGroupPopup('SAVE');
    this.appService.updateModalState(true);
  }
  /**
   * notification popup closed when click outside.
   * @param $event
   */
  @HostListener("document:click", ["$event"])
  clickedOutside($event) {
    this.showNotification = false;
    this.showHelpData = false;
    this.showAddNotification = false;
    this.showAddActions = false;
    this.showSearchField = false;
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  /**
   * open modal on click type
   * @param popupType define for which type of modal
   */
  openAddNotificationPopup(popupType) {
    if (popupType === "addContact") {
      this.modal.addContact = true;
      this.appService.openAddTaskHeaderPopup("CLOSE");
      this.appService.openMailHeaderPopup(false);
      this.appService.openNoteHeaderPopup(false);
      this.appService.openMessageHeaderPopUp(false);
    } else if (popupType === "task") {
      this.appService.openAddTaskHeaderPopup("SAVE");
      this.appService.openMailHeaderPopup(false);
      this.modal.addContact = false;
      this.appService.openNoteHeaderPopup(false);
      this.appService.openMessageHeaderPopUp(false);
    } else if (popupType === "email") {
      this.appService.openMailHeaderPopup(true);
      this.appService.openAddTaskHeaderPopup("CLOSE");
      this.modal.addContact = false;
      this.appService.openNoteHeaderPopup(false);
      this.appService.openMessageHeaderPopUp(false);
    } else if (popupType === "note") {
      this.appService.openNoteHeaderPopup(true);
      this.appService.openMailHeaderPopup(false);
      this.appService.openAddTaskHeaderPopup("CLOSE");
      this.modal.addContact = false;
      this.appService.openMessageHeaderPopUp(false);
    } else if (popupType === "message") {
      this.appService.openMessageHeaderPopUp(true);
      this.appService.openAddTaskHeaderPopup("CLOSE");
      this.modal.addContact = false;
      this.appService.openNoteHeaderPopup(false);
      this.appService.openMailHeaderPopup(false);
    }
  }

  /**
   * To get contact list
   * @param count Contact count
   */
  getContacts(count) {
  }

  changeLink() {
    this.appService.updateHeaderName({ name: 'Create Blog' })
    this.router.navigate(['/website-management/blogedit']);
  }

  changeIdxLink() {
    this.appService.updateHeaderName({ name: 'Create IDX Page' })
    this.router.navigate(['/website-management/idx-page-edit']);
  }

  changeCommunityLink() {
    this.appService.updateHeaderName({ name: 'Create Community' })
    this.router.navigate(['/website-management/communityedit'])
  }

  updateViewStateView() {
    const activatedUrl = this.router.url.split('?');
    const userActiveID = activatedUrl[1].split('=');
    this.router.navigate(['/contacts/service-edit'], {
      queryParams: {
        userId: userActiveID[1],
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
* updateViewState
*/
  updateViewState(pageName) {
  }

  handleDateClick(arg, event = null) {
    this.openCalendarMsg = arg.state;
  }

  handlePlanClose(arg, event = null) {
    this.openSubPlan = arg.state;
  }

  handleProductClose(arg, event = null) {
    this.openSubProduct = arg.state;
  }
  handleQuotationClose(arg, event = null) {
    this.openSubQuotation = arg.state;
  }
  showAddNotificationPop() {
    this.showAddNotification = !this.showAddNotification;
    this.showHelpData = false;
    this.showAddActions = false;
    this.showNotification = false;
  }
  showSearchFieldPop() {
    this.showSearchField = !this.showSearchField;
  }
  showNotificationPopUp() {
    this.showAddNotification = false;
    this.showHelpData = false;
    this.showAddActions = false;
    this.showNotification = !this.showNotification;
  }
  showAddActionsPopUp() {
    this.showAddNotification = false;
    this.showHelpData = false;
    this.showAddActions = !this.showAddActions;
    this.showNotification = false;
  }
  showHelpDataPopUp() {
    this.showAddNotification = false;
    this.showHelpData = !this.showHelpData;
    this.showAddActions = false;
    this.showNotification = false;
  }
  uploadImages() {
    this.appService.uploadImageState(true);
  }
  uploadFolder() {
    this.appService.uploadFolderState(true);
  }
  assignRequest() {
    this.assignRequestPopup = true;
  }
  assignUrl() {
    this.assignUrlPopup = true;
  }
  assignFolder() {
    this.assignFolderPopup = true;
  }
  cancelCategories() {
    this.assignRequestPopup = false;
  }
  cancelUrl() {
    this.assignUrlPopup = false;
  }
  cancelFolder() {
    this.assignFolderPopup = false;
  }
  showSidebar() {
    this.myOutput.emit(this.showSidebarElement);
    this.showSidebarElement = !this.showSidebarElement;
  }
  showAbsoluteHeader() {
    this.headerData = !this.headerData;
  }
}
