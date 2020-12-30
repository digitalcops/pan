import { RatingOptionTable } from './../../shared/filter/filter.model';
import { MobileOption } from './../../shared/pop-up/pop-up.model';
import { EditContactRatingOption, EmailsOption, PhoneOption } from './../contact.model';
import { UserService } from './../../user-accounts/user.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { GenderOptions, TimeFrameOptions, ContactStatus, LanguageOptions } from '../contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, ImageTransform, ImageCropperComponent, CropperPosition } from 'ngx-image-cropper';
import { config } from './../../config';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../contact.service';
import { AddContact } from '../../shared/pop-up/pop-up.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopUpService } from '../../shared/pop-up/pop-up.service';
import { MessageService } from 'primeng/api';
import { Utils } from '../../utils';
import { Subscription } from 'rxjs';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  tab: any = 'tab1';
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  tab6: any;
  personaldata = false;
  userData = false;
  genderOptions = GenderOptions;
  timeFrame = TimeFrameOptions;
  ratingOptionTable = RatingOptionTable;
  emailsOption = EmailsOption;
  phoneOption = PhoneOption;
  contactStatus = ContactStatus;
  ratingOptions = EditContactRatingOption;
  languageOption = LanguageOptions;
  date1: Date;
  date2: Date;
  language: string;
  birthday: Date;
  timezone: string;
  image: string;
  occupation: string
  job_title: string
  id: any;
  prefix: any;
  userDetails: any = {};
  editContactData: AddContact;
  contactEditForm: FormGroup;
  additionalInfoForm: FormGroup;
  countries: Array<any> = [];
  assigneesList: Array<any> = [];
  tags: Array<any> = [];
  groups: Array<any> = [];
  groupsData: Array<any> = [];
  assign: Array<any> = [];
  countriesData: Array<any> = [];
  states: Array<any> = [];
  emailPattern = '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  invalidBudget = false;
  invalidTime = false;
  imageModal = false;
  uploadedImage: any;
  selectedFiles: Array<any> = [];
  croppedImage: any = '';
  cropperPosition: CropperPosition;
  lastCroppedImage: any;
  selectedImgUrl= '';
  imageExist = false;
  canvasRotation = 0;
  transform: ImageTransform = {}
  mode: string;
  selectedFileName;
  imageChangedEvent: any = '';
  country: any;
  invalidFname = false;
  invalidLname = false;
  countData: any = {};
  SearchCountryField = SearchCountryField;
  countryISO = CountryISO;
  preferredCountries: CountryISO[] = [this.countryISO.UnitedStates, this.countryISO.UnitedKingdom];
  mobileOptions: Array<any> = [];
  tagsData: any;
  tagEvent: any;
  newTag = false;
  @ViewChild('imageCropper', { static: false }) imageCropper: ImageCropperComponent;
  countSubscription: Subscription;
  imgUrl: any;
  constructor(
    public appService: AppService,
    public route: ActivatedRoute,
    public contactService: ContactService,
    public popUpService: PopUpService,
    public httpclient: HttpClient,
    public _formBuilder: FormBuilder,
    public messageService: MessageService,
    public userService: UserService,
    public router: Router,
    public utils: Utils,
  ) {
    this.contactEditForm = this._formBuilder.group({});
    this.additionalInfoForm = this._formBuilder.group({});
  }

  ngOnInit() {
    this.mobileOptions.push(new MobileOption());
    this.mobileOptions.push(new MobileOption());
    this.mobileOptions.push(new MobileOption());
    this.setFormState();
    this.getTagsList();
    this.route.queryParams.subscribe((params) => {
      this.id = params.userId;
      this.prefix = params.prefix;
    });
    this.getCountries();
    this.additionalInfoForms();
    this.countSubscription = this.appService.countSource$.subscribe((response: any) => {
      if (response.user_count) {
        this.countData = response;
        this.getUsers();
      }
    });
  }
  getCountries() {
    this.popUpService.getModalData().subscribe((response) => {
      this.countries = response[0].data ? response[0].data : [];
      this.countries.forEach(country => {
        this.countriesData.push({label: country.name,value: country.code});
      });
      this.groups = response[2].body.data ? response[2].body.data : [];
      this.groups.forEach(group => {
        this.groupsData.push({
          label: group.group_name,
          value: group.id,
        });
      });
      if (this.id) {
        this.getUserDetails();
      }
    }, (error) => {
    });
  }
  
  getUsers() {
    const pageData = { page: 1, limit: this.countData.user_count };
    this.assigneesList = [];
    this.userService.getUsers(pageData).subscribe((response) => {
      this.assign = response.data ? response.data : [];
      this.assign.forEach(obj => {
        this.assigneesList.push({label: obj.full_name,value: obj.id});
      });
    }, (error) => {
    });
  }
  additionalInfoForms(): void {
    this.additionalInfoForm = this._formBuilder.group({
      contact_id: new FormControl(this.id),
      occupation: new FormControl(this.userDetails.occupation),
      language: new FormControl(this.userDetails.language),
      timezone: new FormControl(this.userDetails.timezone),
      birthday: new FormControl(this.userDetails.birthday),
      job_title: new FormControl(this.userDetails.job_title),
    });
  }

  setFormState(): void {
    this.contactEditForm = this._formBuilder.group({
      contact_id: new FormControl(this.id),
      prefix: new FormControl(this.userDetails.prefix),
      status_rating: new FormControl(this.userDetails.status_rating),
      status: new FormControl(this.userDetails.status),
      groups: new FormControl(this.userDetails.groups),
      criteria: new FormControl(this.userDetails.criteria),
      source: new FormControl(this.userDetails.source),
      sub_source: new FormControl(this.userDetails.sub_source),
      first_name: new FormControl(this.userDetails.first_name, [Validators.required]),
      last_name: new FormControl(this.userDetails.last_name, [Validators.required]),
      middle_name: new FormControl(this.userDetails.middle_name),
      nick_name: new FormControl(this.userDetails.nick_name),
      gender: new FormControl(this.userDetails.gender, [Validators.required]),
      assigned_to: new FormControl(this.userDetails.assigned_to),
      budget_max: new FormControl(this.userDetails.budget_max),
      budget_min: new FormControl(this.userDetails.budget_min),
      city: new FormControl(this.userDetails.city),
      country: new FormControl(this.userDetails.country),
      country_code: new FormControl(this.userDetails.country_code),
      phone: new FormControl(this.userDetails.phone),
      secondary_phone: new FormControl(this.userDetails.secondary_phone),
      other_phone: new FormControl(this.userDetails.other_phone),
      next_follow_up: new FormControl(this.userDetails.next_follow_up),
      state: new FormControl(this.userDetails.state),
      address_line: new FormControl(this.userDetails.address_line),
      address_line2: new FormControl(this.userDetails.street2),
      interested_address: new FormControl(this.userDetails.interested_address),
      interested_address2: new FormControl(this.userDetails.interested_address2),
      zip: new FormControl(this.userDetails.zip),
      rating: new FormControl(this.userDetails.rating),
      fax: new FormControl(this.userDetails.fax),
      email: new FormControl(this.userDetails.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      secondary_email: new FormControl(this.userDetails.secondary_email, [Validators.pattern(this.emailPattern)]),
      other_email: new FormControl(this.userDetails.other_email, [Validators.pattern(this.emailPattern)]),
      email_label: new FormControl(this.userDetails.email_label),
      secondary_email_label: new FormControl(this.userDetails.secondary_email_label),
      other_email_label: new FormControl(this.userDetails.other_email_label),
      phone_label: new FormControl(this.userDetails.phone_label),
      secondary_phone_label: new FormControl(this.userDetails.secondary_phone_label),
      other_phone_label: new FormControl(this.userDetails.other_phone_label),
      company_name: new FormControl(this.userDetails.company_name),
      county: new FormControl(this.userDetails.county),
      timeframe: new FormControl(this.userDetails.timeframe),
      minTime: new FormControl(this.userDetails.minTime),
      maxTime: new FormControl(this.userDetails.maxTime),
      selectTimeFrame: new FormControl(this.userDetails.selectTimeFrame),
      tagsData: new FormControl(this.userDetails.tagsData ? this.userDetails.tagsData : []),
    });
  }

  /**
 * To update Email/Mobile label state
 * @param event Input Event
 * @param rowData Selected row
 * @param key Key to update
 */
  updateLabel(event, rowData, key) {
    rowData[key] = false;
    if (event.target.value.length > 0) {
      rowData[key] = true;
    }
  }

  activeTab(checkTab) {
    if (checkTab === 1) {
      this.tab = 'tab1';
      this.setFormState();
    } else if (checkTab === 2) {
      this.userDetails = { ...this.contactEditForm.value };
      if (this.userDetails.phone) {
        this.userDetails.phone = this.userDetails.phone.number;
      }
      else {
        this.userDetails.phone = "";
      }
      if (this.userDetails.secondary_phone) {
        this.userDetails.secondary_phone = this.userDetails.secondary_phone.number;
      }
      else {
        this.userDetails.secondary_phone = "";
      }
      if (this.userDetails.other_phone) {
        this.userDetails.other_phone = this.userDetails.other_phone.number;
      }
      else {
        this.userDetails.other_phone = "";
      }
      this.tab = 'tab2';
    } else if (checkTab === 3) {
      this.tab = 'tab3';
    } else if (checkTab === 4) {
      this.tab = 'tab4';
    } else if (checkTab === 5) {
      this.tab = 'tab5';
    } else {
      this.tab = 'tab6';
    }
  }
  PersonalInfo() {
    this.personaldata = true;
    this.userData = true;

  }
  usersData() {
    this.userData = false;
    this.personaldata = false;
  }

  addAddionalinfo() {
    const addionalInfo = {
      contact_id: this.id,
      image: this.imgUrl,
      language: this.userDetails.language,
      birthday: this.userDetails.birthday,
      timezone: this.userDetails.timezone,
      occupation:  this.userDetails.occupation,
      job_title: this.userDetails.job_title
    }

    this.contactService.updateContactField(addionalInfo).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Group created successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.status === 400 ? 'Email already exists' : 'Something went wrong' });
    });
  }
  /**
   * get user details
   */
  getUserDetails(): void {
    this.appService.showLoader(true);
    this.contactService.getUserDetail(this.id).subscribe((response: any) => {
      const resData = response.data;
      resData.country_code && this.getStates({ value: resData.country_code })
      this.userDetails = resData;
      this.userDetails.country_code = resData.country_code;
      this.userDetails.country = resData.country;
      this.userDetails.state = resData.state;
      this.userDetails.groups = resData.group.length ? resData.group[0].id : null;
      if (this.userDetails.timeframe !== null) {
        const arrTimeFrame = this.userDetails.timeframe.split(" ");
        this.userDetails.minTime = arrTimeFrame[0];
        this.userDetails.maxTime = arrTimeFrame[2];
        this.userDetails.selectTimeFrame = arrTimeFrame[3];
      }
      this.userDetails.birthday = this.convertDate(this.userDetails.birthday);
      this.userDetails.next_follow_up = this.convertDate(this.userDetails.next_follow_up);
      if (resData.assignee) {
        this.userDetails.assigned_to = resData.assignee.id;
      }
      this.userDetails.rating = resData.rating;
      this.userDetails.tagsData = (resData.tag ? resData.tag.map((obj) => ({
        id: obj.id,value: obj.tag,display: obj.tag
      })) : []);
      this.userDetails.phone = (this.userDetails.phone ? this.userDetails.phone : '');
      this.userDetails.secondary_phone = (this.userDetails.secondary_phone ? this.userDetails.secondary_phone : '');
      this.userDetails.other_phone = (this.userDetails.other_phone ? this.userDetails.other_phone : "");
      this.setFormState();
      this.appService.showLoader(false);
      this.appService.updateHeaderName({ 
        name: `${this.userDetails.prefix ? this.userDetails.prefix : ''} ${this.userDetails.first_name} ${this.userDetails.middle_name ?
          this.userDetails.middle_name : ''} ${this.userDetails.last_name}` });
    });
  }

  /**
   * date convert
   * @param stringDate 
   */
  convertDate(stringDate) {
    let modifiedDate = null
    if (stringDate) {
      modifiedDate = new Date(stringDate);
    }
    return modifiedDate;
  }

  /**
   * To get State list
   * @param event Selected country
   */
  getStates(event) {
    this.popUpService.getStatesList(event.value).subscribe((response) => {
      this.states = response.data ? response.data.map((item) => {
        return { label: item, value: item };
      }) : [];
    }, () => {
    });
  }

  /**
   * Update contact profile
   * @param formData
   */
  updateContact() {
    if (this.contactEditForm.valid && !this.invalidTime && !this.invalidBudget) {
      const data = {contact_id: this.id,prefix: this.prefix};
      const requestData = { ...this.contactEditForm.value };
      if (requestData.next_follow_up) {
        requestData.next_follow_up = (requestData.next_follow_up.getTime() / 1000);
      }
      if (this.userDetails.minTime !== undefined && this.userDetails.maxTime !== undefined
        && this.userDetails.selectTimeFrame !== undefined) {
        requestData['timeframe'] = `${this.userDetails.minTime} - ${this.userDetails.maxTime} ${this.userDetails.selectTimeFrame}`;
      }
      if (this.userDetails.groups !== null) {
        requestData['groups'] = [this.userDetails.groups];
      }
      else {
        requestData['groups'] = [];
      }
      requestData.tags = requestData.tagsData.map((obj) => obj.id);
      if (requestData.phone) {
        requestData['phone'] = requestData.phone.number.includes("+") ?
          `${requestData.phone.number}` :
          `${requestData.phone.dialCode} ${requestData.phone.number}`;
      }
      else {
        requestData['phone'] = null;
      }

      if (requestData.secondary_phone) {
        requestData['secondary_phone'] = requestData.secondary_phone.number.includes("+") ?
          `${requestData.secondary_phone.number}` :
          `${requestData.secondary_phone.dialCode} ${requestData.secondary_phone.number}`;
      }
      else {
        requestData['secondary_phone'] = null;
      }

      if (requestData.other_phone) {
        requestData['other_phone'] = requestData.other_phone.number.includes("+") ?
          `${requestData.other_phone.number}` :
          `${requestData.other_phone.dialCode} ${requestData.other_phone.number}`;
      }
      else {
        requestData['other_phone'] = null;
      }
      delete requestData.timezone;
      delete requestData.minTime;
      delete requestData.maxTime;
      delete requestData.selectTimeFrame;
      delete requestData.tagsData;
      if (requestData.country_code) {
        const countryObj = this.countriesData.filter((obj) => obj.value === requestData.country_code);
        requestData.country = countryObj[0].label;
      }
      this.contactService.updateUserDetail(requestData, data).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated successfully' });
        this.router.navigate(['/contacts/all-contacts']);
      },
        (serverError) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
        });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Form fields contains invalid value` });
    }
  }

  /**
   * Additinal info data update
   * @param e Additional info
   * @param type
   */
  updateAdditionalInfoContact() {
    if (this.contactEditForm.valid && !this.invalidTime && !this.invalidBudget) {
      const data = {contact_id: this.id,prefix: this.prefix};
      this.appService.showLoader(true);
      const requestData = this.additionalInfoForm.value;
      requestData.email = this.userDetails.email;
      requestData.first_name = this.userDetails.first_name;
      requestData.last_name = this.userDetails.last_name;
      if (this.userDetails.phone) {
        requestData['phone'] = this.userDetails.phone;
      }
      else {
        requestData['phone'] = null;
      }
      this.contactService.updateUserDetail(requestData, data).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated successfully' });
        this.router.navigate(['/contacts/all-contacts']);
      },
        (serverError) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
        });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Primary user details contains invalid values' });
    }
  }

  /**
   * validation add
   * @param e event for getting data
   * @param type
   */
  minMaxValidate(e, type) {
    if (type === 'BUDGET') {
      if (this.userDetails.budget_min && this.userDetails.budget_max) {
        if (this.userDetails.budget_min > this.userDetails.budget_max) {
          this.invalidBudget = true;
        } else {
          this.invalidBudget = false;
        }
      } else {
        this.invalidBudget = false;
      }
    } else {
      if (this.userDetails.minTime && this.userDetails.maxTime) {
        if (this.userDetails.minTime > this.userDetails.maxTime) {
          this.invalidTime = true;
        } else {
          this.invalidTime = false;
        }
      } else {
        this.invalidTime = false;
      }
    }
  }

  /**
   * validation add for whitespace remove
   * @param type define for parameter
   */
  whitespaceCheck(type) {
    if (type === 'FNAME') {
      this.invalidFname = this.userDetails.first_name.trim() === '' ? true : false;
    } else if (type === 'LNAME') {
      this.invalidLname = this.userDetails.last_name.trim() === '' ? true : false;
    }
  }

  /**
   * On Tag Add
   * @param event Tag event
   */
  onTagAdd(event) {
    const tagExist = this.tags.some((tag) => tag.value === event.display);
    if (!tagExist) {
      this.tagEvent = event;
      this.tags.push({ id: undefined, value: event.display })
      this.addTag({ tag_name: event.display });
    }
  }

  /**
   * To add tag
   * @param tagName Tag Name
   */
  addTag(tagName) {
    this.popUpService.addTag(tagName).subscribe((response: any) => {
      for (const tag of this.tags) {
        if (tag.display === tagName.tag_name) {
          tag['id'] = response.body.id;
          break;
        }
      }
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

  addTagToList() {
    this.addTag({ name: this.tagEvent.display });
    this.newTag = false;
  }

  dontAddTag() {
    const recentTagIndex = this.tagsData.findIndex((tag) => tag.value === this.tagEvent.display);
    this.tagsData.splice(recentTagIndex, 1);
    this.newTag = false;
  }

  /**
  * On Tag Remove
  * @param event Tag Event
  */
  onTagRemove(event) {
    const tagExist = this.tags.some((tag) => tag.id === event.id);
    if (!tagExist) {
      this.tags.unshift({ id: event.id, value: event.value });
    }
  }

  /**
  * To get Countries List
  */
  getTagsList() {
    this.popUpService.getTagsList().subscribe((response) => {
      this.tags = response.body.data ? this.augmentTags(response.body.data) : [];
    }, () => {});
  }

  /**
  * To Augment tags list
  * @param tags Tags
  */
  augmentTags(tags) {
    let updatedData = [];
    tags.forEach(element => {
      if (element.is_active) {
        updatedData.push({
          id: element.id,value: element.tag_name
        })
      }
    });
    return updatedData;
  }

  ngOnDestroy() {
    this.countSubscription && this.countSubscription.unsubscribe();
  }

  /**
   * To save image
   */
  saveImage() {
    this.imageModal = false;
    this.imageExist = true;
  }

  /**
   * On Image load failed
   */
  loadImageFailed() {
    this.imageModal = false;
    this.imageExist = false;
    this.uploadedImage = '';
  }

  /**
 * To crop image
 */
  cropImage() {
    this.croppedImage = this.uploadedImage;
    this.imageCropper.crop();
    this.cropperPosition = this.getCropperPosition();
    this.lastCroppedImage = new ElementRef(this.imageCropper.sourceImage.nativeElement);
    this.imageModal = false;
    this.imageExist = false;
    this.onFileSelect(this.imageChangedEvent);
  }

  /**
   * On file select
   * @param event Input event
   */
  onFileSelect(event) {
    this.selectedFileName = event.target.files[0].name;
    fetch(this.croppedImage).then(res => res.blob()).then(blob => {
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('filename', this.selectedFileName);
      formData.append('inside_location', 'contact_attachments');
      this.httpclient.post<any>(config.uploadFile, formData).subscribe((response) => {
        this.imgUrl = response.url;
        this.imageExist = true;
        this.selectedFiles.push(this.selectedFileName);
        this.croppedImage = response.url;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
    });
  }

  /**
   * To get cropper position
   */
  getCropperPosition() {
    return {
      x1: this.imageCropper.cropper.x1,x2: this.imageCropper.cropper.x2,
      y1: this.imageCropper.cropper.y1, y2: this.imageCropper.cropper.y2
    };
  }

  /**
   * On Image cropper
   * @param event Cropper event
   */
  imageCropped(event: ImageCroppedEvent) {
    this.uploadedImage = event.base64;
  }

  /**
   * On upload image
   */
  uploadImages() {
    this.imageModal = true;
    this.imageExist = false;
    if (this.croppedImage === '') {
      this.mode = 'UPLOAD';
    } else {
      this.mode = 'REMOVE';
    }
  }

  /**
   * On Image select
   * @param event Input Event
   */
  onImageSelect(event: any): void {
    this.imageChangedEvent = event;
    this.imageExist = true;
  }

  /**
   * To rotate image
   */
  rotate(type) {
    if (type === 'left') {
      this.canvasRotation--;
    } else {
      this.canvasRotation++;
    }
    this.flipAfterRotate();
  }

  /**
   * To flip image after rotate
   */
  flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {...this.transform,flipH: flippedV,flipV: flippedH};
  }
}
