import { AppService } from "./../../app.service";
import { Component, OnInit, ViewEncapsulation, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { InitialComponent } from "../../initial/initial.component";
import { ModalState } from "../shared.model";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  @Input() myInput: boolean;
  modal: ModalState;
  openCalendarMsg = false;
  revert = false;
  publicAccordian = true;
  pageAccordian = true;
  active = false;
  citiesAccordian = true;
  pageData = { name: "", count: "" };
  openCalenderSubs: Subscription;
  selectedMenu: string;
  checkBoxValue: boolean;
  headerSub: Subscription;
  showTaskPoup = false;
  addTicketPopUp = false;
  contactData: Array<any> = [];
  allAssociatedContacts: Array<any> = [];
  taskMode: string;
  showTaskPoupSubs: Subscription;
  countSubs: Subscription;
  sidebarSubscription: Subscription;
  openMailSubs: Subscription;
  openNotesSubs: Subscription;
  toggleView = true;
  countData: any = {};
  countExist = false;
  selectedTab: any;
  navigation = "icon-menu";
  urlValue: any;
  iconView = false;
  openMail = false;
  openNotes = false;
  sidebar = {
    contact: false,
    property: false,
    transaction: false,
    checklist: false,
    user: false,
    security: false,
    tasks: false,
    message: false,
    support: false,
    websitemanagement: false,
    hrms: false,
    dashboard: false,
    globalSettings: false,
    subscription: false,
    dashboardCalender: false,
    document: false,
    dmsTags: false,
  };
  dataSubscription: Subscription;
  checkboxValueSubscription: Subscription;
  groupName = '';
  @Input() navState: boolean;
  @Input() totalCount;
  constructor(
    public appService: AppService,
    public route: ActivatedRoute,
    public initialComponent: InitialComponent,
    public router: Router,
  ) {


    this.modal = new ModalState();
  }

  ngOnInit() {
    this.groupName = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')).group_name : '';
    this.dataSubscription = this.appService.getUpdatedData$.subscribe(
      (data) => {
        if (data) {
          this.initialComponent.getCount();
        }
      }
    );
    this.countSubs = this.appService.countSource.subscribe((count: any) => {
      if (count.task_count || count.contact_count) {
        this.countExist = true;
        this.countData = count;
        if (!this.router.url.includes("/property")) {
          this.getContacts(this.countData.contact_count);
        }
      }
    });
    this.getSelectedOption();
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
    this.sidebarSubscription = this.appService.sidebarSource$.subscribe(
      (state) => {
        this.toggleView = false;
        this.updateView();
      }
    );
    this.showTaskPoupSubs = this.appService.openAddTaskSidebar.subscribe(
      (res) => {
        this.taskMode = res;
        this.showTaskPoup = res === "SAVE" || res === "UPDATE" ? true : false;
      }
    );
    this.subscribePopups();
    this.openCalenderSubs = this.appService.openCalendar.subscribe(res => {
      this.openCalendarMsg = res.state;
    });
  }

  /**
   * To show selected option in sidebar
   */
  getSelectedOption() {
    const currentPath = window.location.pathname;
    if (currentPath.indexOf("customer") > -1) {
      this.sidebar.contact = true;
    } else if (currentPath.indexOf("user-accounts") > -1) {
      this.sidebar.user = true;
    } else if (currentPath.indexOf("security-roles") > -1) {
      this.sidebar.security = true;
    } else if (currentPath.indexOf("tasks") > -1) {
      this.sidebar.tasks = true;
    } else if (currentPath.indexOf("support") > -1) {
      this.sidebar.support = true;
    } else if (currentPath.indexOf("message") > -1) {
      this.sidebar.message = true;
    } else if (currentPath.indexOf("property") > -1) {
      this.sidebar.property = true;
    } else if (currentPath.indexOf("hrms") > -1) {
      this.sidebar.hrms = true;
    } else if (currentPath.indexOf("dashboard") > -1) {
      this.sidebar.dashboard = true;
    }
    else if (currentPath.indexOf("all-document") > -1) {
      this.sidebar.document = true;
    }
    else if (currentPath.indexOf("dms-tags") > -1) {
      this.sidebar.dmsTags = true;
    }
    else if (currentPath.indexOf("checklist") > -1) {
      this.sidebar.checklist = true;
      this.sidebar.transaction = false;
    }
    else if (currentPath.indexOf("transactions") > -1) {
      this.sidebar.transaction = true;
      this.sidebar.checklist = false;
    } else if (currentPath.indexOf("global-settings") > -1) {
      this.sidebar.globalSettings = true;
    } else if (currentPath.indexOf("subscription") > -1) {
      this.sidebar.subscription = true;
    }
    return this.sidebar;
  }

  updateView() {
    this.toggleView = !this.toggleView;
    this.appService.updateView(this.toggleView);
  }

  /**
   * To open add new modal based on selected page
   */
  openAddNewModal() {
    this.modal.addContact = true;
    this.appService.openNoteSidebarFooterPopup(false);
    this.appService.openMailSidebarPopup(false);
    this.appService.openAddTaskSidebarPopup("CLOSE");
  }

  /**
   *  To update Modal state
   * @param key Selected modal key
   */
  updateModalState(event) {
    this.modal.addContact = false;
    this.addTicketPopUp = event;
  }


  hideVisible() {
    this.active = !this.active;
  }

  sendMailPopUp() {
    this.appService.openMailSidebarPopup(true);
    this.appService.openAddTaskSidebarPopup("CLOSE");
    this.modal.addContact = false;
    this.appService.openNoteSidebarFooterPopup(false);
  }
  openAddNote() {
    this.appService.openNoteSidebarFooterPopup(true);
    this.appService.openMailSidebarPopup(false);
    this.appService.openAddTaskSidebarPopup("CLOSE");
    this.modal.addContact = false;
  }
  subscribePopups() {
    this.openMailSubs = this.appService.openSidebarMail.subscribe((res) => {
      this.openMail = res;
    });
    this.openNotesSubs = this.appService.noteSidebarFooterPopup.subscribe(
      (res) => {
        this.openNotes = res;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.openMail) {
      this.openMailSubs.unsubscribe();
    }
    if (this.openNotesSubs) {
      this.openNotesSubs.unsubscribe();
    }
  }

  openAddPopUp() {
    this.appService.openAddTaskSidebarPopup("SAVE");
    this.modal.addContact = false;
    this.appService.openMailSidebarPopup(false);
    this.appService.openNoteSidebarFooterPopup(false);
  }

  /**
   * To get contact list
   * @param count Contact count
   */
  getContacts(count) {
  }
  sendScheduleMetting() {
    this.appService.openCalendarPopup(true);
  }
  pageOpen() {
    this.router.navigate(['website-management/pages']);
  }
  pageCommunity() {
    this.router.navigate(['website-management/community']);
  }

  sendTextMessage() {
    this.appService.openMessagePopUp(true);
  }

  sendCallMessage() {
    const data = {
      state: true,
    };
    this.appService.openCallPopUp(data);
  }

  addTicket() {
    this.addTicketPopUp = true;
  }


  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    this.active = false;
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

}
