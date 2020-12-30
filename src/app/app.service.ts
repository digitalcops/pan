import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  editPayloadData: {};
  autoFillPropertyData: any;

  updateHeader = new BehaviorSubject({ name: '', count: '' });
  headerSource$ = this.updateHeader.asObservable();

  updateSidebar = new BehaviorSubject(true);
  sidebarSource$ = this.updateSidebar.asObservable();

  sideBarState = new BehaviorSubject(true);
  sideBarStateSource$ = this.sideBarState.asObservable();

  filterSidebar=new Subject<any>();
  filterSidebar$=this.filterSidebar.asObservable();

  roles = new BehaviorSubject({});
  rolesSource$ = this.roles.asObservable();

  socialMediaLinkPopup = new BehaviorSubject(false);
  socialMediaLinkPopup$ = this.socialMediaLinkPopup.asObservable();

  addConnectionPopup = new BehaviorSubject(false);
  addConnectionPopup$ = this.addConnectionPopup.asObservable();

  showAllNotes = new Subject();
  showAllNotes$ = this.showAllNotes.asObservable();

  showAllProviderNotes = new Subject();
  showAllProviderNotes$ = this.showAllProviderNotes.asObservable();

  getData = new Subject<any>();
  getUpdatedData$ = this.getData.asObservable();

  getUpdatedFeatureData = new Subject<any>();
  getUpdatedFeatureData$ = this.getUpdatedFeatureData.asObservable();

  saveTransactionData = new Subject<any>();
  saveTransactionData$ = this.saveTransactionData.asObservable();

  loaderSource = new Subject<any>();
  loaderState$ = this.loaderSource.asObservable();

  editConnection = new BehaviorSubject({});
  editConnection$ = this.editConnection.asObservable();

  customloaderSource = new Subject<any>();
  customloaderState$ = this.customloaderSource.asObservable();

  openMail = new Subject<any>();
  openMail$ = this.openMail.asObservable();

  openCalendar = new Subject<any>();
  openCalendar$ = this.openCalendar.asObservable();

  openSubPlan = new Subject<any>();
  openSubPlan$ = this.openSubPlan.asObservable();

  openSubProduct = new Subject<any>();
  openSubProduct$ = this.openSubProduct.asObservable();
  openSubQuotation = new BehaviorSubject(false);;
  openSubQuotation$ = this.openSubQuotation.asObservable();
  
  updateCalendar = new Subject<any>();
  updateCalendar$ = this.updateCalendar.asObservable();

  openCard= new Subject<any>();
  openCard$ = this.openCard.asObservable();

  openHeaderMail = new Subject<any>();
  openHeaderMail$ = this.openHeaderMail.asObservable();

  openSidebarMail = new Subject<any>();
  openSidebarMail$ = this.openSidebarMail.asObservable();

  openSetting = new Subject<any>();
  openSetting$ = this.openSetting.asObservable();

  openAddTask = new Subject<any>();
  openAddTask$ = this.openAddTask.asObservable();

  openAddTag = new Subject<any>();
  openAddTag$ = this.openAddTag.asObservable();

  openAddGroup = new Subject<any>();
  openAddGroup$ = this.openAddGroup.asObservable();

  openSharedTask = new BehaviorSubject('');
  openSharedTag = new BehaviorSubject('');
  openSharedGroup = new BehaviorSubject('');

  openAddTaskSidebar = new Subject<any>();
  openAddTaskSidebar$ = this.openAddTaskSidebar.asObservable();

  openAddTaskHeader = new Subject<any>();
  openAddTaskHeader$ = this.openAddTaskHeader.asObservable();

  openAddTaskHeaderData = new Subject<any>();
  openAddTaskHeaderData$ = this.openAddTaskHeaderData.asObservable();

  openAddTaskMoreOption = new Subject<any>();
  openAddTaskMoreOption$ = this.openAddTaskMoreOption.asObservable();

  modalSource = new BehaviorSubject(false);
  modalState$ = this.modalSource.asObservable();


  modalStateData = new Subject<any>();
  modalStateData$ = this.modalStateData.asObservable();
  
  propertyPlaceholderSource = new BehaviorSubject('');
  propertyPlaceholderState$ = this.propertyPlaceholderSource.asObservable();

  searchmodalSource = new Subject<any>();
  searchmodalSource$ = this.searchmodalSource.asObservable();

  uploadmodalSource = new Subject<any>();
  uploadmodalSource$ = this.uploadmodalSource.asObservable();

  embedmodalSource = new Subject<any>();
  embedmodalSource$ = this.embedmodalSource.asObservable();

  resetFilterSource = new Subject<any>();
  resetFilterSource$ = this.resetFilterSource.asObservable();

  updateDocSource = new Subject<any>();
  updateDocSource$ = this.updateDocSource.asObservable();

  moreOptionDocSource = new Subject<any>();
  moreOptionDocSource$ = this.moreOptionDocSource.asObservable();

  uploadFolderSource = new Subject<any>();
  uploadFolderSource$ = this.uploadFolderSource.asObservable();

  checkedList = new BehaviorSubject<any>([]);
  email$ = this.checkedList.asObservable();

  notePopup = new Subject<any>();
  notePopup$ = this.notePopup.asObservable();

  updateExterinter = new Subject<any>();
  updateExterinter$ = this.updateExterinter.asObservable();

  noteHeaderPopup = new Subject<any>();
  noteHeaderPopup$ = this.noteHeaderPopup.asObservable();

  noteSidebarFooterPopup = new Subject<any>();
  noteSidebarFooterPopup$ = this.noteSidebarFooterPopup.asObservable();

  taskCheckedList = new Subject<any>();
  task$ = this.taskCheckedList.asObservable();
  
  taskList = new Subject<any>();
  taskList$ = this.taskList.asObservable();  

  selectedContacts = new Subject<any>();
  selectedContacts$ = this.selectedContacts.asObservable();

  getUpdatedEmpData = new BehaviorSubject<any>([]);
  getUpdatedEmpData$ = this.getUpdatedEmpData.asObservable();

  selectedServiceProviders = new Subject<any>();
  selectedServiceProviders$ = this.selectedServiceProviders.asObservable();

  selectedChecklist = new Subject<any>();
  selectedChecklist$ = this.selectedChecklist.asObservable();

  selectedPlaybooks = new Subject<any>();
  selectedPlaybooks$ = this.selectedPlaybooks.asObservable();

  selectedTemplates = new Subject<any>();
  selectedTemplates$ = this.selectedTemplates.asObservable();

  selectedPrograms = new Subject<any>();
  selectedPrograms$ = this.selectedPrograms.asObservable();

  selectedGroups = new Subject<any>();
  selectedGroups$ = this.selectedGroups.asObservable();

  selectedTags = new Subject<any>();
  selectedTags$ = this.selectedTags.asObservable();

  selectedTickets = new Subject<any>();
  selectedTickets$ = this.selectedTickets.asObservable();

  selectedLeadProviders = new Subject<any>();
  selectedLeadProviders$ = this.selectedLeadProviders.asObservable();
  
  selectedTasks = new Subject<any>();
  selectedTasks$ = this.selectedTasks.asObservable();

  contactCheckSource = new BehaviorSubject("init");
  contactDataOnCheck$ = this.contactCheckSource.asObservable();

  serviceProviderCheckSource = new BehaviorSubject("init");
  serviceProviderDataOnCheck$ = this.serviceProviderCheckSource.asObservable();

  checklistCheckSource = new BehaviorSubject([]);
  checklistDataOnCheck$ = this.checklistCheckSource.asObservable();

  taskCheckSource = new Subject<any>();
  taskDataOnCheck$ = this.taskCheckSource.asObservable();

  checkboxSource = new Subject<any>();
  currentStatus$ = this.checkboxSource.asObservable();

  checkboxTemplateSource = new Subject<any>();
  currentTemplateStatus$ = this.checkboxTemplateSource.asObservable();

  checkboxProgramSource = new Subject<any>();
  currentProgramStatus$ = this.checkboxProgramSource.asObservable();

  checkboxTicketSource = new Subject<any>();
  currentTicketStatus$ = this.checkboxTicketSource.asObservable();

  checkboxPropertySource = new Subject<any>();
  checkboxPropertySource$ = this.checkboxPropertySource.asObservable();

  checkboxGroupsSource = new Subject<any>();
  currentGroupsStatus$ = this.checkboxGroupsSource.asObservable();

  checkboxTagsSource = new Subject<any>();
  currentTagsStatus$ = this.checkboxTagsSource.asObservable();

  checkboxTaskSource = new Subject<any>();
  currentTaskStatus$ = this.checkboxTaskSource.asObservable();

  textpopup = new BehaviorSubject<any>(false);
  textpopupSource$ = this.textpopup.asObservable();

  callpopup = new BehaviorSubject<any>(false);
  callpopupSource$ = this.callpopup.asObservable();

  schedulepopup = new BehaviorSubject<any>(false);
  schedulepopupSource$ = this.schedulepopup.asObservable();

  columnspopup = new BehaviorSubject<any>(false);
  columnspopupSource$ = this.columnspopup.asObservable();


  listingmlspopup = new BehaviorSubject<any>(false);
  listingmlspopupSource$ = this.listingmlspopup.asObservable();

  textHeaderpopup = new BehaviorSubject<any>(false);
  textHeaderpopupSource$ = this.textHeaderpopup.asObservable();

  textSidebarpopup = new BehaviorSubject<any>(false);
  textSidebarpopupSource$ = this.textSidebarpopup.asObservable();

  dropDownListSource = new Subject<any>();
  dropDownList$ = this.checkboxSource.asObservable();

  dropDownTaskListSource = new Subject<any>();
  dropDownTaskList$ = this.checkboxTaskSource.asObservable();

  messageList = new Subject<any>();
  message$ = this.messageList.asObservable();

  contactSidebar = new Subject<any>();
  contactSidebarSource$ = this.contactSidebar.asObservable();
  

  contactManagement = new Subject<any>();
  contactManagementSource$ = this.contactManagement.asObservable();
  

  filtercontactSidebar = new Subject<any>();
  filtercontactSidebarSource$ = this.filtercontactSidebar.asObservable();

  filterTransactionSidebar = new Subject<any>();
  filterTransactionSidebarSource$ = this.filterTransactionSidebar.asObservable();

  filterHistorySidebar = new Subject<any>();
  filterHistorySidebarSource$ = this.filterHistorySidebar.asObservable();

  filterServiceProviderSidebar = new Subject<any>();
  filterServiceProviderSidebarSource$ = this.filterServiceProviderSidebar.asObservable();

  filterTeamSidebar = new Subject<any>();
  filterTeamSidebarSource$ = this.filterTeamSidebar.asObservable();


  filterSnippetsSidebar = new Subject<any>();
  filterSnippetsSidebarSource$ = this.filterSnippetsSidebar.asObservable();


  filterDocumentSidebar = new Subject<any>();
  filterDocumentSidebarSource$ = this.filterDocumentSidebar.asObservable();


  serviceSidebar = new Subject<any>();
  serviceSidebarSource$ = this.serviceSidebar.asObservable();

  propertyDetailSidebar = new Subject<any>();
  propertyDetailSidebar$ = this.propertyDetailSidebar.asObservable();

  createHTMLSidebar = new Subject<any>();
  createHTMLSource$ = this.createHTMLSidebar.asObservable();

  settingSidebarData = new Subject<any>();
  settingSidebarDataSource$ = this.settingSidebarData.asObservable();

  playbookSidebarData = new Subject<any>();
  playbookSidebarDataSource$ = this.playbookSidebarData.asObservable();

  contactProfileSource = new Subject<any>();
  contactProfile$ = this.contactProfileSource.asObservable();

  updateFilterSidebarProfile = new Subject<any>();
  updateFilterSidebarProfile$ = this.updateFilterSidebarProfile.asObservable();

  serviceProfileSource = new Subject<any>();
  serviceProfile$ = this.serviceProfileSource.asObservable();

  taskProfileSource = new Subject<any>();
  taskProfile$ = this.taskProfileSource.asObservable();

  updateUserNameValue = new Subject<any>();
  updateUserNameValueSource$ = this.updateUserNameValue.asObservable();

  connectionMode = new BehaviorSubject('');
  connectionMode$ = this.connectionMode.asObservable();

  tagData = new Subject<any>();
  tagData$ = this.tagData.asObservable();

  groupsData = new Subject<any>();
  groupsData$ = this.groupsData.asObservable();

  groupsDataOption = new Subject<any>();
  groupsData$Option = this.groupsDataOption.asObservable();

  refreshContacts = new Subject<any>();
  refreshContacts$ = this.refreshContacts.asObservable();

  refreshServiceProviders = new Subject<any>();
  refreshServiceProviders$ = this.refreshServiceProviders.asObservable();

  pageData = new Subject<any>();
  pageData$ = this.pageData.asObservable();

  getContactData = new Subject<any>();
  getContactData$ = this.getContactData.asObservable();

  getListingData = new Subject<any>();
  getListingData$ = this.getListingData.asObservable();
  
  addedContactForTransaction = new Subject<any>();
  addedContactForTransaction$ = this.addedContactForTransaction.asObservable();

  addedCompanyForTransaction = new Subject<any>();
  addedCompanyForTransaction$ = this.addedCompanyForTransaction.asObservable();

  getServiceProviderData = new Subject<any>();
  getServiceProviderData$ = this.getServiceProviderData.asObservable();

  countSource = new BehaviorSubject({});
  countSource$ = this.countSource.asObservable();

  taskRowData = new BehaviorSubject({});
  taskRowData$ = this.taskRowData.asObservable();

  updateProperyData = new BehaviorSubject<any>(null);
  updateProperyDataSource$ = this.updateProperyData.asObservable();

  templateCountSource = new BehaviorSubject({});
  templateCount$ = this.templateCountSource.asObservable();

  addConnetion = new BehaviorSubject<any>([]);
  addConnetion$ = this.addConnetion.asObservable();

  editStatus = new Subject<any>();
  editStatusSource$ = this.editStatus.asObservable();

  popupData = new BehaviorSubject(false);
  updatePopupData$ = this.popupData.asObservable();

  propertyFormSave = new Subject<any>();
  propertyFormSave$ = this.propertyFormSave.asObservable();

  transactionFormSave = new Subject<any>();
  transactionFormSave$ = this.transactionFormSave.asObservable();

  transactionFieldState = new Subject<any>();
  transactionFieldStateSource$ = this.transactionFieldState.asObservable();

  transactionMetaData = new Subject<any>();
  transactionMetaData$ = this.transactionMetaData.asObservable();

  updateAddTransData = new Subject<any>();
  updateAddTransData$ = this.updateAddTransData.asObservable();

  notificationForEditData = new Subject<any>();
  notificationForEditData$ = this.notificationForEditData.asObservable();

  propertyImagesList = new Subject<any>();
  propertyImagesListSource$ = this.propertyImagesList.asObservable();

  resetPropertyFilter = new Subject<any>();
  resetPropertyFilterSource$ = this.resetPropertyFilter.asObservable();

  changePropType = new Subject<any>();
  changePropTypeSource$ = this.resetPropertyFilter.asObservable();

  programGroup = new Subject<any>();
  programGroup$ = this.programGroup.asObservable();

  errorFormList = new Subject<any>();
  errorFormListSource$ = this.errorFormList.asObservable();

  propertySidebarData = new Subject<any>();
  propertySidebarDataSource$ = this.propertySidebarData.asObservable();

  filterPropertyData = new Subject<any>();
  filterPropertyDataSource$ = this.filterPropertyData.asObservable();

  fromEmployeeTable = new BehaviorSubject<any>(null);
  fromEmployeeTableSource$ = this.fromEmployeeTable.asObservable();

  _autoFillPropertyData = new Subject<any>();
  autoFillPropertyDataSource$ = this._autoFillPropertyData.asObservable();

  notesAdded = new Subject<any>();
  notesAdded$ = this.notesAdded.asObservable();

  selectedDataAdded = new BehaviorSubject("init");
  selectedDataAdded$ = this.selectedDataAdded.asObservable();
  updateTableCategories = new Subject<any>();
  updateTableCategories$ = this.updateTableCategories.asObservable();
  
  constructor() { }

  updateNotesAdded(data) {
    this.notesAdded.next(data);
  }

  updateSelectedDataAdded(data) {
    this.selectedDataAdded.next(data);
  }

  updateErrorFormList(data) {
    this.errorFormList.next(data);
  }

  updateAutoFillPropertyData(data) {
    this._autoFillPropertyData.next(data);
  }

  updatefilterPropertyData(data) {
    this.filterPropertyData.next(data);
  }

  updateFromEmployeeTable(data) {
    this.fromEmployeeTable.next(data);
  }

  updatePopertySidebarData(data) {
    this.propertySidebarData.next(data);
  }
  updateProperyDataList(data) {
    this.updateProperyData.next(data);
  }

  resetPropertyFilterData() {
    this.resetPropertyFilter.next();
  }

  updatePropTypeData(data) {
    this.changePropType.next(data);
  }

  updateTemplateCount(count) {
    this.templateCountSource.next(count);
  }

  updatePropertyImageList(image_list) {
    this.propertyImagesList.next(image_list);
  }

  savePropertyForm(event_type) {
    this.propertyFormSave.next(event_type);
  }

  saveTransactionForm(event_type) {
    this.transactionFormSave.next(event_type);
  }


  updateTransactionFormState() {
    this.transactionFieldState.next();
  }

  updateTransactionMetaData() {
    this.transactionMetaData.next();
  }

  updateUpdateAddTransData(data) {
    this.updateAddTransData.next(data);
  }

  updateNotificationForEditData() {
    this.notificationForEditData.next();
  }

  editConnectionData(data) {
    this.editConnection.next(data);
  }

  addConnectionData(data) {
    this.addConnetion.next(data);
  }

  updateConnectionMode(mode) {
    this.connectionMode.next(mode);
  }

  openSocialMediaLinkPopup(state) {
    this.socialMediaLinkPopup.next(state);
  }

  updateCount(count) {
    this.countSource.next(count);
  }

  updateTagsData(data) {
    this.tagData.next(data);
  }

  openAddConnection(state) {
    this.addConnectionPopup.next(state);
  }

  openScheduleOption(state) {
    this.programGroup.next(state);
  }

  updatePageData(data) {
    this.pageData.next(data);
  }

  refreshAllContacts(data) {
    this.refreshContacts.next(true);
  }

  refreshAllServices(data) {
    this.refreshServiceProviders.next(true);
  }

  updateGroupsData(data) {
    this.groupsData.next(data);
  }

  updateGroupsOptionData(data) {
    this.groupsDataOption.next(data);
  }

  updateContactProfile(data) {
    this.contactProfileSource.next(data);
  }
  updateFilterSidebar(data) {
    this.updateFilterSidebarProfile.next(data);
  }

  updateServiceProfile(data) {
    this.serviceProfileSource.next(data);
  }

  showAllContactNotes(data) {
    this.showAllNotes.next(data);
  }

  showAllServiceProviderNotes(data) {
    this.showAllProviderNotes.next(data);
  }

  updateTasksProfile(data) {
    this.taskProfileSource.next(data);
  }

  updateSidebarState(state) {
    this.contactSidebar.next(state);
  }
  updateManagementState(state) {
    this.contactManagement.next(state);
  }
  updateFilterSidebarState(state) {
    this.filtercontactSidebar.next(state);
  }
  updateTransactionSidebarState(state) {
    this.filterTransactionSidebar.next(state);
  }
  updateHistorySidebarState(state) {
    this.filterHistorySidebar.next(state);
  }
 
  updateServiceProviderSidebarState(state) {
    this.filterServiceProviderSidebar.next(state);
  }
  updateTeamSidebarState(state) {
    this.filterTeamSidebar.next(state);
  }
  updateSnippetsSidebarState(state) {
    this.filterSnippetsSidebar.next(state);
  }

  updateDocumentSidebarState(state) {
    this.filterDocumentSidebar.next(state);
  }
  
  updateServiceSidebarState(state) {
    this.serviceSidebar.next(state);
  }

  updatePropertyDetailSidebarState(state) {
    this.propertyDetailSidebar.next(state);
  }

  updateCreateHTMLState(state) {
    this.createHTMLSidebar.next(state);
  }

  updateSettingSidebarState(state) {
    this.settingSidebarData.next(state);
  }

  updatePlaybookSidebarState(state) {
    this.playbookSidebarData.next(state);
  }

  updateModalState(state) {
    this.modalSource.next(state);
  }

  updatePlaceholderText(text) {
    this.propertyPlaceholderSource.next(text);
  }

  updateSearchState(state) {
    this.searchmodalSource.next(state);
  }

  uploadImageState(state){
    this.uploadmodalSource.next(state);
  }

  embedImageState(state){
    this.embedmodalSource.next(state);
  }
  
  resetFilterState(data){
    this.resetFilterSource.next(data);
  }
  onUpdateDocSource(data){
    this.updateDocSource.next(data);
  }

  onMoreOptionDocSource(data){
    this.moreOptionDocSource.next(data);
  }
  
  uploadFolderState(state){
    this.uploadFolderSource.next(state);
  }
  updateView(state) {
    this.sideBarState.next(state);
  }

  updateUserNameValues(name) {
    this.updateUserNameValue.next(name);
  }

  updateHeaderName(pageObj) {
    this.updateHeader.next(pageObj);
  }

  updateSidebarView(state) {
    this.updateSidebar.next(state);
  }

  updateRoles(rolesList) {
    this.roles.next(rolesList);
  }

  getUpdatedData(state) {
    this.getData.next(state);
  }
  openfilterSidebar(data){
    this.filterSidebar.next(data);
  }

  getUpdatedFeatureMetaData(data) {
    this.getUpdatedFeatureData.next(data);
  }

  updateSaveTransactionData(data) {
    this.saveTransactionData.next(data);
  }

  getUpdatedContactData(state) {
    this.getContactData.next(state);
  }

  getUpdatedDataProperty(data){
     this.getListingData.next(data);
  }

  onContactAdded(data) {
    this.addedContactForTransaction.next(data);
  }

  onCompanyAdded(data) {
    this.addedCompanyForTransaction.next(data);
  }

  getUpdatedServiceProviderData(state) {
    this.getServiceProviderData.next(state);
  }

  openNotePopup(state) {
    this.notePopup.next(state);
  }

  updatepropertyType(state){
    this.updateExterinter.next(state);
  }

  openNoteHeaderPopup(state) {
    this.noteHeaderPopup.next(state);
  }

  openNoteSidebarFooterPopup(state) {
    this.noteSidebarFooterPopup.next(state);
  }

  updateContactData(data) {
    this.contactCheckSource.next(data);
  }

  updateServiceProviderData(data) {
    this.serviceProviderCheckSource.next(data);
  }

  updateChecklistData(data) {
    this.checklistCheckSource.next(data);
  }

  updateTaskData(data) {
    this.taskCheckSource.next(data);
  }

  DropDownList(data) {
    this.dropDownListSource.next(data);
  }

  DropDownTaskList(data) {
    this.dropDownTaskListSource.next(data);
  }

  openMessagePopUp(state) {
    this.textpopup.next(state);
  }
  openCallPopUp(state) {
    this.callpopup.next(state);
  }
  openSchedulePopUp(state) {
    this.schedulepopup.next(state);
  }
  openColumnsPopUp(state) {
    this.columnspopup.next(state);
  }

  searchMlsListingPopUp(state) {
    this.listingmlspopup.next(state);
  }
  
  openMessageSidebarPopUp(state) {
    this.textSidebarpopup.next(state);
  }

  openMessageHeaderPopUp(state) {
    this.textHeaderpopup.next(state);
  }

  openMailPopup(data) {
    this.openMail.next(data);

  }
  openCalendarPopup(data) {
    this.openCalendar.next(data);
  }
  updateCalendarPopup(data) {
    this.updateCalendar.next(data);
  }
  updateSubPlanPopup(data) {
    this.openSubPlan.next(data);
  }
  updateSubProductPopup(data) {
    this.openSubProduct.next(data);
  }
  updateSubQuotationPopup(data) {
    this.openSubQuotation.next(data);
  }
  openCardPopup(data) {
    this.openCard.next(data);
  }
  openMailHeaderPopup(data) {
    this.openHeaderMail.next(data);
  }

  openMailSidebarPopup(data) {
    this.openSidebarMail.next(data);
  }

  openSettingSidebar(data) {
    this.openSetting.next(data);
  }

  /*
  For Select All Checkbox
  */
  getCheckboxValue(value) {
    this.checkboxSource.next(value);
  }

  getTemplateCheckboxValue(value) {
    this.checkboxTemplateSource.next(value);
  }

  getProgramCheckboxValue(value) {
    this.checkboxProgramSource.next(value);
  }

  getTicketCheckboxValue(value) {
    this.checkboxTicketSource.next(value);
  }

  getProvidersCheckboxValue(value) {
    this.checkboxPropertySource.next(value);
  }
  

  getGroupsCheckboxValue(value) {
    this.checkboxGroupsSource.next(value);
  }

  getTagsCheckboxValue(value) {
    this.checkboxTagsSource.next(value);
  }

  getTaskCheckboxValue(value) {
    this.checkboxTaskSource.next(value);
  }

  openAddTaskPopup(data) {
    this.openAddTask.next(data);
  }

  openAddTagPopup(data) {
    this.openAddTag.next(data);
  }

  openAddGroupPopup(data) {
    this.openAddGroup.next(data);
  }
  
  openAddTaskSidebarPopup(data) {
    this.openAddTaskSidebar.next(data);
  }

  openAddTaskHeaderPopup(data) {
    this.openAddTaskHeader.next(data);
  }

  openAddTaskHeaderDataPopup(data) {
    this.openAddTaskHeaderData.next(data);
  }

  openAddTaskMorePopup(data) {
    this.openAddTaskMoreOption.next(data);
  }

  updateTaskRowData(data) {
    this.taskRowData.next(data);
  }

  /**
   * To show hide main loader
   * @param loading loader value to be broadcasted
   */
  showLoader(loading: boolean) {
    this.loaderSource.next(loading);
  }

  /**
   * To show hide custom loader
   * @param loading loader value to be broadcasted
   */
  showCustomLoader(loading: boolean) {
    this.customloaderSource.next(loading);
  }

  updateMessageList(data) {
    this.messageList.next(data);
  }

  updateSelectedContacts(data) {
    this.selectedContacts.next(data);
  }

  updateGetUpdatedEmpData() {
    this.getUpdatedEmpData.next(true);
  }

  updateSelectedServiceProviders(data) {
    this.selectedServiceProviders.next(data);
  }

  updateSelectedChecklist(data) {
    this.selectedChecklist.next(data);
  }

  updateSelectedPlaybooks(data) {
    this.selectedPlaybooks.next(data);
  }

  updateSelectedTemplates(data) {
    this.selectedTemplates.next(data);
  }

  updateSelectedPrograms(data) {
    this.selectedPrograms.next(data);
  }

  updateSelectedGroups(data) {
    this.selectedGroups.next(data);
  }

  updateSelectedTags(data) {
    this.selectedTags.next(data);
  }

  updateSelectedTickets(data) {
    this.selectedTickets.next(data);
  }

  updateSelecteProviders(data) {
    this.selectedLeadProviders.next(data);
  }

  updateSelectedTasks(data) {
    this.selectedTasks.next(data);
  }

  updateCheckedList(data) {
    this.checkedList.next(data);
  }

  updateTaskedCheckedList(data) {
    this.taskList.next(data);
  }

  /**
   * Enable EditMode
   */
  enableEditMode(status) {
    this.editStatus.next(status);
  }

  sendPopupData(status) {
    this.popupData.next(status);
  }
  
  updateCategories(val) {
    this.updateTableCategories.next(val);
  }
}
