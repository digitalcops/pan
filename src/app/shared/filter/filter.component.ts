import { SubscriptionService } from './../../subscription/subscription.service';

import { PropertyTableList, WeekOptions } from './../shared.model';
import { UserService } from './../../user-accounts/user.service';
import { AppService } from './../../app.service';
import { Subscription, from } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Utils } from './../../utils';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'underscore';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { PopUpService } from '../pop-up/pop-up.service';
import { ModalState } from '../shared.model';
import * as moment from 'moment';
import {
  StatusOption, typeViewOption, createdbyOptions, dashboardOptions, appOptions, transaferOptions, reminderOptions,
  announcemetOptions, documentOptions, supervisorList, designationList, ModifyOption, BlogType, cmsStatus, TagsFilter, ProviderType,
  departmentType, PlaybookOptions, PlaybookBulkOptions, TypeOption, PriorityOption, TemplateTypes,
  SortModel, CalendarLocale, RatingOption, AssignOption, userStatusOptions, propertyOptions,userPlanOptions,
  AvailableType, ImportOptionsFilter, list_commission_type, ImportTransactionFileOptions,
  playbookStatusOptions, agentViewOption, CalenderTypeList, DocViewTypeList, DocListTypeList, DocRangeTypeList,
  EmployeeStatusOptions, assigneeToList, financialInfoList, billingTypeStatus
  , billingStatus, commissionStatusOptions, GroupStatusOption, TicketTypeOption,
  activeDeactive, TemplateTypesOptions, userUpdateStatus, TransactionOption,
  AvailableFilterType, SavedStatusOptions, List_service_type, UserName, BlogTypewebsite, statusSubscripAllOptions,
  TagsDeactive, ListGlobaltag, productTypeOptionFilter, statusSaleAllOptions, statusInvoiceAllOptions
} from './filter.model';
import { FilterService } from "../../filter/filter.service";
import { InitialService } from '../../initial/initial.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../../assets/stylesheets/form.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('500ms', style({ height: '*', opacity: 1, overflow: 'visible' })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'visible' }),
        animate('500ms', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      ]),
    ]),
  ],
})
export class FilterComponent implements OnInit, OnDestroy, OnChanges {
  subscibeData = new Subscription();
  blogID: void;
  page = 1;
  rows = 50;
  serviceGroupPopup: boolean;
  addWebsitePopup: boolean;
  addVendorPopup: boolean;
  templateOptions: Array<any> = [];
  approvedVendorPopup: boolean;
  weekOptions = WeekOptions;
  billingTypeStatus = billingTypeStatus;
  agentViewOption = agentViewOption;
  financialInfoList = financialInfoList;
  billingStatus = billingStatus;
  assigneeToList = assigneeToList;
  typeViewOption = typeViewOption;
  availableType = AvailableType;
  availableFilterType = AvailableFilterType;
  openTextMsg: false;
  savedStatusOptions = SavedStatusOptions;
  tab: any = 'tab3';
  filterData: any = {};
  contacts: Array<any> = [];
  employeesData: Array<any> = [];
  contactsName: Array<any> = [];
  Showhide: false;
  headerSub: Subscription;
  documentOptions = documentOptions;
  openMoreOptionData = false;
  transaferOptions = transaferOptions;
  date: any;
  totalCount: any;
  GroupName = false;
  employeesListData: Array<any> = []; mergeContactPopup: boolean;
  mergeContactsPopup: boolean;
  deleteTemplatePopup: boolean;
  assignTo = false;
  appOptions = appOptions;
  createdbyOptions = createdbyOptions;
  pageTitle = 'Premier Agent Network';
  pageData = {};
  userData: any;
  users: any;
  user: any;
  dashboardOptions = dashboardOptions;
  reminderOptions = reminderOptions;
  announcemetOptions = announcemetOptions;
  statusOptions = StatusOption;
  transactionOption = TransactionOption;
  modifyTypeOptions = TicketTypeOption;
  typeOptionTask = TypeOption;
  defaultDate: any;
  priorityOptionTask = PriorityOption;
  modifyOptions = ModifyOption;
  groupStatusOption = GroupStatusOption;
  blogType = BlogType;
  blogTypeWebsite = BlogTypewebsite;
  userName = UserName;
  templateList: any;
  cmsStatus = cmsStatus;
  tagsFilter = TagsFilter;
  tagsDeactive = TagsDeactive;
  providerType = ProviderType;
  departmentType = departmentType;
  designationList = designationList;
  modal: ModalState;
  supervisorList = supervisorList;
  playbookOptions = PlaybookOptions;
  playbookBulkOptions = PlaybookBulkOptions;
  addTicketPopUp = false;
  seoSetting = []
  typeOption = TypeOption;
  tasksList: Array<any> = [];
  profileData: any;
  active = false;
  cardActive = false;
  priorityOption = PriorityOption;
  templateTypes = TemplateTypes;
  list_service_type = List_service_type
  templateTypeoptions = TemplateTypesOptions
  taskMode: string;
  groupData: any = {};
  form_title: string;
  playbook_is_active: boolean;
  playbook_state: string;
  rolesList: Array<any> = [];
  selectedPlaybooksList: Array<any> = [];
  selectedTemplatesList: Array<any> = [];
  selectedGroupsList: Array<any> = [];
  selectedContactsList: Array<any> = [];
  selectedServiceProvidersList: Array<any> = [];
  selectedCheckList: Array<any> = [];
  selectedTasksList: Array<any> = [];
  selectedTicketList: Array<any> = [];
  selectedLeadProvidersList: Array<any> = [];
  selectedUserList = null;
  selectedTagList: Array<any> = [];
  selectedProgramsList: Array<any> = [];
  dateRange: Date;
  assignTagPopup = false;
  open_clone_playbook_popup = false
  playbookBulkOpType: string;
  dueDateRange: Date;
  dateText = '';
  dueDateText = '';
  selectedItems = [];
  tagsData: any = [];
  inputText = '';
  groupDataOption: any = [];
  addProgramForm: FormGroup;
  showFilters = false;
  newTag = false;
  dropdownSettings = {};
  sortModel: SortModel;
  en = CalendarLocale;
  associatedMessageData = false;
  assignModifySourcePopup = false;
  addToGroupPopUp = false;
  showBCCInputField: boolean;
  showTaskPoup = false;
  showCCInputField: boolean;
  tags: any;
  showCCInputText: boolean;
  showBCCInputText: boolean;
  sendTextMessageDescription: boolean;
  showTaskPoupSubs: Subscription;
  itemList = [];
  contactIdArr = [];
  body = '';
  to = '';
  calenderType = 'System Calender';
  docViewType = 'User Workspace';
  docSearchType = null;
  docListType = 'PERSONAL';
  docRangeType = 'Today';
  maximize;
  contactData: Array<any> = [];
  allAssociatedContacts: Array<any> = [];
  roleSubscription: Subscription;
  contactsSubscription: Subscription;
  selectedSubscription: Subscription;
  filterPropertySubscription: Subscription;
  playbooksSubscription: Subscription;
  templatesSubscription: Subscription;
  resetFiltersSubscription: Subscription;
  changePropTypeSourceSub: Subscription;
  groupsSubscription: Subscription;
  tagsSubscription: Subscription;
  ticketSubscription: Subscription;
  leadProviderSubscription: Subscription;
  userSubscription: Subscription;
  tasksSubscription: Subscription;
  programsSubscription: Subscription;
  contactsSubscription$: Subscription;
  serviceProvidersSubscription: Subscription;
  playbooksSubscription$: Subscription;
  resetSubscription: Subscription;
  countSubs: Subscription;
  rationOption = RatingOption;
  assignOption = AssignOption;
  maximizeScreen: false;
  minimizeScreen: false;
  contactStatusOptions: Array<any> = [];
  scheduleDays: Array<string> = [];
  taskStatusOptions: Array<any> = [];
  userStatusOptions = userStatusOptions;
  userPlanOptions = userPlanOptions;
  employeeStatusOptions = EmployeeStatusOptions;
  commissionStatusOptions = commissionStatusOptions;
  activeDeactive = activeDeactive;
  userUpdateStatus = userUpdateStatus;
  propertyOptions = propertyOptions;
  playbookStatusOptions = playbookStatusOptions;
  tagEvent: any;
  length: number;
  userList: Array<any> = [];
  weekDays: any[] = [];
  tableList: Array<any> = [];
  docSearchTypeList: Array<any> = [];
  calenderTypeList = CalenderTypeList;
  docViewTypeList = DocViewTypeList;
  listGlobalTag = ListGlobaltag;
  docListTypeList = DocListTypeList;
  docRangeTypeList = DocRangeTypeList;
  list_limit: Array<any> = [];
  list_commission_type = list_commission_type;
  propertyStatusList: Array<any> = [];
  assigneesList: Array<any> = [];
  groupSubscription: Subscription;
  groupSubscriptionData: Subscription;
  countSubscription: Subscription;
  checkBoxShowSubscription: Subscription;
  assignModifyPopup = false;
  activeModifyPopup = false;
  serviceModifyPopup = false;
  activeEmployeePopup = false;
  FollownModifyPopup = false;
  superModifyPopup = false;
  remanDateodifyPopup = false;
  remanTimeModifyPopup = false;
  BlogTypedescriptionModifyPopup = false;
  contactModifyPopup = false;
  activeTagModifyPopup = false;
  descriptionTagModifyPopup = false;
  slugTagModifyPopup = false;
  activeTicketModifyPopup = false;
  TypeTagModifyPopup = false;
  TypeTicketModifyPopup = false;
  TypeTasksModifyPopup = false;
  PriorityTasksModifyPopup = false;
  activePriorityModifyPopup = false;
  activeTaskModifyPopup = false;
  countExist = false;
  sendBlogData = [];
  statusLeadType = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Assigned', value: 'Assigned' },
    { label: 'Working', value: 'Working' },
    { label: 'On hold', value: 'On hold' },
    { label: 'Done', value: 'Done' },
  ];
  @Input() addBlog;
  @Input() addPublishBlog;
  @Input() filter;
  @Input() contactStatus;
  @Input() viewsAndActivityData;
  @Input() blogListTableTrim;
  @Input() communityListTableTrim;
  @Input() tagsList;
  @Input() buildingListTable;
  @Input() categoryList;
  @Input() selectedTransactions;
  @Input() taskStatus;
  @Input() groupOption;
  @Input() types;
  @Input() priority;
  @Input() blogList;
  @Input() idxPageEditList;
  @Input() checkedIDs;
  @Input() blogPublishList;
  @Input() ticketStatus;
  @Input('createdBy') createdBy: any;
  @Output() removeTransactions = new EventEmitter<any>();
  @Output() showAllContacts = new EventEmitter<any>();
  @Output() exportSelectedTransaction = new EventEmitter<any>();
  @Output() selectedFilters = new EventEmitter<any>();
  @Output() selectsBlog = new EventEmitter<any>()
  @Output() selectsTag = new EventEmitter<any>()
  @Output() selectedPropertyTable = new EventEmitter<any>();
  @Output() exportPropertyTable = new EventEmitter<any>();
  @Output() playbookBulkOperation = new EventEmitter<any>();
  @Output() contactBulkOperation = new EventEmitter<any>();
  @Output() taskBulkOperation = new EventEmitter<any>();
  @Output() tagsBulkOperation = new EventEmitter<any>();
  @Output() programBulkOperation = new EventEmitter<any>();
  @Output() templateBulkOperation = new EventEmitter<any>();
  @Output() serviceProviderBulkOperation = new EventEmitter<any>();
  @Output() groupBulkOperation = new EventEmitter<any>();
  @Output() ticketBulkOperation = new EventEmitter<any>();
  @Output() userBulkOperation = new EventEmitter<any>();
  @Output() importData = new EventEmitter<any>();
  @ViewChild('dateRangeRef', { static: true }) dateRangeRef: ElementRef;
  @ViewChild('duedateRangeRef', { static: true }) duedateRangeRef: ElementRef;
  @Output() addModalState = new EventEmitter<any>();
  @Output() programName = new EventEmitter<any>();
  debounceFunction = _.debounce(() => this.createFilterData(), 500);
  debounceFunctionGroup = _.debounce((event) => this.getContact(event), 500);
  countData: any;
  token: any;
  addPublishBlogUpdate: {
    content: any;
    status: string;
    title: any;
    blog_tag: Array<any>;
    blog_categories: Array<any>;
    featured_image: Array<any>;
    reviews: Array<any>;
    seo_setting: any;
    string_type: any;
    comment: any;
    visibility: any;
    publish_type: any;
    publish_schedule_date: any;
  };
  productTypeOption=productTypeOptionFilter;
  statusSaleAllOptions=statusSaleAllOptions;
  statusInvoiceAllOptions=statusInvoiceAllOptions;
  statusSubscripAllOptions=statusSubscripAllOptions;
  addBlogData: any[];
  blogData: any[];
  sendCategoryData: any = [];
  listSelectedData: any = [];
  settingSidebar = false;
  feeModifyPopup: boolean;
  serviceTagModifyPopup: boolean;
  detailView = true;
  cardOptions = 0;
  TypeTemplateModifyPopup: boolean;
  groupProgramPopup: boolean;
  activeTransactionPopup: boolean;
  transactionStatusPopup: boolean;
  transactionTypeModifyPopup: boolean;
  actualLeaseDateModifyPopup: boolean;
  EstimateDateModifyPopup: boolean;
  BrokerageStatusModifyPopup: boolean;
  publishedStatusPopup: boolean;
  metaDataSubs: Subscription;
  metaOptions: any;
  assigneeSupervisor: Array<any> = [];
  selectedContacts: Array<any> = [];
  assigneeListEmployees: Array<any> = [];
  keyword: any;
  meta_description: any;
  seosetting = {
    keyword: '',
    meta_description: '',
    title: '',
  }
  seoId: any;
  programList: any[];
  firstName: any[];
  lastName: any[];
  modifySchedulePopup: boolean;
  checkListTransactionPopup: boolean;
  saleTypeModifyPopup: boolean;
  shareTemplateModifyPopup: boolean;
  sharedWithName: string;
  Ticketid: string;
  programId: number;
  activePropertyModifyPopup: boolean;
  serviceTypePropertyPopup: boolean;
  listingDatePropertyPopup: boolean;
  openHouseDatePropertyPopup: boolean;
  createByName: Array<any> = [];
  createByBuilding: Array<any> = [];
  publishByName: Array<any> = [];
  createByProperty: Array<any> = [];
  bulkSelectedOptions: any;
  statusBlogModifyPopup: boolean;
  descriptionModifyPopup: boolean;
  updateTagwebsiteBlogPopup: boolean;
  statusTagModifyPopup: boolean;
  statusCategoryModifyPopup: boolean;
  dataSeo: any;
  seoSettingedit: any;
  statusPropertyModifyPopup: boolean;
  createByNameList: Array<any> = [];
  publishByNameList: Array<any> = [];
  firstParam: string;
  assignModifyPopupBlog = false;
  statusBuildingModifyPopup: boolean;
  listSubscriptionPlan = []
  listSalePerson = []
  constructor(
    public subscriptionService : SubscriptionService,
    public utils: Utils,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    public appService: AppService,
    public title: Title,
    public userService: UserService,
    public shareService: SharedService,
    public popUpService: PopUpService,
    public _activatedRoute: ActivatedRoute,
    public filterService: FilterService,
    public router: Router,
    public route: ActivatedRoute,
    public initialService: InitialService,
    public popupService: PopUpService,
  ) {
    this.addProgramForm = this.formBuilder.group({});
    this.groupData.schedule_options = 'Re-occur on';
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.programId = +params.get('programId');
    });
    this.dropdownSettings = {
      text: 'Select Contact',
      lazyLoading: true,
      enableSearchFilter: true,

    };
    this.sortModel = new SortModel({});
    this.modal = new ModalState();
  }

  getSubPlans(): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllPlans({page:1, limit: 1000}).subscribe((response) => {
      this.listSubscriptionPlan = response.body.results.map((obj)=> {
        return ({
          label: obj.name,
          value: obj.id,
        });
      });
      this.listSubscriptionPlan.unshift({ label: 'All', value: null });
    });
  }

  ngOnInit() {
    if(this.filter === 'sub-quotation' || this.filter === 'sales-team' || this.filter === 'sub-subMgmt') {
      this.subscriptionService.getUsers({page:1, limit: 1000}).subscribe((response) => {
        this.listSalePerson = response.body.results.map((obj)=> {
          return ({
            label: `${obj.full_name}`,
            value: obj.id,
          });
        });
        this.listSalePerson.unshift({ label: 'All', value: null });
      });
    }
    this.appService.programGroup.subscribe((res) => {

      this.bulkSelectedOptions['schedule_options'] = res.schedule_options;
      this.bulkSelectedOptions['scheduled_date'] = res.scheduled_date
      this.bulkSelectedOptions['schedule_day'] = res.schedule_day;
    })
    this.sharedWithName = localStorage.getItem('role')
   

    this.firstParam = this.route.snapshot.queryParamMap.get('id');
    if (window.location.href.indexOf("ogedit?id") === 43 && this.firstParam !== undefined && this.firstParam !== null) {
      this.getBlogDetails(this.firstParam);
      console.clear();
    }

    
    if (this.filter === 'sub-products') {
      this.getSubPlans();
    }
      if ((this.filter === 'sub-plans') || (this.filter === 'sub-products')) {
      this.userList = [];
      this.userService.getUsers({ page: 1, limit: 1000 }).subscribe((response) => {
        this.userList = response.body.results ? response.body.results.map((obj)=> {
          return ({
            value: obj.id,
            label: `${obj.first_name} ${obj.last_name || ''} ${obj.last_name}`
          });
        }) : [];
        this.userList.unshift({ label: 'All', value: null });
      });
    }
    this.headerSub = this.appService.headerSource$.subscribe((page) => {
      this.pageData['name'] = page.name;
    });
    this.contactsSubscription = this.appService.selectedContacts.subscribe(res => {
      this.length = res.length;
      this.selectedContactsList = res;
    });
    this.selectedSubscription = this.appService.selectedDataAdded.subscribe(res => {
      this.listSelectedData = res;
    });
    this.serviceProvidersSubscription = this.appService.selectedServiceProviders.subscribe(res => {
      this.length = res.length;
      this.selectedServiceProvidersList = res;
    });
    this.serviceProvidersSubscription = this.appService.selectedChecklist.subscribe(res => {
      this.length = res.length;
      this.selectedCheckList = res;
    });
    this.filterPropertySubscription = this.appService.filterPropertyDataSource$.subscribe(data => {
      this.sortModel.property_status = data.status;
      this.sortModel.status = data.status;
      this.dateRange = data.created_at;
      this.dueDateRange = data.date_listing_contract_form;
    });
    this.tasksSubscription = this.appService.taskList.subscribe(res => {
      this.length = res.length;
      this.selectedTasksList = res;
    });
    this.programsSubscription = this.appService.selectedPrograms.subscribe(res => {
      this.length = res.length;
      this.selectedProgramsList = res;
    });
    this.playbooksSubscription = this.appService.selectedPlaybooks.subscribe(res => {
      this.length = res.length;
      this.selectedPlaybooksList = res;
    });
    this.resetSubscription = this.appService.resetFilterSource$.subscribe(res => {
      this.sortModel.search_keyword = '';
    });
    this.templatesSubscription = this.appService.selectedTemplates.subscribe(res => {
      this.length = res.length;
      this.selectedTemplatesList = res;
    });
    this.resetFiltersSubscription = this.appService.resetPropertyFilterSource$.subscribe(res => {
      const property_table = this.sortModel.property_table;
      this.sortModel = new SortModel({});
      this.sortModel.property_table = property_table;
    });
    this.groupsSubscription = this.appService.selectedGroups.subscribe(res => {
      this.length = res.length;
      this.selectedGroupsList = res;
    });
    this.tagsSubscription = this.appService.selectedTags.subscribe(res => {
      this.length = res.length;
      this.selectedTagList = res;
    });

    this.ticketSubscription = this.appService.selectedTickets.subscribe(res => {
      this.length = res.length;
      this.selectedTicketList = res;
    });

    this.leadProviderSubscription = this.appService.selectedLeadProviders.subscribe(res => {
      this.length = res.length;
      this.selectedLeadProvidersList = res;
    });

    this.userSubscription = this.appService.selectedDataAdded.subscribe(res => {
      if (res !== "init") {
        this.length = res.length;
        this.selectedUserList = res;
      }
    });
    if (this.contactStatus) {
      this.contactStatusOptions = _.clone([...this.contactStatus]);
      this.contactStatusOptions.unshift({ label: 'All', value: null });
    }
    this.taskStatusOptions = _.clone(this.taskStatus);
    this.roleSubscription = this.appService.rolesSource$.subscribe((roles: any) => {
      this.rolesList = roles;
      if (Array.isArray(this.rolesList)) {
        const allExist = this.rolesList.some((role) => role.label === 'All');
        if (!allExist) {
          this.rolesList.unshift({ label: 'All', value: null });
        }
      }
    });
    this.countSubscription = this.appService.countSource$.subscribe((response: any) => {
      if (response.user_count) {
        this.countData = response;
        if (this.filter === 'contact') {
          this.getUsers();
        }
      }
    });

    this.inputText = "Search";

    this.checkBoxShowSubscription = this.appService.checkboxSource.subscribe(res => {
      this.showFilters = res;
    });
    this.tagsSubscription = this.appService.checkboxTaskSource.subscribe(res => {
      this.showFilters = res;
    });
    this.contactsSubscription$ = this.appService.selectedContacts$.subscribe(res => {
      if (res.length === 0) {
        this.showFilters = false;
      }
    });
    this.playbooksSubscription$ = this.appService.selectedPlaybooks$.subscribe(res => {
      if (res.length === 0) {
        this.showFilters = false;
      }
    });
    this.getBroadcastedData();
    this.getGroupData();
    this.countSubs = this.appService.countSource.subscribe((count: any) => {
      if (count.task_count || count.contact_count) {
        this.countExist = true;
        this.countData = count;
        if (this.filter === 'contact') {
          this.getContacts(this.countData.contact_count);
        }
      }
    });
    this.showTaskPoupSubs = this.appService.openAddTaskMoreOption$.subscribe(res => {
      this.taskMode = res;
      this.showTaskPoup = res === 'SAVE' || res === 'UPDATE' ? true : false;
    });
    // this.tagList();
  }

  checkForList() {
    this.userService.getSearchType().subscribe((response) => {
      this.docSearchTypeList = [{ label: 'All', value: null }, ...response.data];
    });
  }

  updateDaysField() {
    setTimeout(() => {
      for (const days of this.weekDays) {
        const weekDay = document.getElementById(`check-${days['id']}`);
        weekDay['checked'] = false;
      }
    }, 0);
    this.addProgramForm.get('schedule_week').enable();
    this.addProgramForm.get('schedule_minutes').disable();
    this.addProgramForm.get('schedule_day').disable();
    this.addProgramForm.get('schedule_hours').disable();
    this.addProgramForm.get('scheduled_date').disable();
    this.updateFormValidity();
  }

  /**
  * To update form valid state
  */
  updateFormValidity() {
    this.addProgramForm.get('schedule_week').updateValueAndValidity();
    this.addProgramForm.get('schedule_minutes').updateValueAndValidity();
    this.addProgramForm.get('schedule_day').updateValueAndValidity();
    this.addProgramForm.get('schedule_hours').updateValueAndValidity();
    this.addProgramForm.get('scheduled_date').updateValueAndValidity();
  }


  /**
   * update wait approximately
   */
  updateWaitApprox() {
    if (this.groupData.schedule_minutes || this.groupData.schedule_day || this.groupData.schedule_hours) {
      this.addProgramForm.get('schedule_minutes').clearValidators();
      this.addProgramForm.get('schedule_day').clearValidators();
      this.addProgramForm.get('schedule_hours').clearValidators();
    } else {
      this.addProgramForm.get('schedule_minutes').setValidators([Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]);
      this.addProgramForm.get('schedule_day').setValidators([Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]);
      this.addProgramForm.get('schedule_hours').setValidators([Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]);
    }
    this.updateFormValidity();
  }

  hideVisible() {
    this.active = !this.active;
  }
  getMetaDataOptions(): void {
    if (!this.metaOptions) {
      this.metaOptions = [];
    }
  }

  getFeaturesMetaData(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes["createdBy"]) {
      this.userList = _.clone(this.utils.augmentDropdownData(this.createdBy));
      this.userList.unshift({ label: 'All', value: null });
    }
  }

  /**
   * notification popup closed when click outside.
   * @param $event
   */

  ngOnDestroy() {
    this.subscibeData.unsubscribe();
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
    if (this.groupSubscriptionData) {
      this.groupSubscriptionData.unsubscribe();
    }
    this.countSubscription && this.countSubscription.unsubscribe();
    this.selectedSubscription && this.selectedSubscription.unsubscribe();
    this.contactsSubscription && this.contactsSubscription.unsubscribe();
    this.roleSubscription && this.roleSubscription.unsubscribe();
    this.resetSubscription && this.resetSubscription.unsubscribe();
    this.playbooksSubscription && this.playbooksSubscription.unsubscribe();
    this.checkBoxShowSubscription && this.checkBoxShowSubscription.unsubscribe();
    this.tagsSubscription && this.tagsSubscription.unsubscribe();
    this.contactsSubscription$ && this.contactsSubscription$.unsubscribe();
    this.playbooksSubscription$ && this.playbooksSubscription$.unsubscribe();
    this.templatesSubscription && this.templatesSubscription.unsubscribe();
    this.resetFiltersSubscription && this.resetFiltersSubscription.unsubscribe();
    this.filterPropertySubscription && this.filterPropertySubscription.unsubscribe();
  }

  /**
* To get users list
*/
  getUsers() {
    const pageData = { page: 1, limit: 5000 };
    this.userService.getUsers(pageData).subscribe((response) => {
      const resData = response.data;
      this.assigneesList = [];
      resData.forEach(element => {
        if (element.is_active && (element.first_name !== "")) {
          let name = '';
          if (element.middle_name) {
            name = `${element.first_name} ${element.middle_name} ${element.last_name}`
          }
          else {
            name = `${element.first_name} ${element.last_name}`
          }
          this.assigneesList.push({label: name,value: {name: name, id: element.id}});
          this.assigneeSupervisor.push({label: name,value: {name: name, id: element.id}});
        }
      });
      this.assigneesList.unshift({ label: 'All', value: null });
    });
  }

  /**
   * To get Broadcasted data
   */
  getBroadcastedData() {
    this.groupSubscription = this.appService.groupsData$.subscribe((groups) => {
      if (groups) {
        this.groupData = [...groups];
        this.groupData.unshift({ label: 'All', value: null });
        this.groupDataOption = groups;
      }
    });
  }

  /**
 * To get Group data
 */
  getGroupData() {
    this.groupSubscriptionData = this.appService.groupsDataOption.subscribe((groups) => {
      if (groups) {
        this.groupDataOption = groups;
      }
    });
  }

  assignTag() {
    this.assignTagPopup = true;
    this.openMoreOptionData = false;
  }

  tagList() {
    this.popUpService.getTagsList().subscribe(res => {
      this.tags = res.body.data ? this.augmentTags(res.body.data) : [];
    })
  }
  onTagRemove(e) {

  }

  onTagAdd(event) {
    const tagExist = this.tags.some((tag) => tag.value === event.display);
    if (!tagExist) {
      this.tagEvent = event;
      this.addTag({ name: event.display });
      this.newTag = false;
    }
  }

  dontAddTag() {
    const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === this.tagEvent.display);
    this.tagsData.splice(recentTagIndex, 1);
    this.newTag = false;
  }
  updateTags() {
    this.tagsData.forEach(tag => {
      this.contactIdArr.push(tag.id);
    });
    const data = {
      contact_id: this.profileData.id,
      tags: this.contactIdArr
    }
    this.popUpService.updateTags(data).subscribe(res => {
      this.assignTagPopup = false;
      this.appService.refreshAllContacts(true);
      this.tagsData.forEach(tag => {
        this.profileData['tag_name'].push({ id: tag.id, tag: tag.display });
      })
      this.tagsData = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tags updated successfully' });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    })
  }
  augmentTags(tags) {
    let updatedData = [];
    updatedData = tags.map((tag) => ({
      id: tag.id,
      value: tag.tag_name
    }));
    return updatedData;
  }

  addTag(tagName) {
    const payload = {
      tag_name: tagName.name
    }
    this.popUpService.addTag(payload).subscribe((response: any) => {
      for (const tag of this.tagsData) {
        if (tag.display === tagName.name) {
          tag['id'] = response.body.id;
          break;
        }
      }

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag created successfully' });
    }, (server_error) => {
      if (typeof server_error.error.message === "object") {
        const message = server_error.error.message;
        for (const key in message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message[key] });
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: server_error.error.message });
      }
      const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === tagName.tag_name);
      const tagIndex = this.tags.findIndex((tag) => tag.value === tagName.tag_name);
      this.tagsData.splice(recentTagIndex, 1);
      this.tags.splice(tagIndex, 1);
    });
  }

  /**
   * On Date Select
   * @param type Created Date / Due Date
   */
  onDateSelect(type) {
    const dateType = type === 'dateRange' ? this.dateRange : this.dueDateRange;
    const rangeType = type === 'dateRange' ? 'created_at__range' : 'due_date__range';
    let dateToDisplay = type === 'dateRange' ? this.dateText : this.dueDateText;
    const clonedDate = JSON.parse(JSON.stringify(dateType));
    if(rangeType === 'created_at__range') {
      this.sortModel["create_date_source"] = [
        (clonedDate[0] !== null ? new Date(clonedDate[0]) : null),
        (clonedDate[1] !== null ? new Date(clonedDate[1]) : null),
      ];
    }
    else {
      this.sortModel["due_date_source"] = [
        (clonedDate[0] !== null ? new Date(clonedDate[0]) : null),
        (clonedDate[1] !== null ? new Date(clonedDate[1]) : null),
      ];
    }
    this.sortModel[rangeType].start = clonedDate[0] !== null ? this.utils.createTimestamp(clonedDate[0]) : null;
    this.sortModel[rangeType].end = clonedDate[1] !== null ? this.utils.createTimestamp(clonedDate[1]) : null;
    dateToDisplay = `${this.utils.formatDate(dateType[0])}`;
    if (dateType[1] !== null) {
      dateToDisplay += ` - ${this.utils.formatDate(dateType[1])}`;
    }
    if (type === 'dateRange') {
      this.dateText = dateToDisplay;
    } else {
      this.dueDateText = dateToDisplay;
    }
  }

  /**
   * To update Date range
   * @param ref Datepicker Reference
   * @param type Created Date / Due Date
   */
  updateDateRange(ref, type) {
    const dateType = type === 'dateRange' ? this.dateRange : this.dueDateRange;
    if (!dateType || dateType[0] === null || dateType[1] === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select date range' });
    } else {
      this.selectedFilters.emit(this.sortModel);
      ref.overlayVisible = false;
    }
  }

  saveBlog() {
    if (window.location.href.indexOf("blogedit") > -1) {
      const testData = [];
      testData.push(this.seoSetting[0]);
      const dataSeo = testData[0];
      if (dataSeo !== undefined && dataSeo !== null) {
        this.postSeo(dataSeo, 'save');
      }
    }
    else if (window.location.href.indexOf("communityedit") > -1) {
      this.saveCommunity();
    }
    else if (window.location.href.indexOf("building-edit") > -1) {
      this.saveBuildings();
    }
    else if (window.location.href.indexOf("propertiesedit") > -1) {
      this.saveBuildings();
    }
  }

  postSeo(data, status) {
    const seoData = {
      "title": data.title,
      "keyword": data.keyword,
      "meta_description": data.meta_description
    }
    const checkClick = status;
    this.filterService.createSeo(seoData).subscribe((res) => {
      this.seoId = res.body.id;
      this.seosetting.keyword = res.body.keyword;
      this.seosetting.meta_description = res.body.meta_description;
      this.seosetting.title = res.body.title;
      if (checkClick === 'save') {
        this.draftBlog();
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
    });
  }

  draftBlog() {
  }

  saveBuildings() {
    
  }

  saveCommunity() {
    
  }

  savePublishBlog() {
    if (window.location.href.indexOf("blogedit") > -1) {
      this.publish();
    }
    else if (window.location.href.indexOf("propertiesedit") > -1) {
      this.publishproperty();
    }
    else if (window.location.href.indexOf("communityedit") > -1) {
      this.saveCommunity();
    }
    else if (window.location.href.indexOf("building-edit") > -1) {
      this.saveBuildings();
    }
  }

  getBlogDetails(firstParam) {
  }

  submitapprovalBlog() {
    if (window.location.href.indexOf("blogedit") > -1) {
      this.submit();
    }
    else if (window.location.href.indexOf("propertiesedit") > -1) {
      this.approvalproperty();
    }
  }

  approvalproperty() {
    
  }

  publishproperty() {
    
  }


  submit() {
  }

  publish() {
  }

  /**
   * To clear date range
   * @param type Created Date / Due Date
   * @param key Calendar type
   */
  clearDate(type, key) {
    if (type === 'dateRange') {
      this.dateRange = null;
      this.dateText = '';
    } else {
      this.dueDateRange = null;
      this.dueDateText = '';
    }
    this.sortModel[key].start = '';
    this.sortModel[key].end = '';
    this.selectedFilters.emit(this.sortModel);
  }

  /**
   * To create user filter object
   */
  createFilterData() {
    this.selectedFilters.emit(this.sortModel);
    this.selectsBlog.emit(this.sortModel)
    this.selectsTag.emit(this.sortModel);
  }

  filterInput(event, key) {
    this.debounceFunction(event, key);
  }

  importSample() {
    if (ImportOptionsFilter[this.filter] && ImportOptionsFilter[this.filter] !== "") {
      window.location.href = ImportOptionsFilter[this.filter];
    }
  }

  importTransactionsSample() {
    const group_name = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')).group_name : '';
    if (ImportTransactionFileOptions[group_name]) {
      window.location.href = ImportTransactionFileOptions[group_name];
    }
  }

  /**
   * To open print view
   */
  print() {
    this.pageData['name'] = `${this.pageTitle} | ${this.pageData['name']}`;
    this.shareService.updatePageTitle(this.pageData['name']);
  }

  /**
   * To open message popup
   */
  sendTextMessage() {
    this.appService.openMessagePopUp(true);
  }
  /**
     * To open message popup
     */
  sendCallMessage() {
    const data = {
      state: true,
      moduleType: this.availableType[this.filter],
    };
    if (this.filter === "contact") {
      data["list"] = this.selectedContactsList;
    }
    else if (this.filter === "service") {
      data["list"] = this.selectedServiceProvidersList;
    }
    else if (this.filter === "user") {
      data["list"] = this.listSelectedData;
    }
    else if (this.filter === "employees") {
      data["list"] = this.listSelectedData;
    }
    this.appService.openCallPopUp(data);
  }
  sendScheduleMessage() {
    this.appService.openSchedulePopUp(true);
  }

  /**
   * To open mail popup
   */
  sendMailPopUp() {
    this.appService.openMailPopup(true);
  }

  openMoreOptionPopUp() {
    this.openMoreOptionData = !this.openMoreOptionData;
  }

  /**
     * To get contact list
     * @param count Contact count
     */
  getContacts(count) {
  }

  openAddPopUp() {
    this.appService.openAddTaskMorePopup('SAVE');
    this.openMoreOptionData = false;
  }

  assignModify() {
    this.assignModifyPopup = true;
    this.openMoreOptionData = false;
  }

  assignModifyBlog() {
    this.assignModifyPopupBlog = true;
    this.openMoreOptionData = false;
  }

  transactionTypeModify() {
    this.transactionTypeModifyPopup = true;
    this.openMoreOptionData = false;
  }

  modifyFollowDate() {
    this.FollownModifyPopup = true;
    this.openMoreOptionData = false;
  }

  feeServiceModify() {
    this.feeModifyPopup = true;
    this.openMoreOptionData = false;
  }

  activeModify() {
    this.activeModifyPopup = true;
    this.openMoreOptionData = false;
  }

  serviceTypeLead() {
    this.serviceTypePropertyPopup = true;
    this.openMoreOptionData = false;
  }

  listingexperdateModify() {
    this.listingDatePropertyPopup = true;
    this.openMoreOptionData = false;
  }

  openhouseModify() {
    this.openHouseDatePropertyPopup = true;
    this.openMoreOptionData = false;
  }


  activePropertyModify() {
    this.activePropertyModifyPopup = true;
    this.openMoreOptionData = false;
  }

  saleTypeModify() {
    this.saleTypeModifyPopup = true;
    this.openMoreOptionData = false;
  }

  checkListTransactionModify() {
    this.checkListTransactionPopup = true;
    this.openMoreOptionData = false;
  }

  scheduleProgram() {
    this.modifySchedulePopup = true;
    this.openMoreOptionData = false;
  }
  transactionActualDateModify() {
    this.actualLeaseDateModifyPopup = true;
    this.openMoreOptionData = false;
  }



  groupProgramsModify() {
    this.groupProgramPopup = true;
    this.openMoreOptionData = false;
  }

  TypeTemplateModify() {
    this.TypeTemplateModifyPopup = true;
    this.openMoreOptionData = false;
  }

  sheredTemplateModify() {
    this.shareTemplateModifyPopup = true;
    this.openMoreOptionData = false;
  }

  serviceTags() {
    this.serviceTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  activeServiceModify() {
    this.serviceModifyPopup = true;
    this.openMoreOptionData = false;
  }

  transactionEstimateDateModify() {
    this.EstimateDateModifyPopup = true;
    this.openMoreOptionData = false;
  }

  brokerageStatusModify() {
    this.BrokerageStatusModifyPopup = true;
    this.openMoreOptionData = false;
  }

  serviceGroupModify() {
    this.serviceGroupPopup = true;
    this.openMoreOptionData = false;
  }

  addWebsite() {
    this.addWebsitePopup = true;
    this.openMoreOptionData = false;
  }

  addVendor() {
    this.approvedVendorPopup = true;
    this.openMoreOptionData = false;
  }

  activeTransactionModify() {
    this.activeTransactionPopup = true;
    this.openMoreOptionData = false;
  }

  transactionStatusModify() {
    this.transactionStatusPopup = true;
    this.openMoreOptionData = false;
  }

  publishedStatusModify() {
    this.publishedStatusPopup = true;
    this.openMoreOptionData = false;
  }


  supervisorModify(val) {
  }
  activeEmployeeModify() {
    this.activeEmployeePopup = true;
    this.openMoreOptionData = false;
  }

  remDateModify() {
    this.remanDateodifyPopup = true;
    this.openMoreOptionData = false;
  }

  remTimeModify() {
    this.remanTimeModifyPopup = true;
    this.openMoreOptionData = false;
  }

  activeTaskModify() {
    this.activeTaskModifyPopup = true;
    this.openMoreOptionData = false;
  }

  activeTagModify() {
    this.activeTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  activeTicketModify() {
    this.activeTicketModifyPopup = true;
    this.openMoreOptionData = false;
  }

  assignTypeTag() {
    this.TypeTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  assignTypeTasks() {
    this.TypeTasksModifyPopup = true;
    this.openMoreOptionData = false;
  }

  priorityTasksmodify() {
    this.PriorityTasksModifyPopup = true;
    this.openMoreOptionData = false;
  }

  prioritymodify() {
    this.activePriorityModifyPopup = true;
    this.openMoreOptionData = false;
  }
  slugTagModify() {
    this.slugTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  descriptionTagModify() {
    this.descriptionTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  descriptionModify() {
    this.descriptionModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websiteBlogModify() {
    this.statusBlogModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websiteTagModify() {
    this.statusTagModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websiteCategoryModify() {
    this.statusCategoryModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websitePropertyModify() {
    this.statusPropertyModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websiteBuildingModify() {
    this.statusBuildingModifyPopup = true;
    this.openMoreOptionData = false;
  }

  websiteBlogTag() {
    this.updateTagwebsiteBlogPopup = true;
    this.openMoreOptionData = false;
  }

  contactModify() {

    this.contactModifyPopup = true;
    this.appService.showCustomLoader(true);
    this.popupService.getTicketModalData(this.countData).subscribe((response) => {
      this.contacts = response[0].body.data ? this.utils.augmentMultiselect(response[0].body.data) : [];
      this.appService.showCustomLoader(false);
      this.selectedContacts = this.contacts.filter(res => {
        if (this.Ticketid == res.id) {
          return true
        }
      })


    });
    this.openMoreOptionData = false;
  }

  mergeContacts() {
    this.mergeContactsPopup = true;
    this.openMoreOptionData = false;
  }

  updateModifyPopUp() {

  }
  modifySourcePopUp() {
    this.assignModifySourcePopup = true;
    this.openMoreOptionData = false;
  }
  openAddToGroupPopUp() {
    this.addToGroupPopUp = true;
    this.openMoreOptionData = false;
  }

  updateModalState(state) {
    this.addTicketPopUp = state;

  }
  updateModalStateTag(state) {
    this.modal[state] = false;
    this.addModalState.emit(event);
  }
  addTicket() {
    this.addTicketPopUp = true;
    let list = [];
    if (this.filter === 'contact') {
      list = this.selectedContactsList.map(obj => obj.id);
    }
    this.appService.sendPopupData({ category_type: this.availableType[this.filter], id: list });
  }

  activeTab(checkTab) {
    if (checkTab === 1) {
      this.tab = 'tab1';
    } else if (checkTab === 2) {
      this.tab = 'tab2';
    } else if (checkTab === 3) {
      this.tab = 'tab3';
    }
  }

  loadContacts(event) {
    this.debounceFunctionGroup(event);
    this.debounceFunction(event);

  }


  getServiceType() {
  }

  deleteRecords() {
    if (this.filter === 'playbook') {
      const eventData = {
        playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
        type: "DELETE"
      };

      this.open_clone_playbook_popup = false;
      this.playbookBulkOperation.emit(eventData);
    }
  }

  updateBulkPlaybooks(playbookBulkOpType) {
    if (this.filter === 'playbook') {
      let eventData = {};
      switch (playbookBulkOpType) {
        case "STATUS":
          eventData = {
            playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
            type: "STATUS",
            is_active: this.playbook_is_active
          };
          break;
        case "CLONE":
          eventData = {
            playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
            type: "CLONE",
            form_title: this.form_title
          };
          break;
        case "STATE":
          eventData = {
            playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
            type: "STATE",
            playbook_state: this.playbook_state
          };
          break;
      }

      this.open_clone_playbook_popup = false;
      this.playbookBulkOperation.emit(eventData);
    }
  }

  getContact(event) {
    const filterData = {
      search_keyword: event,
      page: 1,
      limit: this.countData.contact_count ? this.countData.contact_count : 5000
    };
    this.popupService.getContacts(filterData).subscribe((response) => {
      this.contacts = response.body.data ? this.utils.augmentMultiselect(response.body.data) : [];
    });
  }

  exportAllData() {
    if(this.filter === 'user') {
      if (!this.selectedUserList || this.selectedUserList.length === 0) {
        const eventData = { type: "EXPORT_ALL_USER" };
        this.userBulkOperation.emit(eventData);
      }
      else {
        this.exportSelectedUser();
      }
    }
    
  }

  getSelectedPropertyName(): any {
    return PropertyTableList.filter((obj) => (obj.value === this.sortModel.property_table))[0];
  }

  exportSelectedServiceProvider() {
    const eventServiceProviderData = {
      id: this.selectedServiceProvidersList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_SERVICE_PROVIDER"
    }
    this.serviceProviderBulkOperation.emit(eventServiceProviderData);
  }

  exportSelectedProgram() {
    const eventProgramData = {
      program_id: this.selectedProgramsList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_PROGRAM"
    }
    this.programBulkOperation.emit(eventProgramData);
  }

  exportSelectedTag() {
    const eventTagData = {
      tags_id: this.selectedTagList.map((obj) => (obj.tag_id)),
      type: "EXPORT_SELECTED_TAG"
    }
    this.tagsBulkOperation.emit(eventTagData);
  }

  exportSelectedTemplate() {
    const eventTemplateData = {
      template_id: this.selectedTemplatesList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_TEMPLATE"
    }
    this.templateBulkOperation.emit(eventTemplateData);
  }
  containers = [
    {
      isActive: false,
    },

  ];
  ShowHide(index) {
    this.containers.forEach((v, i, a) => {
      if (index === i) {
        v.isActive = !v.isActive;
      } else {
        v.isActive = false;
      }
    });
  }

  hideVisibleCard() {
    this.cardActive = !this.cardActive;
  }
  exportSelectedGroup() {
    const eventGroupData = {
      group_id: this.selectedGroupsList.map((obj) => (obj.group_id)),
      type: "EXPORT_SELECTED_GROUP"
    }
    this.groupBulkOperation.emit(eventGroupData);
  }

  exportSelectedTask() {
    const eventTaskData = {
      task_id: this.selectedTasksList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_TASK"
    }

    this.taskBulkOperation.emit(eventTaskData);
  }

  exportSelectedContact() {
    const eventContactData = {
      contact_id: this.selectedContactsList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_CONTACT"
    }
    this.contactBulkOperation.emit(eventContactData);
  }

  exportSelectedTicket() {
    const eventTicketData = {
      ticket_id: this.selectedTicketList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_TICKET"
    }
    this.appService.getUpdatedData(true);
    this.ticketBulkOperation.emit(eventTicketData);
  }

  exportSelectedUser() {
  }

  exportSelectedPlaybook() {
    const eventData = {
      playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_PLAYBOOK"
    }

    this.playbookBulkOperation.emit(eventData);
  }

  bulkOperationsPlaybooksPopup(type: string) {
    this.playbookBulkOpType = type;
    this.open_clone_playbook_popup = true;

    switch (type) {
      case "STATUS":
        this.playbook_is_active = true;
        break;

      case "CLONE":
        this.form_title = `New Form ( ${moment(new Date()).format("LLLL")} ) - Clone`;
        break;

      case "STATE":
        this.playbook_state = "DRAFT";
        break;
    }
  }

  assign() {
    this.assignTo = true;
    this.user = { name: '', id: 0 };
    this.userService.getUsers({ page: 1, limit: this.totalCount }).subscribe(res => {
      this.userData = [];
      this.users = res.data;
      this.users.forEach(element => {
        if (element.is_active && (element.first_name !== "")) {
          let name = '';
          if (element.middle_name) {
            name = `${element.first_name} ${element.middle_name} ${element.last_name}`
          }
          else {
            name = `${element.first_name} ${element.last_name}`
          }
          this.userData.push({
            label: name,
            value: {
              name: name,
              id: element.id
            }
          });
        }
      });
      const assignee = this.profileData.assignee;
      if (assignee) {
        this.user = { name: assignee.name, id: assignee.id };
      }
      if ((this.userData.length === 0) && assignee) {
        this.userData.push({ label: assignee.name, value: { name: assignee.name, id: assignee.id } });
      }
    })
  }

  getGroups(event) {
    const filterData = { search_keyword: event.target.value, page: 1, limit: !event.target.value ? 10 : this.countData.contact_count };
    this.popUpService.getGroups(filterData).subscribe((response) => {
      this.contacts = response.body.data ? this.augmentGroupDropdown(response.body.data) : [];
    });
  }

  augmentGroupDropdown(list) {
    let augmentedData = [];
    augmentedData = list.map((item) => ({
      value: item.id,
      label: `${item.group_name}`,
    }));
    return augmentedData;
  }

  openTagPopup() {
    this.modal.addTag = true;
  }

  openAddNotificationPopup(popupType) {
    this.appService.openNoteHeaderPopup(true);
  }

  openSettingSidebar(key) {
    this.settingSidebar = key;
    this.appService.updateSettingSidebarState(key);
  }

  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    this.openMoreOptionData = false;
    this.active = false;
    this.cardActive = false;
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
