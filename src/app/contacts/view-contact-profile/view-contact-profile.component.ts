import { Utils } from './../../utils';
import { CalendarLocalePlaybook } from './../../shared/filter/filter.model';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { viewUserContactDetails } from './../contact.model';
import { Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy, HostListener, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ContactService } from '../contact.service';
import { ModalState } from '../../shared/shared.model';
import { PopUpService } from '../../shared/pop-up/pop-up.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { UserService } from '../../user-accounts/user.service';
import { InitialService } from '../../initial/initial.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppExService } from './../../app-ex.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-contact-profile',
  templateUrl: './view-contact-profile.component.html',
  styleUrls: ['./view-contact-profile.component.scss', '../../../assets/stylesheets/form.scss'],
})

export class ViewContactProfileComponent implements OnInit, OnDestroy {
 
  listDragAccodiansPos = [0,1,2,3,4,5,6,7,8,9];
  modalRef: BsModalRef;
  filterService: any;
  updatedStates: any;
  stageData: any;
  activeNew: boolean;
  activeContacted: boolean;
  activeConverted: boolean;
  activeWorking: boolean;
  ticketid: any;
  ticketstatus: any;
  ticketdescription: any;
  ticketownerName: any;
  val: any;
  @HostListener("document:click", ["$event"]) onDocumentClick(event) {
    this.active = false;
  };
  isNewStepDone= false;
  isContractedStepDone= false;
  isWorkingStepDone= false;
  isConvertedStepDone=  false;
  modal: ModalState;
  total = 0;
  active = false;
  rowNumber = 0;
  pageSize = 2;
  rows = 2;
  callCount = 0;
  checked = true;
  showMoreNotification: Array<any> = [];
  unchecked = false;
  settingSidebar = false;
  length: number;
  activeLink = 1;
  @Output() contactBulkOperation = new EventEmitter<any>();
  viewsAndActivityColoumns = [
    { field: 'imageUrl', header: 'Property' },
    { field: 'id', header: 'Times Viewed' },
    { field: 'name', header: 'MLS ID' },
    { field: 'group_name', header: 'Details' },
    { field: 'created_at', header: 'Comm.' },

  ];

  errMessage = 'Something went wrong';
  imageLink = '../../../assets/images/property-image.png';
  addressLink = '3456 Albania Garlic Ave Suite 100 Crestline, CA 92541';

  viewsAndActivityData = [
    {
      araay:
        ['4 bed', '3 bath', '2470 sqft', '43,560 lot', '1949 built'],
      imageUrl: this.imageLink, id: 18, name: 'T10045629435',
      group_name: this.addressLink,
      created_at: '3%'
    },
    {
      araay: ['4 bed', '3 bath', '2470 sqft', '43,560 lot', '1939 built'],
      imageUrl: this.imageLink, id: 18, name: 'T10045629435',
      group_name: this.addressLink, created_at: '3%'
    }
    , {
      araay: ['4 bed', '3 bath', '2470 sqft', '43,520 lot', '1969 built'],
      imageUrl: this.imageLink, id: 18, name: 'T10045629435',
      group_name: this.addressLink, created_at: '3%'
    }
    , {
      araay: ['4 bed', '3 bath', '2470 sqft', '43,510 lot', '1989 built'],
      imageUrl: this.imageLink, id: 18, name: 'T10045629435',
      group_name: this.addressLink, created_at: '3%'
    }];

  campaignsColoumns = [
    { field: 'dropdown', header: 'Subscribed' },
    { field: 'campaign_status', header: 'Status' },
    { field: 'name', header: 'Campaign Name' },
    { field: 'date', header: 'Letter Dates' },
    { field: 'letters', header: 'Letters Left' },
  ];

  homeAddr = 'Home buying and home buying tips';
  campaignsColoumnsData = [
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
    { campaign_status: 'On', name: this.homeAddr, letters: '3/12' },
  ];
  userUpdateStatus = [
    { label: 'Active', value: true },
    { label: 'Deactive', value: false },
  ];
  reviewsColoumns = [
    { field: 'stats', header: 'Status' },
    { field: 'where', header: 'From' },
    { field: 'name', header: 'Name/Listing' },
    { field: 'avg', header: 'Average' },
    { field: 'calc', header: 'Evaluation' },
    { field: 'detail_info', header: 'Review Details' },
    { field: 'comments', header: 'Comm' },
  ];

  where = 'Jeffrey Radano';
  nameWhere = 'Jeff Cullen';
  titleInfo = 'Title: A Comm buying He put';
  detailInfo = 'Honesty & Integrity: 4.6 Responsiveness: 4.6 Local Knowledge: 4.6 Negotiation: 4.6 Process Expertise: 4.6 Overall Experience: 4.6';
  activeStageIndex = 10;
  reviewsData = [
    {
      where: this.where, name: this.nameWhere, avg: '4.6', calc: 'Excellent',
      detail_info: this.detailInfo,
      comments: this.titleInfo
    },
    {
      where: this.where, name: this.nameWhere, avg: '4.6', calc: 'Excellent',
      detail_info: this.detailInfo,
      comments: this.titleInfo
    },
    {
      where: this.where, name: this.nameWhere, avg: '4.6', calc: 'Excellent',
      detail_info: this.detailInfo,
      comments: this.titleInfo
    },
    {
      where: this.where, name: this.nameWhere, avg: '4.6', calc: 'Excellent',
      detail_info: this.detailInfo,
      comments: this.titleInfo
    },
    {
      where: this.where, name: this.nameWhere, avg: '4.6', calc: 'Excellent',
      detail_info: this.detailInfo,
      comments: this.titleInfo
    }
  ]
  questionColoumns = [
    { field: 'stats', header: 'Status' },
    { field: 'ques', header: 'Question' },
    { field: 'ans', header: 'Answer' },
    { field: 'election', header: 'Vote' },
    { field: 'quesby', header: 'Question By' },
    { field: 'ans_from', header: 'Answer  By' },
  ];

  ques = 'I am looking for a property which can offer me connectivity and easy accessibility with NCR and other regions. How about Puri Amanvilas?';
  ans = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"
  questionData = [{
    ques: this.ques,
    ans: this.ans,
    election: '4.6',
    quesby: this.where,
    ans_from: this.where
  },
  {
    ques: this.ques,
    ans: this.ans,
    election: '4.6',
    quesby: this.where,
    ans_from: this.where
  },
  {
    ques: this.ques,
    ans: this.ans,
    election: '4.6',
    quesby: this.where,
    ans_from: this.where
  }]

  listingColoumns = [
    { field: 'sub', header: 'Subject' },
    { field: 'imageUrl', header: 'Property' },
    { field: 'mail', header: 'Expiration Date' },
    { field: 'name', header: 'Subject Property' },
    { field: 'categ', header: 'Price' },
  ];

  listMail = 'jemermorockett@hotmail.com';
  listCategory = ['List Price', 'Original Price'];
  listingData = [
    { imageUrl: this.imageLink, sub: 'For Sale', mail: this.listMail, categ: this.listCategory },
    { imageUrl: this.imageLink, sub: 'For Sale', mail: this.listMail, categ: this.listCategory },
    { imageUrl: this.imageLink, sub: 'For Sale', mail: this.listMail, categ: this.listCategory },
    { imageUrl: this.imageLink, sub: 'For Sale', mail: this.listMail, categ: this.listCategory }
  ]
  historyColoumns = [
    { field: 'sub', header: 'Subject' },
    { field: 'mail', header: 'Sent To' },
    { field: 'name', header: 'Sent Date' },
    { field: 'categ', header: 'Category' },
  ];
  historyData = [
    { sub: 'Find the right property 1 for you', mail: this.listMail, categ: 'Buyers1 guide email campaign' },
    { sub: 'Find the right property2 for you', mail: this.listMail, categ: 'Buyers guide text campaign' },
    { sub: 'Find the right property3 for you', mail: this.listMail, categ: 'Buyers guide mail campaign' },
    { sub: 'Find the right property4 for you', mail: this.listMail, categ: 'Buyers guide fax campaign' }]

  pageData = { name: '', count: '' };
  addSocialMediaLink = false;
  addTicketsLink = false;
  addConnection = false;
  modalSubscription: Subscription;
  profileDataSubscription: Subscription;
  openSocialMedialLinkSubs: Subscription;
  openTicketsSubs: Subscription;
  addConnectionSubs: Subscription;
  showTaskPoupSubs: Subscription;
  countSubs: Subscription;
  showData = 'all';
  noteText = '';
  dropdownValue= true;
  userDetails: any;
  profileData: any;
  checked1 = false;
  editTaskIndex: number;
  checked2 = false;
  checked3 = false;
  checked4 = false;
  showTaskPoup = false;
  allAssociatedContacts: Array<any> = [];
  tasksList: Array<any> = [];
  filesList: Array<any> = [];
  ticketList: Array<any> = [];
  contactData: Array<any> = [];
  associatedPlaybook: Array<any> = [];
  selectedFileName: string;
  assignTo = false;
  user: any;
  userData: any;
  users: any;
  selectedAgentFileName: string;
  totalCount: any;
  tagsData: any = [];
  tags: any;
  assignTagPopup = false;
  assignGroupPopup = false;
  assignPlaybookPopup = false;
  PlaybookFormPopup = false;
  taskMode = 'SAVE';
  tagEvent: any;
  newTag = false;
  contactIdArr = [];
  group: any = [];
  groupsData: any = [];
  agentFileList: Array<any> = [];
  groups: any = [];
  id: number;
  Ticketid:any;
  countData: any;
  playbookFormsList: Array<any> = [];
  updatePlaybookSubscription: Subscription;
  selectedPlaybookID = 0;
  model: any = {
    description: 'App Description...',
    theme: {
      bgColor: "ffffff",
      textColor: "555555",
      bannerImage: ""
    },
    attributes: [],
    addition: true
  };
  editStatusSub: Subscription;

  SearchCountryField = SearchCountryField;
  countryISO = CountryISO;
  preferredCountries: CountryISO[] = [this.countryISO.UnitedStates, this.countryISO.UnitedKingdom];
  en = CalendarLocalePlaybook;
  dateRange: Date;
  dateText = '';

  public now: Date = new Date();
  config: any = {
    selector: 'textarea',
    menubar: false,
    placeholder: 'Type in a note..',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: '  bold italic underline forecolor link codesample insertfile image  blockquote\ | \ ',
    content_css: '/assets/stylesheets/editor.css'
  };
  sampleOptions: { label: string; value: string; }[];

  constructor(
    public appService: AppService,
    readonly _route: ActivatedRoute,
    readonly contactService: ContactService,
    public popUpService: PopUpService,
    public httpclient: HttpClient,
    public messageService: MessageService,
    public router: Router,
    public userService: UserService,
    public utils: Utils,
    public initialService: InitialService,
    readonly modalService: BsModalService,
    public appExService: AppExService,
  ) {
    this.modal = new ModalState();
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnDestroy(): void {
    this.appExService.callActivityData = [];
    this.editStatusSub && this.editStatusSub.unsubscribe();
    if (this.openSocialMedialLinkSubs) {
      this.openSocialMedialLinkSubs.unsubscribe();
    }
    if (this.addConnectionSubs) {
      this.addConnectionSubs.unsubscribe();
    }
    if (this.showTaskPoupSubs) {
      this.showTaskPoupSubs.unsubscribe();
    }
    localStorage.setItem('conSeq', JSON.stringify(this.listDragAccodiansPos));
    this.addTicketsLink = false;
    this.openTicketsSubs && this.openTicketsSubs.unsubscribe();
    this.updatePlaybookSubscription && this.updatePlaybookSubscription.unsubscribe();
    this.profileDataSubscription && this.profileDataSubscription.unsubscribe();
    this.appExService.callActivityData = [];
  }

  ngOnInit(): void {
    const conSeq = localStorage.getItem('conSeq');
    if(conSeq !== null && conSeq !== '') {
      this.listDragAccodiansPos = JSON.parse(conSeq);
    }

    this.callCount = 0;
    this.sampleOptions = [
      { label: 'Everyone', value: 'everyone' }, { label: 'My Brokers', value: 'brokers' }, { label: 'My Agents', value: 'agents' },
      { label: 'Only Me', value: 'me' }
    ];
    this.userDetails = new viewUserContactDetails({});
    this.associatedPlaybook = [];
    this._route.queryParams.subscribe(params => {
      this.id = params.userId;
      this.getContactPlaybook();
      this.getUserDetails();
      this.getSingleUserTicketData();
      this.profileDataSubscription = this.appService.contactProfile$.subscribe((profile) => {
        if (profile) {
          this.userDetails = profile;
          this.userDetails.next_follow_up = new Date(this.userDetails.next_follow_up).getTime() / 1000
          this.contactIdArr = [];
          this.userDetails.tag_name.forEach(tag => {
            this.contactIdArr.push(tag.id);
          })
        }
      });
      this.popUpService.getTagsList().subscribe(res => {
        this.tags = res.body.data ? this.augmentTags(res.body.data) : [];
      })
    });
    this.editStatusSub = this.appService.editStatus.subscribe((data: any) => {
      if (data === false) {
        const params = { userId: this.userDetails.id };
        this.router.navigate(['contacts/contact-edit'], {
          queryParams: params
        });
      }
    });
    this.addConnectionSubs = this.appService.addConnectionPopup
      .subscribe(state => {
        this.addConnection = state;
      })
    this.countSubs = this.appService.countSource.subscribe((res: any) => {
      this.countData = res;
      if (res.contact_count) {
        this.contactService.getContacts({ page: 1, limit: res.contact_count }).subscribe((response) => {
          this.contactData = response.body.data ? response.body.data : [];
          this.allAssociatedContacts = [];
          this.contactData.forEach(contact => {
            this.allAssociatedContacts.push({
              id: contact.id,
              itemName: (contact.middle_name ?
                `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.middle_name} ${contact.last_name}`
                : `${contact.prefix ? contact.prefix : ''} ${contact.first_name} ${contact.last_name}`) + " " + `(${contact.phone})`,
            });
          });
        });
      }
    });
    this.initialService.getCount().subscribe((response) => {
      this.totalCount = response.data.user_count;
    });
    this.showTaskPoupSubs = this.appService.openAddTask.subscribe(res => {
      this.taskMode = res;
      this.showTaskPoup = (res === 'SAVE' || res === 'UPDATE') ? true : false;
    });

    this.loadSubsData();
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.listDragAccodiansPos, event.previousIndex, event.currentIndex);
  }


  loadSubsData() {
    this.openSocialMedialLinkSubs = this.appService.socialMediaLinkPopup
      .subscribe(state => {
        this.addSocialMediaLink = state;
      })
  }

  getSingleUserTicketData() {
    this.contactService.getSingleUserTicketData(this.id, 'Contacts').subscribe((res => {
      this.ticketList = res.data;
    }))
  }

  getCountOperation(event) {
    this.callCount = event;
  }

  updateModalState(state) {
    this.addTicketsLink = state;
    if(state) {
      this.appService.sendPopupData({category_type: "Contacts", id:[this.id]});
    }
    else {
      this.getSingleUserTicketData();
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
          this.userData.push({ label: name, value: { name, id: element.id } });
        }
      });
      const assignee = this.userDetails.assignee;
      if (assignee) {
        this.user = { name: assignee.name, id: assignee.id };
      }
      if ((this.userData.length === 0) && assignee) {
        this.userData.push({ label: assignee.name, value: { name: assignee.name, id: assignee.id } });
      }
    })
  }
  /**
   * To get tasks for contact
   */
  getTaskForContact() {
    this.contactService.getTasks(this.userDetails.id, 'Contacts').subscribe(res => {
      this.tasksList = res.data;
    });
  }

  getTicketForContact() {
    this.contactService.getTicket(this.userDetails.id, { page: 1, limit: 10 }).subscribe(res => {
    });
  }
  /**
   * To get tasks for contact
   */
  getFilesForContact() {
    this.contactService.getFiles(this.userDetails.id).subscribe(res => {
      this.filesList = res.data;
    });
  }
  /**
  * To Update User
  * @param rowData Row data
  */
  updateUsers(rowData) {
    const userData = { group_id: rowData.groups, is_active: rowData.is_active, user_id: rowData.id };
    this.userService.updateUser(userData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    });
  }

  getUserDetails(): void {
    this.appService.showLoader(true);
    this.contactService.getUserDetail(this.id).subscribe((response: any) => {
      const resData = response.data;
      this.stageData = resData.stage;
      this.userDetails = {
        ...new viewUserContactDetails(resData),
        ...resData,
        groupLabel:resData.group.map(obj=>obj.group).join(", ")
      };
      if (this.userDetails.last_follow_up !== null && this.userDetails.next_follow_up !== null) {
        this.userDetails['followUp'] = moment(this.userDetails.next_follow_up).diff(moment(this.userDetails.last_follow_up), 'days');
      } else {
        this.userDetails['followUp'] = null;
      }
      this.userDetails.budget_min = resData.budget_min.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      this.userDetails.budget_max = resData.budget_max.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

      this.activeStageIndex = 10;
      for(let i = 0; i < this.userDetails.stage.length; i++){
      if(this.userDetails.stage[i].value === false) {
        this.activeStageIndex = i;
        break;
        }
      }
      
      this.getTaskForContact();
      this.getFilesForContact();
      this.getTicketForContact();
      this.appService.updateUserNameValues(this.userDetails.name);
      this.contactIdArr = [];
      this.userDetails.tag.forEach(tag => {
        this.contactIdArr.push(tag.id);
      })
      this.appService.showLoader(false);

      let name;
      if (this.userDetails.prefix && this.userDetails.middle_name) {
        name = `${this.userDetails.prefix} ${this.userDetails.first_name} 
        ${this.userDetails.middle_name} ${this.userDetails.last_name}`
      } else if (this.userDetails.middle_name) {
        name = `${this.userDetails.first_name} 
      ${this.userDetails.middle_name} ${this.userDetails.last_name}`
      } else if (this.userDetails.prefix) {
        name = `${this.userDetails.prefix} ${this.userDetails.first_name} 
      ${this.userDetails.last_name}`
      } else {
        name = `${this.userDetails.first_name} ${this.userDetails.last_name}`
      }
      this.appService.updateHeaderName({ name: 'Contact Profile', count: name });
    }, (error: any) => {
      this.appService.showLoader(false);
    });
  }

  /**
   * To map tag data
   * @param tags 
   */
  augmentTags(tags) {
    let updatedData = [];
    updatedData = tags.map((tag) => ({
      id: tag.id,
      value: tag.tag_name
    }));
    return updatedData;
  }

  /**
   * To assign tag
   */
  assignTag() {
    this.assignTagPopup = true;
    this.tagsData = [];
  }

  /**
   * To add tag
   */
  onTagAdd(event) {
    const tagExist = this.tags.some((tag) => tag.value === event.display);
    if (!tagExist) {
      this.tagEvent = event;
      this.addTag({ tag_name: event.display });
    }
  }

  /**
   * To cancel tag adding
   */
  dontAddTag() {
    const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === this.tagEvent.display);
    this.tagsData.splice(recentTagIndex, 1);
    this.newTag = false;
  }

  /**
   * To ladd tag in tagList
   */
  addTagToList() {
    this.addTag({ tag_name: this.tagEvent.display });
    this.newTag = false;
  }

  /**
   * To add tag
   * @param tagName
   */
  addTag(tagName) {
    this.popUpService.addTag(tagName).subscribe((response: any) => {
      for (const tag of this.tagsData) {
        if (tag.display === tagName.tag_name) {
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
   * To update tags
   */
  updateTags() {
    this.tagsData.forEach(tag => {
      this.contactIdArr.push(tag.id);
      this.userDetails.tag.push({ id: tag.id, tag: tag.display })
    });

    const data = {
      contact_id: this.userDetails.id,
      tags: this.contactIdArr,
    };

    this.popUpService.updateTagsPatch(data).subscribe(res => {
      this.assignTagPopup = false;
    })
  }

  /**
   * To assign group
   */
  assignGroup() {
    this.popUpService.getGroups().subscribe(res => {
      this.groups = res.body.data ? res.body.data : [];
      this.group = this.userDetails.group.map((obj)=>obj.id);
      this.groupsData = [];
      this.groups.forEach((group, i) => {
        if(group.is_active === true){
          this.groupsData.push({ label: group.group_name, value: group.id });
        }
      });
      this.groupsData = this.popUpService.repositionGroup(this.groupsData, this.profileData.group);
      this.assignGroupPopup = true;
    })
  }

  assignPlaybook() {
    this.assignPlaybookPopup = true;
    this.selectedPlaybookID = 0;
    this.model.attributes = [];
    this.model.is_editing = false;
    this.getPublishedPlaybookFormData();
  }

  /**
   * To update group
   */
  updateGroup() {
    const data = { contact_id: this.userDetails.id, groups: this.group};
    this.popUpService.updateTags(data).subscribe(res => {
      this.assignGroupPopup = false;
      this.userDetails.group = [];
      this.group.forEach(id => {
        const data = this.groupsData.filter((obj)=> obj.value === id)[0];
        this.userDetails.group.push({ id: data.value, group: data.label });
      });
      this.userDetails.groupLabel = this.userDetails.group.map(obj=>obj.group).join(", ");
      this.messageService.add({ severity: 'success', summary: 'Success', detail:  res.body.message});
      this.group = [];
      this.assignGroupPopup = false;
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went wrong' });
    });
  }

  /**
   * To open tag popup
   */
  openAddTagPopUp() {
    this.modal.addTag = true;
  }

  /**
   * To open ad group popup
   */
  openAddGroupPopUp() {
    this.modal.addGroup = true;
  }


  /**
   * To load dropudown
   */
  dropdown() {
    this.dropdownValue = !false;
  }

  /**
   * To Remove tag
   * @param tag
   */
  removeTag(tag) {
    const index = this.contactIdArr.findIndex(id => tag.id === id);
    this.contactIdArr.splice(index, 1);
    this.userDetails.tag.splice(index, 1);

    let data = {
      contact_id: this.userDetails.id,
      tags: this.contactIdArr
    }

    this.popUpService.updateTagsPatch(data).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag removed successfully' });
    })
  }

  unAssignGroup(id: any) {
    this.userDetails.group.splice(id, 1);
    const data = { contact_id: this.userDetails.id, groups: this.userDetails.group.map((obj)=>obj.id)};
    this.popUpService.updateTags(data).subscribe(res => {
      this.userDetails.groupLabel = this.userDetails.group.map(obj=>obj.group).join(", ");
      this.messageService.add({ severity: 'success', summary: 'Success', detail:  res.body.message});
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went wrong' });
    });
  }
  /**
   * To save note
   */
  saveNote() {
    const augmentedNoteText = this.noteText.replace("<p>", "").replace("</p>", "");
    const data = {
      comment: augmentedNoteText,
      contact_id: [this.userDetails.id]
    }
  }

  changeTab(tab: number) {
    this.activeLink = tab;
  }

  /**
   * To get social media link
   * @param e for object
   */
  getSocialMediaLink(e) {
    this.userDetails.social_media_links.unshift(e);
  }

  /**
   * To add connection
   */
  addConnections() {
    this.addConnection = true;
    this.appService.addConnectionData(this.userDetails.connections)
    this.appService.updateConnectionMode('ADD');
  }

  /**
   * To edit connection
   * @param connectionIndex as index
   */
  editConnection(connectionIndex) {
    this.addConnection = true;
    this.appService.editConnectionData(this.userDetails.connections[connectionIndex]);
    this.appService.updateConnectionMode('EDIT');
  }

  /**
   * To delete connection
   * @param index as index
   */
  deleteConnection(index, connId) {
    this.contactService.deleteConnection(connId).subscribe(res => {
      this.userDetails.connections.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Connection deleted successfully' });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
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
    formData.append('contact_id', this.userDetails.id);
    if (event.target.files[0].size > 2000000) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size should not exceeds by 2mb' });
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
    this.contactService.deleteAttachment({ id: id }).subscribe(res => {
      this.filesList.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File deleted successfully' });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    });
  }

  updateUser() {
    const data = {
      contact_id: this.userDetails.id,
      assigned_to: this.user.id,
      assigned_name: this.user.name
    }

    this.popUpService.updateTagsPatch(data).subscribe(res => {
      this.assignTo = false;
      this.userDetails['assignee'] = { name: this.user.name, id: this.user.id };
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User assigned successfully' });
      this.user = '';
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    })
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
  getPlaybookData(playbook_id) {
    this.contactService.getPlaybookFromID(playbook_id).subscribe((response) => {
      if (response) {
        const {
          playbook_form_fields_data,
          title,
        } = response.data;

        this.model.form_name = title;
        this.model.attributes = playbook_form_fields_data;
        this.model.addition = true;
        this.PlaybookFormPopup = true
        this.assignPlaybookPopup = false;

        this.model.attributes.forEach((element, index) => {
          this.model.attributes[index].controlValue = null;
        });
      }
    });
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }

  submit() {

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
      case "autocomplete":
        this.model.attributes[index].controlValue = data;
        break;
      case "checkbox":
        this.model.attributes[index].controlValue = [];
        break;
    }
  }

  contractedState(val, i) {
    let list = [];
    if(i === 'done') {
      list = this.userDetails.stage.map(obj=>obj.label);
    }
    else {
      list = this.userDetails.stage.slice(0, i+1).map(obj=>obj.label);
    }
    const payload = {
      contact_id: this.id,
      stage: list
    };
    this.contactService.updateContactField(payload).subscribe((res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'State updated successfully!' });
      this.updatedStates = res;
      this.getUserDetails();
    }))

  }

  validateAgentAnswers(): boolean {
    this.model.attributes.forEach((element, index) => {
      if (element.required) {
        switch (element.type) {
          case "radio":
          case "autocomplete":
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
              const controlValue: Array<any> = [];
              element.values.forEach((ele) => {
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

      payload["contact"] = this.userDetails.id;
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

          if (element.type === "radio" || element.type === "autocomplete") {
            const val = element.controlValue;
            element.controlValue = [];
            element.values.forEach((ele, chkIdx) => {
              if (ele.value === val) {
                element.controlValue.push({ value: ele.value, label: ele.label });
              }
            });
          }

          if (element.type === "radio") {
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
  }

  savePlaybookFormData(payload: any) {
    this.contactService.savePlaybookFormData(payload).subscribe((response) => {
      if (response) {
        const { data } = response.body;

        this.associatedPlaybook.unshift({
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
        this.PlaybookFormPopup = false;
        this.associatedPlaybook[this.model.idx_play].id = response["body"]["data"]["id"];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Playbook answers saved successfully' });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  getContactPlaybook() {
    this.contactService.getContactsPlaybook(this.id).subscribe((response) => {
      if (response) {
        this.associatedPlaybook = response.data;
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
        case "autocomplete":
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
    formData.append('contact_id', this.userDetails.id);

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

  deleteContactPlaybook(id) {
    this.contactService.contactDeletePlaybook(id).subscribe((response) => {
      if (response) {
        let index = this.associatedPlaybook.findIndex(obj => id === obj.id);

        this.associatedPlaybook.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response["body"]["message"] });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    });
  }

  hideVisible() {
    this.active = !this.active;
  }

  showMoreNotificationPop(index) {
    this.showMoreNotification[index] = !this.showMoreNotification[index];
  }

  sendCallMessage() {
    this.appService.openCallPopUp({ state: true, moduleType: 'Contacts', list: [this.userDetails] });
  }

  exportSelectedContact() {
    this.contactService.exportSelectedContact([this.userDetails.id]);
  }

  openAddNotificationPopup() {
    this.appService.openMessageHeaderPopUp(true);
  }
  /**
    * notification popup closed when click outside.
    * @param $event
    */
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

  openSettingSidebar(key) {
    this.settingSidebar = key;
    this.appService.updateSettingSidebarState(key);
  }
}