import { durationTypeOption, termsTypeOption } from './subs-plan.model';
import { SubscriptionService } from './../../subscription/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { AppExService } from './../../app-ex.service';
@Component({
  selector: 'app-subs-plan',
  templateUrl: './subs-plan.component.html',
  styleUrls: ['./subs-plan.component.scss'],
})
export class SubsPlanComponent implements OnInit, OnDestroy {
  @Output() closeCalendar = new EventEmitter();
  @Input() calenderData;
  @Input() fromHeader;
  isDisplay = false;
  activeCategory = 1;
  durationTypeOption = durationTypeOption;
  termsTypeOption = termsTypeOption;
  countSubscription: Subscription;
  eventSubs: Subscription;
  contactCheckSource: Subscription;
  serviceProviderCheckSource: Subscription;
  checkedListSubscription: Subscription;
  activeIndex = 0;

  planOptions = [
    { label: 'Open', value: 'open' },
    { label: 'Close', value: 'close' },
    { label: 'Refunded', value: 'refunded' },
  ];
  config: any = {
    selector: 'textarea',
    menubar: false,
    placeholder: 'Enter Terms and Conditions',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: '  bold italic underline forecolor link codesample insertfile image  blockquote\ | \ ',
    content_css: '/assets/stylesheets/editor.css'
  };
  public selectedOptions: Array<SelectItem> = new Array<SelectItem>();
  public selectedItemsLabel = 'Select';
  @Output() onPanelHide: EventEmitter<any> = new EventEmitter<any>();

  maximizeScreen = false;
  minimizeScreen = false;

  @Input() callid = null;
  @Input() uuid = null;
  @Input() moduleType = null;
  constructor(
    public subscriptionService : SubscriptionService,
    public appService: AppService,
    public route: ActivatedRoute,
    public router: Router,
    readonly appExService: AppExService,
    public messageService: MessageService) { }
  
  assignedOptions = [];
  dropdownSettings = {
    showCheckbox: true,
    position: 'bottom',
    searchPlaceholderText: 'Search all records',
    enableCheckAll: true,
    enableSearchFilter: true,
    selectAllText: 'Select All',
    lazyLoading: true,
    unSelectAllText: 'Unselect All',
    classes: "myclass-custom-class",
    groupBy: "category"
  };

  ngOnInit() {
    this.assignedOptions = new Array();
    this.subscriptionService.plansDataForm = null;
    if(!this.calenderData) 
    {
      this.uuid = null;
      this.callid = 0;
    }
    else {
      this.calenderData = (this.calenderData && this.calenderData.state) ? this.calenderData.state : this.calenderData;
      this.uuid = ((this.calenderData && this.calenderData.id) ? this.calenderData.id : null);
    }
    this.updateUIData();
  }

  changeactiveCategoryFunction(tab: number) {
    this.activeCategory = tab;
  }

  changeStatusSub(item) {
    const payload = {status: item.value};
    if(this.uuid && this.uuid !== 0) {
      this.appService.showCustomLoader(true);
      this.subscriptionService.updateSingleFieldSubPlan(payload,this.uuid).subscribe((response) => {
        this.subscriptionService.plansDataForm.patchValue({
          status: item.value
        });
        this.planOptions.forEach((element, index) => {
          if (this.subscriptionService.plansDataForm.value.status === element.value) {
            this.activeIndex = index;
          }
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Status updated successfully" });
        this.appService.showCustomLoader(false);
      }, err => this.showError(err));
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please save the form, then update the status" });
    }
  }

  updateUIData() {
    if (this.uuid && (this.uuid !== '')) {
      this.getFormData();
    }
    else {
      this.subscriptionService.getPlansModel();
      this.appService.showCustomLoader(false);
    }
  }

  getFormData() {
    this.subscriptionService.getPlansModel(this.calenderData);
    this.appService.showCustomLoader(false);
  }

  minimizeWidth() {
    this.minimizeScreen = !this.minimizeScreen;
    this.maximizeScreen = false;
  }

  maximizewidth() {
    this.maximizeScreen = !this.maximizeScreen;
  }

  onCategoryChange() {

  }

  closeCalendarMethod(inUpdateData = false) {
    this.appService.updateSubPlanPopup({state: inUpdateData});
  }
  
  sendMessages() {
    this.subscriptionService.showPlanFormError = true;
    if (this.subscriptionService.plansDataForm.valid) {
      const payload = this.subscriptionService.preparePlanPayload();
      if (this.uuid) {
        this.updateFormInfo(payload);
      }
      else {
        this.addFormInfo(payload);
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Required field cannot be blank" });
    }
  }

  addFormInfo(payload) {
    this.subscriptionService.createPlans(payload).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  showError(serverError) {
    if ((typeof serverError.error.message === "object") ||
      (serverError.error.error && typeof serverError.error.error === "object")) {
      const message = serverError.error.error ? serverError.error.error : serverError.error.message.error;
      for (const key in message) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message[key].field} : ${message[key].message}` });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
    }
  }

  showResMessage(response) {
    this.closeCalendarMethod(false);
    this.appService.getUpdatedData(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.body["message"] });
  }

  updateFormInfo(payload) {
    this.subscriptionService.updatePlans(payload, this.uuid).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  ngOnDestroy(): void {
    this.subscriptionService.plansDataForm = null;
    this.countSubscription && this.countSubscription.unsubscribe();
    this.contactCheckSource && this.contactCheckSource.unsubscribe();
    this.checkedListSubscription && this.checkedListSubscription.unsubscribe();
    this.checkedListSubscription && this.checkedListSubscription.unsubscribe();
    this.eventSubs && this.eventSubs.unsubscribe();
  }
}
