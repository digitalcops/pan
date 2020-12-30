import { Utils } from './../../utils';
import { CalendarLocalePlaybook, SortModel } from './../../shared/filter/filter.model';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { AppService } from './../../app.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SlidePanelAnimation } from './../../shared/animations/animations';
import { Component, OnInit, HostListener, Output, EventEmitter, TemplateRef, Input, OnDestroy } from '@angular/core';
import { PopUpService } from '../../shared/pop-up/pop-up.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../user-accounts/user.service';
import { InitialService } from '../../initial/initial.service';
import { SharedService } from '../../shared/shared.service';
import { ContactService } from './../../contacts/contact.service';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { PropertyTableList } from '../../shared/shared.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppExService } from './../../app-ex.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss', '../../../assets/stylesheets/form.scss'],
  animations: SlidePanelAnimation,
})
export class ContactProfileComponent implements OnInit, OnDestroy {
  listDragAccodiansPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  modalRef: BsModalRef;
  profileSection = false;
  overlay = false;
  sortModel: SortModel;
  addTicketsLink = false;
  popupData = null;
  settingSidebar = false;
  profileData: any;
  selectedTasksList: Array<any> = [];
  profileSubscription: Subscription;
  openSocialMedialLinkSubs: Subscription;
  updatePlaybookSubscription: Subscription;
  profileDataSubscription: Subscription;
  countSubs: Subscription;
  showTaskPoupSubs: Subscription;
  addConnectionSubs: Subscription;
  addSocialMediaLink = false;
  addConnection = false;
  showTaskPoup = false;
  selectedTemplatesList: Array<any> = [];
  checked1 = false;
  selectedGroupsList: Array<any> = [];
  userDetails: any;
  pageTitle = 'Premier Agent Network';
  noteText = '';
  showData = 'all';
  tagsData: any = [];
  selectedTagList: Array<any> = [];
  selectedServiceProvidersList: Array<any> = [];
  taskMode: string;
  selectedContactsList: Array<any> = [];
  allAssociatedContacts: Array<any> = [];
  contactsSubscription: Subscription;
  filesList: Array<any> = [];
  agentFileList: Array<any> = [];
  tasksList: Array<any> = [];
  selectedFileName: string;
  selectedAgentFileName: string;
  tags: any;
  assignTagPopup = false;
  assignGroupPopup = false;
  PlaybookFormPopup = false;
  assignTo = false;
  tagEvent: any;
  newTag = false;
  length: number;
  userData: any;
  assignPlaybookPopup = false;
  users: any;
  contactIdArr = [];
  group: any = '';
  groupsData: any = [];
  contactData: Array<any> = [];
  pageData = {};
  totalCount: any;
  user: any;
  selectedProgramsList: Array<any> = [];
  selectedPlaybooksList: Array<any> = [];
  @Input() filter;
  @Output() programBulkOperation = new EventEmitter<any>();
  @Output() exportSelectedTransaction = new EventEmitter<any>();
  sampleOptions: { label: string; value: string; }[];
  playbookFormsList: Array<any> = [];
  @Output() templateBulkOperation = new EventEmitter<any>();
  selectedPlaybookID = 0;
  addPlaybookModel: any = {};
  ticketList: Array<any> = [];
  selectedTicketList: Array<any> = [];
  SearchCountryField = SearchCountryField;
  countryISO = CountryISO;
  preferredCountries: CountryISO[] = [this.countryISO.UnitedStates, this.countryISO.UnitedKingdom];
  en = CalendarLocalePlaybook;
  dateRange: Date;
  dateText = '';
  callCount = 0;
  @Output() exportPropertyTable = new EventEmitter<any>();
  @Output() tagsBulkOperation = new EventEmitter<any>();
  @Output() groupBulkOperation = new EventEmitter<any>();
  @Output() taskBulkOperation = new EventEmitter<any>();
  @Output() contactBulkOperation = new EventEmitter<any>();
  @Output() ticketBulkOperation = new EventEmitter<any>();
  @Output() importData = new EventEmitter<any>();
  @Output() playbookBulkOperation = new EventEmitter<any>();
  @Output() serviceProviderBulkOperation = new EventEmitter<any>();
  model: any = {
    description: 'App Description...',
    theme: {
      bgColor: "ffffff",
      textColor: "555555",
      bannerImage: ""
    },
    attributes: []
  };

  autoComplete = "autocomplete";

  constructor(
    readonly modalService: BsModalService,
    public appService: AppService,
    public popUpService: PopUpService,
    public messageService: MessageService,
    public userService: UserService,
    public initialService: InitialService,
    public httpclient: HttpClient,
    public shareService: SharedService,
    public contactService: ContactService,
    public utils: Utils,
    public appExService: AppExService,
  ) { }

  ngOnInit() {
    this.contactsSubscription = this.appService.selectedContacts.subscribe(res => {
      this.length = res.length;
      this.selectedContactsList = res;
    });
    this.sampleOptions = [{ label: 'Everyone', value: 'everyone' }, { label: 'My Brokers', value: 'brokers' },
    { label: 'My Agents', value: 'agents' }, { label: 'Only Me', value: 'me' }
    ];
    this.profileSubscription = this.appService.contactSidebarSource$.subscribe((state: any) => {
      if (state) {
        const conSeq = localStorage.getItem('conSeqSide');
        if(conSeq !== null && conSeq !== '') {
          this.listDragAccodiansPos = JSON.parse(conSeq);
        }
        this.profileSection = true;
        this.overlay = true;
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        this.addScroll();
      }
    });
    this.profileDataSubscription = this.appService.contactProfile$.subscribe((profile) => {
      if (profile) {
        this.loadPageData(profile);
      }
    });
    this.loadSubssocialData();
    this.addConnectionSubs = this.appService.addConnectionPopup
      .subscribe(state => {
        this.addConnection = state;
      })
  }

  updateModalState(state) {
    this.addTicketsLink = state;
    if(state) {
      this.popupData = {category_type: "Contacts", id:[this.profileData.id]};
      this.appService.sendPopupData(this.popupData);
    }
    else {
      this.getSingleUserTicketData();
    }
  }

  getSingleUserTicketData() {
    this.contactService.getSingleUserTicketData(this.profileData.id, 'Contacts').subscribe((res => {
      this.ticketList = res.data;
    }))
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.listDragAccodiansPos, event.previousIndex, event.currentIndex);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  loadSubsData() {
    this.tagList();
    this.popUpService.getGroups().subscribe(res => {
      this.group = this.profileData.group.map((obj) => obj.id);
      this.groupsData = [];
      res.body.data.forEach((group, i) => {
        if (group.is_active === true) {
          this.groupsData.push({ label: group.group_name, value: group.id });
        }
      });
    })
    this.initialService.getCount().subscribe((response) => {
      this.totalCount = response.data.user_count;
    });
    this.addConnectionSubs = this.appService.addConnectionPopup
      .subscribe(state => {
        this.addConnection = state;
      })
    this.loadTaskPopup();
  }

  loadSubssocialData() {
    this.openSocialMedialLinkSubs = this.appService.socialMediaLinkPopup
      .subscribe(state => {
        this.addSocialMediaLink = state;
      })
  }

  loadPageData(profile) {
    this.callCount = 0;
    this.group = [];
    this.profileData = profile;
    this.profileData.mobile = profile.mobile.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1-");
    const selectedGroup = this.groupsData.filter((obj) => obj.value === this.profileData.groupId);
    if (selectedGroup[0]) {
      this.profileData.group = [{ id: selectedGroup[0].value, group: selectedGroup[0].label }];
    }
    this.group = this.profileData.group.map((obj) => obj.id);
    this.profileData.associatedPlaybook = [];
    this.loadSubsData();
    this.getTaskForContact();
    this.getSingleUserTicketData();
    this.getFilesForContact();
    this.getUserDetails();
    this.getContactPlaybook();
    this.contactIdArr = [];
    this.profileData.tag_name.forEach(tag => {
      this.contactIdArr.push(tag.id);
    })
  }

  /* To load task popup
  */
  loadTaskPopup() {
    this.countSubs = this.appService.countSource.subscribe((res) => {
      this.contactService.getContacts({ page: 1, limit: res['contact_count'] })
        .subscribe((response) => {
          this.contactData = response.body.data ? response.body.data : [];
          this.allAssociatedContacts = [];
          this.contactData.forEach((contact, i) => {
            this.allAssociatedContacts.push({
              id: contact.id,
              itemName: (contact.middle_name ?
                `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.middle_name} ${contact.last_name}`
                : `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.last_name}`) + " " + `(${contact.phone})`,
            });
          });
        });
    });
    this.showTaskPoupSubs = this.appService.openAddTask.subscribe(res => {
      this.taskMode = res;
      this.showTaskPoup = (res === 'SAVE' || res === 'UPDATE') ? true : false;
    });
  }

  tagList() {
    this.popUpService.getTagsList().subscribe(res => {
      this.tags = res.body.data ? this.augmentTags(res.body.data) : [];
    })
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
    if (this.profileDataSubscription) {
      this.profileDataSubscription.unsubscribe();
    }
    if (this.openSocialMedialLinkSubs) {
      this.openSocialMedialLinkSubs.unsubscribe();
    }
    if (this.addConnectionSubs) {
      this.addConnectionSubs.unsubscribe();
    }
    this.updatePlaybookSubscription && this.updatePlaybookSubscription.unsubscribe();
    this.profileSection = false;
    this.overlay = false;
    this.appExService.callActivityData = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    if (event.target.closest('.overlay') && !event.target.closest('.profileSection')) {
      this.profileSection = !this.profileSection;
      this.overlay = !this.overlay;
      this.addScroll();
    }
  }

  augmentTags(tags) {
    let updatedData = [];
    updatedData = tags.map((tag) => ({
      id: tag.id,
      value: tag.tag_name
    }));
    return updatedData;
  }

  /**
   * To Add scrollbar in the body
   */
  addScroll() {
    localStorage.setItem('conSeqSide', JSON.stringify(this.listDragAccodiansPos));
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  assignTag() {
    this.assignTagPopup = true;
  }

  onTagAdd(event) {
    const tagExist = this.tags.some((tag) => tag.value === event.display);
    if (!tagExist) {
      this.tagEvent = event;
      this.addTag({ name: event.display });
      this.newTag = false;
    }
  }

  onTagRemove(e) {
  }

  getCountOperation(event) {
    this.callCount = event;
  }

  dontAddTag() {
    const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === this.tagEvent.display);
    this.tagsData.splice(recentTagIndex, 1);
    this.newTag = false;
  }
  addTagToList() {
    this.addTag({ name: this.tagEvent.display });
    this.newTag = false;
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
    }, (serverError) => {
      if (typeof serverError.error.message === "object") {
        const message = serverError.error.message;
        for (const key in message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message[key] });
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      }
      const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === tagName.tag_name);
      const tagIndex = this.tags.findIndex((tag) => tag.value === tagName.tag_name);
      this.tagsData.splice(recentTagIndex, 1);
      this.tags.splice(tagIndex, 1);
    });
  }

  /**
   * To get tasks for contact
   */
  getFilesForContact() {
    this.contactService.getFiles(this.profileData.id).subscribe(res => {
      this.filesList = res.data;
    })
  }

  updateTags() {
    this.tagsData.forEach(tag => {
      this.contactIdArr.push(tag.id);
      this.profileData.tag.push({ id: tag.id, tag: tag.display })
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

  assignGroup() {
    this.groupsData = this.popUpService.repositionGroup(this.groupsData, this.profileData.group);
    this.group = this.profileData.group.map((obj) => obj.id);
    this.assignGroupPopup = true;
  }

  assignPlaybook() {
    this.assignPlaybookPopup = true;
    this.selectedPlaybookID = 0;
    this.model.attributes = [];
    this.model.is_editing = false;
    this.getPublishedPlaybookFormData();
  }

  updateGroup() {
    const data = {
      contact_id: this.profileData.id,
      groups: this.group
    }
    this.popUpService.updateTags(data).subscribe(res => {
      this.assignGroupPopup = false;
      this.profileData.group = [];
      this.group.forEach(id => {
        const data = this.groupsData.filter((obj) => obj.value === id)[0];
        this.profileData.group.push({ id: data.value, group: data.label });
      });
      this.profileData.groupLabel = this.profileData.group.map(obj => obj.group).join(", ");
      this.appService.refreshAllContacts(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Group updated successfully' });
      this.group = [];
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    })
  }

  removeTag(tag) {
    const index = this.contactIdArr.findIndex(id => tag.id === id);
    this.contactIdArr.splice(index, 1);
    this.profileData['tag_name'].splice(index, 1);
    const data = {
      contact_id: this.profileData.id,
      tags: this.contactIdArr
    }
    this.popUpService.updateTags(data).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag removed successfully' });
    })
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
              name,
              id: element.id
            }
          });
        }
      });
      const assignee = this.profileData.assignee;
      if (assignee) { this.user = { name: assignee.name, id: assignee.id }; }
      if ((this.userData.length === 0) && assignee) { this.userData.push({ label: assignee.name, value: { name: assignee.name, id: assignee.id } }); }
    })
  }

  unAssignGroup(i) {
    this.profileData.group.splice(i, 1);
    const data = { contact_id: this.profileData.id, groups: this.profileData.group.map((obj) => obj.id) };
    this.popUpService.updateTags(data).subscribe(res => {
      this.profileData.groupLabel = this.profileData.group.map(obj => obj.group).join(", ");
      this.assignGroupPopup = false;
      this.appService.refreshAllContacts(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Group unassigned successfully' });
      this.group = '';
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went wrong' });
    })
  }

  print() {
    this.pageData['name'] = `${this.pageTitle} ${this.pageData['name']}`;
    this.shareService.updatePageTitle(this.pageData['name']);
  }

  updateUser() {
    const data = {
      contact_id: this.profileData.id,
      assigned_to: this.user.id,
      assigned_name: this.user.name
    }
    this.popUpService.updateTagsPatch(data).subscribe(res => {
      this.assignTo = false;
      this.profileData['assignee'] = { name: this.user.name, id: this.user.id };
      this.appService.getUpdatedContactData(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User assigned successfully' });
      this.user = '';
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went wrong' });
    })
  }

  /**
   * To get social media link
   * @param e for object
   */
  getSocialMediaLink(e) {
    this.profileData.social_media_links.unshift(e);
  }

  /**
   * To add connection
   */
  addConnections() {
    this.addConnection = true;
    this.appService.addConnectionData(this.profileData.connections)
    this.appService.updateConnectionMode('ADD');
  }

  /**
   * To edit connection
   * @param connectionIndex as index
   */
  editConnection(connectionIndex) {
    this.addConnection = true;
    this.appService.editConnectionData(this.profileData.connections[connectionIndex]);
    this.appService.updateConnectionMode('EDIT');
  }

  /**
   * To delete connection
   * @param index as index
   */
  deleteConnection(index, connId) {
    this.contactService.deleteConnection(connId).subscribe(res => {
      this.profileData.connections.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Connection deleted successfully' });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    })
  }

  /**
   * To get tasks for contact
   */
  getTaskForContact() {
    this.contactService.getTasks(this.profileData.id, 'Contacts').subscribe(res => {
      this.tasksList = res.data;
    })
  }

  /**
   * To get details for user
   */
  getUserDetails(): void {
    this.contactService.getUserDetail(this.profileData.id).subscribe((response: any) => {
      this.profileData["comment"] = response ? response.data.comment : [];
      this.profileData["tag"] = response ? response.data.tag : [];
      this.profileData["connections"] = response ? response.data.connections : [];

      this.profileData["social_media_links"] = response ? response.data.social_media_links : [];
    })
  }

  /**
   *  opening add and update task popup
   *  select role
   */
  openAddPopUp() {
    this.appService.openAddTaskPopup('SAVE');
  }

  /**
   *  edit task
   * @param i for index
   */
  editTask(i) {
    this.appService.openAddTaskPopup('UPDATE');
    this.appService.updateTaskRowData(this.tasksList[i]);
  }

  /**
   * On file select
   * @param event Input event
   */
  onFileSelect(event) {
    this.selectedFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('filename', this.selectedFileName.substring(0, this.selectedFileName.lastIndexOf(".")));
    formData.append('inside_location', 'contact_attachments');
    formData.append('contact_id', this.profileData.id);
    if (event.target.files[0].size > 20000000) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size should not exceeds by 20mb' });
      return;
    }
    this.httpclient.post<any>(config.uploadConatctFile, formData).subscribe((response) => {
      const fileObj = {
        documents_name: this.selectedFileName,
        url: response.url,
        id: response.id
      }
      this.filesList.unshift(fileObj);
      this.getFilesForContact();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
  }

  /**
   * To get task as event from child
   * @param e
   */
  getTaskData(e) {
    if (e) {
      this.getTaskForContact();
    }
  }

  /**
   * To delete file
   */
  deleteFile(id, index) {
    this.contactService.deleteAttachment({ id }).subscribe(res => {
      this.filesList.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File deleted successfully' });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong in deleting file' });
    })
  }
  /**
     * To save note
     */
  saveNote() {
    const data = {
      comment: this.noteText,
      contact_id: [this.userDetails.id]
    };
  }

  getPublishedPlaybookFormData() {
    this.updatePlaybookSubscription = this.contactService.getPublishedPlaybookFormData().subscribe((response) => {
      if (response) {
        const { data } = response;
        this.playbookFormsList = [];
        data.forEach((obj) => {
          this.playbookFormsList.push({
            value: obj.id,
            label: obj.title
          })
        })
      }
    });
  }

  openPlaybookFormPopup() {
    this.getPlaybookData(this.selectedPlaybookID);
  }

  /**
   * To get Template Data
   * @param templateId Selected Template Id
   */
  getPlaybookData(playbookId) {
    this.contactService.getPlaybookFromID(playbookId).subscribe((response) => {
      if (response) {
        const {
          playbook_form_fields_data,
          title,
        } = response.data;
        this.model.form_name = title;
        this.model.attributes = playbook_form_fields_data;
        this.model.addition = true;
        this.PlaybookFormPopup = true;
        this.assignPlaybookPopup = false;
        this.model.attributes.forEach((element, index) => {
          this.model.attributes[index].controlValue = null;
        });
        this.mapFormValues();
      }
    });
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }

  submit() {
  }

  /**
  * On file select
  * @param event Input event
  */
  onFileSelectAgentForm(event, type, index) {
    const selectedAgentFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('filename', selectedAgentFileName.substring(0, selectedAgentFileName.lastIndexOf(".")));
    formData.append('inside_location', 'contact_attachments');
    formData.append('contact_id', this.profileData.id);
    if (event.target.files[0].size > 2000000) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size should not exceeds by 2mb' });
      return;
    }
    this.httpclient.post<any>(config.uploadConatctFile, formData).subscribe((response) => {
      this.updateValue(index, response.url, type);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
  }

  updateValue(index = 0, data: any, type = "") {
    switch (type) {
      case "radio":
        this.model.attributes[index].controlValue = data;
        break;
      case "file":
        this.model.attributes[index].controlValue = data;
        break;
      case "text":
      case "email":
      case "phone":
      case "number":
      case "date":
      case "datetime-local":
      case "textarea":
        this.model.attributes[index].controlValue = data.target.value;
        break;
      case this.autoComplete:
        this.model.attributes[index].controlValue = data;
        break;
      case "checkbox":
        this.model.attributes[index].controlValue = [];
        break;
    }
  }

  validateAgentAnswers(): boolean {
    this.model.attributes.forEach((element, index) => {
      if (element.required) {
        switch (element.type) {
          case "radio":
          case this.autoComplete:
            {
              if (element.controlValue && element.controlValue.length > 0) {
                element.showError = false;
              }
              else {
                element.showError = true;
              }
              break;
            }
          case "checkbox":
            {
              const controlValue = [];
              element.values.forEach((ele, chkIdx) => {
                if (ele.checked) {
                  controlValue.push({ value: ele.value, label: ele.label });
                }
              });
              if (element.controlValue.length > 0) {
                element.showError = false;
              }
              else {
                element.showError = true;
              }
              break;
            }
          case "email":
          case "file":
          case "phone":
          case "number":
          case "date":
          case "datetime-local":
          case "textarea":
            {
              if (element.controlValue) {
                element.showError = false;
              }
              else {
                element.showError = true;
              }
              break;
            }
          case "text":
            {
              if (element.controlValue && element.controlValue.trim() !== '') {
                element.showError = false;
              }
              else {
                element.showError = true;
              }
              break;
            }
        }
      }
    });
    const attributes = this.model.attributes;
    const len = attributes.length;
    let validated = true;
    for (let index = 0; index < len; index++) {
      if (attributes[index].showError && attributes[index].required) {
        validated = false;
        break;
      }
    }
    return validated;
  }

  submitPlaybookForm(addition) {
    if (this.validateAgentAnswers()) {
      const payload = {};
      payload["contact"] = this.profileData.id;
      payload["playbook_form"] = this.selectedPlaybookID;
      payload["playbook_form_ans"] = [];
      this.model.attributes.forEach((element) => {
        if (element.controlValue) {
          if (element.type === "phone") {
            element.controlValue = element.controlValue.number.includes("+") ?
              `${element.controlValue.number}` :
              `${element.controlValue.dialCode} ${element.controlValue.number}`;
          }
          if (element.type === "date") {
            const dateToDisplay = `${this.utils.formatDate(element.controlValue)}`;
            element.controlValue = dateToDisplay;
          }
          if (element.type === "checkbox") {
            element.controlValue = [];
            element.values.forEach((ele, chkIdx) => {
              if (ele.checked) {
                element.controlValue.push({ value: ele.value, label: ele.label });
              }
            });
          }
          if (element.type === "radio" || element.type === this.autoComplete) {
            const val = element.controlValue;
            element.controlValue = [];
            element.values.forEach((ele, chkIdx) => {
              if (ele.value === val) {
                element.controlValue.push({ value: ele.value, label: ele.label });
              }
            });
          }
          payload["playbook_form_ans"].push({
            "playbook_field": element.id,
            "data": element.controlValue
          });
        }
        else {
          payload["playbook_form_ans"].push({
            "playbook_field": element.id,
            "data": null
          });
        }
      });
      if (this.model.is_editing) {
        payload["playbook_form"] = this.model.playbook_form;
        payload["form_data_with_contact_id"] = this.model.form_data_with_contact_id;
        this.updatePlaybookFormData(payload)
      }
      else {
        this.savePlaybookFormData(payload)
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill the required field" });
    }
  }

  savePlaybookFormData(payload: any) {
    this.contactService.savePlaybookFormData(payload).subscribe((response) => {
      if (response) {
        const { data } = response.body;
        this.profileData.associatedPlaybook.unshift({
          id: data.id,
          created_at: data.created_at,
          updated_at: data.updated_at,
          data_filled_by: data.data_filled_by,
          image_url: data.image_url,
          is_deleted: data.is_deleted,
          title: data.title ? data.title : (data.form_name ? data.form_name : "")
        });
        this.PlaybookFormPopup = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Playbook answers saved successfully' });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  updatePlaybookFormData(payload: any) {
    this.contactService.updateFilledPlaybook(payload).subscribe((response) => {
      if (response) {
        this.profileData.associatedPlaybook[this.model.idx_play].id = response["body"]["data"]["id"];
        this.PlaybookFormPopup = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Playbook answers saved successfully' });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  getContactPlaybook() {
    this.contactService.getContactsPlaybook(this.profileData.id).subscribe((response) => {
      if (response) {
        this.profileData.associatedPlaybook = response.data;
      }
    });
  }

  onDateSelect(type) {
    const dateType = type === 'dateRange' ? this.dateRange : null;
    let dateToDisplay = `${this.utils.formatDate(dateType[0])}`;
    if (dateType[1] !== null) {
      dateToDisplay += ` - ${this.utils.formatDate(dateType[1])}`;
    }
    if (type === 'dateRange') {
      this.dateText = dateToDisplay;
    }
  }

  updatePhoneValue($event, i, type) {
  }

  updateFilledPlaybook(id, _playbook_form, title, idx_play) {
    this.contactService.getFilledPlaybook(id).subscribe((response) => {
      if (response && response.data[0]) {
        const { filled_form, playbook_form } = response.data[0];
        this.model.form_name = title;
        this.PlaybookFormPopup = true;
        this.model.attributes = [];
        this.model.addition = false;
        this.model.idx_play = idx_play;
        this.model.playbook_form = playbook_form;
        this.model.is_editing = true;
        this.selectedPlaybookID = playbook_form;
        this.model.form_data_with_contact_id = id;
        filled_form.forEach((element, index) => {
          this.model.attributes.push({
            ...element.playbook_field,
            controlValue: element.data
          });
        });
        this.mapFormValues();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No form available for this playbook' });
      }
    });
  }

  mapFormValues() {
    this.model.attributes.forEach((element, index) => {
      element.showError = false;
      switch (element.type) {
        case "radio":
        case this.autoComplete:
          {
            const values = element.values;
            if (values) {
              values.forEach((val, idx) => {
                if (element.controlValue && element.controlValue[0]) {
                  values[idx].checked = ((val.value === element.controlValue[0].value) && (val.label === element.controlValue[0].label));
                }
                else {
                  values[idx].checked = false
                }
              });
            }
            break;
          }
        case "checkbox":
          {
            const values = element.values;
            if (values) {
              values.forEach((val, idx) => {
                if (element.controlValue[idx] &&
                  (val.label === element.controlValue[idx].label) &&
                  (val.value === element.controlValue[idx].value)) {
                  values[idx].checked = true;
                }
                else {
                  values[idx].checked = false;
                }
              });
            }
            break;
          }
        case "date":
          {
            if (element.controlValue) {
              element.controlValue = new Date(element.controlValue);
            }
            break;
          }
      }
    });
  }

  deleteContactPlaybook(id) {
    this.contactService.contactDeletePlaybook(id).subscribe((response) => {
      if (response) {
        const index = this.profileData.associatedPlaybook.findIndex(obj => id === obj.id);

        this.profileData.associatedPlaybook.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response["body"]["message"] });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  sendCallMessage() {
    this.appService.openCallPopUp({ state: true, moduleType: "Contacts", list: [this.profileData] });
  }

  exportSelectedPlaybook() {
    const eventData = {
      playbook_id: this.selectedPlaybooksList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_PLAYBOOK"
    }
    this.playbookBulkOperation.emit(eventData);
  }

  exportSelectedTicket() {
    const eventTicketData = {
      ticket_id: this.selectedTicketList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_TICKET"
    }
    this.ticketBulkOperation.emit(eventTicketData);
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
    this.contactService.exportSelectedContact([this.profileData.id]);
  }

  exportSelectedTag() {
    const eventTagData = {
      tags_id: this.selectedTagList.map((obj) => (obj.tag_id)),
      type: "EXPORT_SELECTED_TAG"
    }
    this.tagsBulkOperation.emit(eventTagData);
  }
  exportSelectedProgram() {
    const eventProgramData = {
      program_id: this.selectedProgramsList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_PROGRAM"
    }
    this.programBulkOperation.emit(eventProgramData);
  }
  exportSelectedTemplate() {
    const eventTemplateData = {
      template_id: this.selectedTemplatesList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_TEMPLATE"
    }
    this.templateBulkOperation.emit(eventTemplateData);
  }
  exportSelectedServiceProvider() {
    const eventServiceProviderData = {
      id: this.selectedServiceProvidersList.map((obj) => (obj.id)),
      type: "EXPORT_SELECTED_SERVICE_PROVIDER"
    }
    this.serviceProviderBulkOperation.emit(eventServiceProviderData);
  }
  getSelectedPropertyName(): any {
    return PropertyTableList.filter((obj) => (obj.value === this.sortModel.property_table))[0];
  }
  openSettingSidebar(key) {
    this.settingSidebar = key;
    this.appService.updateSettingSidebarState(key);
  }
}
