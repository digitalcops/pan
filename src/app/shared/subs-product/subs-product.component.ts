import { productTypeOption } from './subs-product.model';
import { SubscriptionService } from './../../subscription/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { AppExService } from '../../app-ex.service';
@Component({
  selector: 'app-subs-product',
  templateUrl: './subs-product.component.html',
  styleUrls: ['./subs-product.component.scss'],
})
export class SubsProductComponent implements OnInit, OnDestroy {
  @Output() closeCalendar = new EventEmitter();
  @Input() calenderData;
  @Input() fromHeader;
  productTypeOption= productTypeOption;
  isDisplay = false;
  activeCategory = 1;
  countSubscription: Subscription;
  eventSubs: Subscription;
  contactCheckSource: Subscription;
  serviceProviderCheckSource: Subscription;
  checkedListSubscription: Subscription;
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
  listSubscriptionPlan = [];
  listTax = [];
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

  getTransactions(): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getAllPlans({page:1, limit: 1000}).subscribe((response) => {
      this.listSubscriptionPlan = response.body.results.map((obj)=> {
        return ({
          label: obj.name,
          value: obj.id,
        });
      });
    });
    this.subscriptionService.getTaxes({page:1, limit: 1000}).subscribe((response) => {
      this.listTax = response.body.results.map((obj)=> {
        return ({
          label: `${obj.tax_name} (${obj.tax_value}${obj.tax_type === 'percentage' ? '%' : ''})`,
          value: obj.id,
        });
      });
    });
  }

  ngOnInit() {
    this.assignedOptions = new Array();
    this.subscriptionService.productsDataForm = null;
    this.getTransactions();
    if(!this.calenderData) 
    {
      this.uuid = null;
      this.callid = 0;
    }
    else {
      this.calenderData = (this.calenderData && this.calenderData.state) ? this.calenderData.state : this.calenderData;
      this.callid = ((this.calenderData && this.calenderData.callid) ? this.calenderData.callid : 0);
      this.uuid = ((this.calenderData && this.calenderData.id) ? this.calenderData.id : null);
    }
    this.updateUIData();
  }

  changeactiveCategoryFunction(tab: number) {
    this.activeCategory = tab;
  }

  updateUIData() {
    if (this.uuid && (this.uuid !== '')) {
      this.getFormData();
    }
    else {
      this.subscriptionService.getProductsModel();
      this.appService.showCustomLoader(false);
    }
  }

  getFormData() {
    this.subscriptionService.getProductsModel(this.calenderData);
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
    this.appService.updateSubProductPopup({state: inUpdateData});
  }
  
  sendMessages() {
    this.subscriptionService.showProductFormError = true;
    if (this.subscriptionService.productsDataForm.valid) {
      const payload = this.subscriptionService.prepareProductPayload();
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
    this.subscriptionService.createProducts(payload).subscribe((response) => {
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
    this.subscriptionService.updateProducts(payload, this.uuid).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  ngOnDestroy(): void {
    this.countSubscription && this.countSubscription.unsubscribe();
    this.contactCheckSource && this.contactCheckSource.unsubscribe();
    this.checkedListSubscription && this.checkedListSubscription.unsubscribe();
    this.checkedListSubscription && this.checkedListSubscription.unsubscribe();
    this.eventSubs && this.eventSubs.unsubscribe();
  }
}
