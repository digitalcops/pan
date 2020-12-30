import { Subscription } from 'rxjs';
import { SubscriptionService } from '../subscription.service';
import { Utils } from '../../utils';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { MessageService as PMessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { paymentsOptions, sourceOptions, statusOptions } from './add-sales-team.model';
import * as braintree from 'braintree-web';

@Component({
  selector: 'app-add-quotaions',
  templateUrl: './add-sales-team.component.html',
  styleUrls: ['./add-sales-team.component.scss', '../../../assets/stylesheets/detail-page.scss'],
})
export class AddSalesTeamComponent implements OnInit {
  @ViewChild('addTemplateForm') addTemplateForm: FormGroupDirective;
  token = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTURrek1UUXhNalFzSW1wMGFTSTZJbVpqTkROa09URXlMVEJtTmpRdE5HVm1ZeTA1WmpRMExUbG1NamN6WkRnNU1UQmxNeUlzSW5OMVlpSTZJbVJtZERWcmFtWmpjREp3TkhSd2VtZ2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pWkdaME5XdHFabU53TW5BMGRIQjZhQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5Lll4bWs0MTR2VmRNeGV0WlRfU0NIcERCMDlfcTFvSXQ1dmZqUHZ2b21zNlhzVVBZVkJqSnBuQTBoS0lLR09hTU9uZXJacFUwd3hHYVVDN1pzTW1Gb1dnIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RmdDVramZjcDJwNHRwemgvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGZ0NWtqZmNwMnA0dHB6aC9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6ImRmdDVramZjcDJwNHRwemgiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2RmdDVramZjcDJwNHRwemgifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiT29kbGVzIFRlY2hub2xvZ2llcyIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6Im9vZGxlc3RlY2hub2xvZ2llcyIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ==';
  sourceOptions = sourceOptions;
  statusOptions = statusOptions;
  paymentsOptions = paymentsOptions;
  templateId: number;
  maxChars = 2000;
  total = 0;
  page = 1;
  rowNumber = 0;
  activeCategory = 1;
  pageSize = 50;
  rows = 50;
  remainChars = 0;
  viewState = true;
  loggedInUser: string;
  selectedchecklistItem = 0;
  selectAllCheckbox: boolean;
  customerList = [];
  salesTeamList = [];
  taxList = [];
  productsList = [];
  salesPersonList = [];
  isActiveList = [
    {label: "Active", value: true},
    {label: "Inactive", value: false}
  ];
  addOrderLine = false;
  data = {}
  checklistData = [];
  allData = null;
  saleOrderId = 0;
  optionalProductCols = [];
  checklistCols = [
    { field: 'doc', header: 'Product' },
    { field: 'notes', header: 'Description' },
    { field: 'responsibility', header: 'Responsibility' },
    { field: 'mandatory', header: 'Quantity' },
    { field: 'common', header: 'Unit Price' },
    { field: 'duedate', header: 'Taxes' },
    { field: 'snooze', header: 'Subtotal' },
    { field: 'edit', header: 'Action' },
  ];
  openProductSubs: Subscription;

  saleData = {
    selected: false,
    sale_order: 0,
    id: 0,
    product: false,
    description: false,
    responsibility: null,
    quantity: null,
    unit_price: null,
    tax: null,
    subtotal: null,
  };
  hostedFieldsInstance: braintree.HostedFields;
  cardholdersName: string = 'Govind Saini';
  constructor(
    public appService: AppService,
    public subscriptionService: SubscriptionService,
    public route: ActivatedRoute,
    public pMessageService: PMessageService,
    public router: Router,
    public messageService: MessageService,
    public httpclient: HttpClient,
    public utils: Utils,
  ) {
  }
  selectedFileName: string;
  ngAfterViewInit() { }

  ngOnInit() {
    this.subscriptionService.salesTeamDataForm = null;
    this.getModalData();
    this.openProductSubs = this.appService.openSubQuotation.subscribe(res => {
    });

    this.route.queryParams.subscribe((params) => {
      this.saleOrderId = params.id ? params.id : 0;
      if (this.saleOrderId !== 0) {
        this.getSaleOrderData();
      }
      else {
        this.subscriptionService.getSaleTeamModel();
        this.appService.showCustomLoader(false);
      }
    });
    this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
  }

  getModalData(): void {
    this.appService.showCustomLoader(true);
    this.subscriptionService.getSaleModalData().subscribe((response) => {
      this.salesPersonList = response[0].body.results.map((obj) => {
        return ({
          label: `${obj.full_name}`,
          value: obj.id
        })
      });
      this.appService.showCustomLoader(false);
    });
  }

  getSaleOrderData() {
    this.subscriptionService.getSingleSaleTeam(this.saleOrderId).subscribe((response) => {
      this.allData = response.data;
      this.subscriptionService.getSaleTeamModel(response.data);
    }, err => this.showError(err));
  }

  /**
 * On file select
 * @param event Input event
 */
  onFileSelect(event, rowData) {
    this.selectedFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('filename', this.selectedFileName);
    formData.append('inside_location', 'ticket_attachments');
    if (event.target.files[0].size > 2000000) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File size should not exceeds by 2mb' });
      return;
    }
    this.httpclient.post<any>(config.uploadFile, formData).subscribe((response) => {
      rowData.sample_document_url = response.url;
      rowData.sample_document_id = response.id;
      rowData.sample_document_name = this.utils.filterTicketAttachmentName(response.url)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    });
  }

  onAllEmployeeSelected(event) {
    this.selectedchecklistItem = event ? this.checklistData.length : 0;
    this.checklistData.forEach(obj => {
      obj.selected = event
    });
  }

  onSingleChecklistSelected() {
    this.selectedchecklistItem = 0;
    this.checklistData.forEach(obj => {
      if (obj.selected) {
        this.selectedchecklistItem += 1;
      }
    });
  }

  deleteChecklistItem() {
    this.checklistData = this.checklistData.filter(obj => !obj.selected);
    this.total = this.checklistData.length;
    this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
  }

  addChecklistItem() {
    this.saleData = {
      selected: false,
      id: 0,
      sale_order: this.saleOrderId,
      product: false,
      description: false,
      responsibility: null,
      quantity: null,
      unit_price: null,
      tax: null,
      subtotal: null,
    };
    this.addOrderLine = true;
  }

  onEditTransactionData(rowData) {
    this.saleData = {
      ...this.saleData,
      ...rowData,
      product: (rowData.product && rowData.product.id) ? rowData.product.id : rowData.product,
      tax: (rowData.tax && rowData.tax.id) ? rowData.tax.id : rowData.tax 
    };
    this.addOrderLine = true;
  }   

  addOrderLineRow(payload) {
    this.subscriptionService.createSaleOrderLine(payload).subscribe((response) => {
      this.checklistData.unshift({ ...this.saleData });
      this.addOrderLine = false;
      this.total = this.checklistData.length;
      this.appService.updateHeaderName({ name: 'Sales Team', count: this.total });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Sales Team created successfully" });
      this.getSaleOrderData();
    }, err => this.showError(err));
  }

  addToTable() {
    if (this.saleOrderId === 0) {
      if (this.subscriptionService.salesTeamDataForm.valid) {
        this.addFormInfo(this.subscriptionService.prepareSaleTeamPayload(), false);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill the fields for sales order first" });
      }
    }
    else {
      if(this.saleData.id === 0){
        const payload = {...this.saleData};
        delete payload.id;
        this.addOrderLineRow(payload);
      }
      else {
        const payload = { ...this.saleData };
        this.subscriptionService.updateSaleOrderLine(payload).subscribe((response) => {
         this.getSaleOrderData();
          this.showResMessage(response);
        }, err => this.showError(err));
      }
    }
  }

  loadChecklistItem(event) {
    this.rows = event.rows;
    this.pageSize = (event.first) + this.rows;
    this.rowNumber = (event.first) + 1;
    this.page = (event.first / this.rows) + 1;
  }

  showResMessage(response) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.body["message"] });
    this.appService.getUpdatedData(true);
    this.router.navigate(["subscription/sales-team"]);
  }

  updateFormInfo(payload) {
    this.subscriptionService.updateSaleTeam(payload, this.saleOrderId).subscribe((response) => {
      this.showResMessage(response);
    }, err => this.showError(err));
  }

  addFormInfo(payload, close = true) {
    this.subscriptionService.createSaleTeam(payload).subscribe((response) => {
      if (close) {
        this.showResMessage(response);
      }
      else {
        this.saleOrderId = response.body.data.id;
        this.saleData.sale_order = this.saleOrderId;
        this.addOrderLineRow(this.saleData);
      }
    }, err => this.showError(err));
  }

  addUpdateChecklist() {
    this.subscriptionService.showProductFormError = true;
    if (this.subscriptionService.salesTeamDataForm.valid) {
      const payload = this.subscriptionService.prepareSaleTeamPayload();
      if (this.saleOrderId !== 0) {
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

  showError(serverError) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong` });
  }

  ngOnDestroy() {
    this.openProductSubs && this.openProductSubs.unsubscribe();
  }


  createBraintreeUI() {
    braintree.client.create({
      authorization: this.token,
    }).then((clientInstance) => {
      braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          // Override styles for the hosted fields
        },

        // The hosted fields that we will be using
        // NOTE : cardholder's name field is not available in the field options
        // and a separate input field has to be used incase you need it
        fields: {
          cardholderName: {
            selector: '#cc-name',
            placeholder: 'Name as it appears on your card'
          },
          number: {
            selector: '#card-number',
            placeholder: '1111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '111'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY'
          },
          postalCode: {
            selector: '#postal-code',
            placeholder: '11111'
          }
        }
      }).then((hostedFieldsInstance) => {

        this.hostedFieldsInstance = hostedFieldsInstance;

        hostedFieldsInstance.on('focus', (event) => {
          const field = event.fields[event.emittedBy];
          const label = this.findLabel(field);
          label.classList.remove('filled'); // added and removed css classes
          // can add custom code for custom validations here
        });

        hostedFieldsInstance.on('blur', (event) => {
          const field = event.fields[event.emittedBy];
          const label = this.findLabel(field); // fetched label to apply custom validations
          // can add custom code for custom validations here
        });

        hostedFieldsInstance.on('empty', (event) => {
          const field = event.fields[event.emittedBy];
          // can add custom code for custom validations here
        });

        hostedFieldsInstance.on('validityChange', (event) => {
          const field = event.fields[event.emittedBy];
          const label = this.findLabel(field);
          if (field.isPotentiallyValid) { // applying custom css and validations
            label.classList.remove('invalid');
          } else {
            label.classList.add('invalid');
          }
          // can add custom code for custom validations here
        });
      });
    });
  }

  // Tokenize the collected details so that they can be sent to your server
  // called from the html when the 'Pay' button is clicked
  tokenizeUserDetails() {
    this.hostedFieldsInstance.tokenize({cardholderName: this.cardholdersName}).then((payload) => {
      console.log(payload);
      const data = {
        token: this.token,
        nonce_data: payload 
      };
      this.subscriptionService.createSaleTeam(data).subscribe((response) => {
        if (close) {
          this.showResMessage(response);
        }
        else {
          this.saleOrderId = response.body.data.id;
          this.saleData.sale_order = this.saleOrderId;
          this.addOrderLineRow(this.saleData);
        }
      }, err => this.showError(err));
      // submit payload.nonce to the server from here
    }).catch((error) => {
      console.log(error);
      // perform custom validation here or log errors
    });
  }

  // Fetches the label element for the corresponding field
  findLabel(field: braintree.HostedFieldsHostedFieldsFieldData) {
    return document.querySelector('.hosted-field--label[for="' + field.container.id + '"]');
  }









}
