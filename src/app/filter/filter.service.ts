import { SharedService } from './../shared/shared.service';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay } from 'rxjs/operators'
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { PopUpService } from '../shared/pop-up/pop-up.service';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  bulkStatus = null;
  bulkGroup = [];
  bulkAssign = null;
  profileData: any;
  bulkAddTag = null;
  bulkSource = null;
  bulkGroupStatus = null;
  bulkCheckListStatus: null;
  groupProgramData = null;
  bulkdescription = null;
  bulkContact = null;
  bulkTagStatus = null;
  bulkTagSlug = null;
  bulkTagdescription = null;
  bulkTicketStatus = null;
  bulkTicketType = null;
  bulkTicketPriority = null;
  bulkTaskStatus = null;
  bulkEmailRemDate: any;
  bulkTasksPriority = null;
  bulkTaskType = null;
  next_follow_up = null;
  bulkEmployeeStatus = null;
  selectedCheckboxItem: any;
  allSelectedId: any = [];
  emailReminderTime: any;
  bulkSuper: any;
  bulkServiceStatus: any;
  bulkWebsite: any;
  bulkVendor: any;
  bulkServiceFee: any;
  bulkServiceTags: any;
  bulkfee: any;
  bulkTemplateType: any;
  bulkTransactionStatus: any;
  bulkstatusTRansaction: any;
  bulkTransactionType: any;
  defaultPropertyType = "Residential Sale";
  actual_closed_leased_date: any;
  estimated_closed_leased_date: string | number | Date;
  brokerage_status: any;
  bulkPublishedStatus: any;
  bulkSaleType: any;
  filterGroup: any;
  filterResult: any;
  bulksharedwith:any;
  bulkdeleteTemplate: any;
  updateProperty: any;
  updateBuilding: any;
  bulkTemplateTypeDate: any;
  bulkPropertyStatus: any;
  bulkserviceTypeStatus: any;
  bulklistexpdate: any;
  bulklistopenHouse: string | number | Date;
  bulklistopenHouseTimeTo: string | number | Date;
  bulklistopenHouseTimeFrom: string | number | Date;
  bulklistopenHouseType: string | number | Date;
  bulklistTotalcommission: string | number | Date;
  bulklistlistingagentBonus: string | number | Date;
  bulklistSellingagentBonus: string | number | Date;
  bulklistShowingagent: string | number | Date;
  bulklistfeatures: any;
  bulkWebsiteBlog: any;
  bulkwebsiteBlogTag: any;
  bulkWebsiteTag: any;
  bulkWebsiteCategory: any;
  bulkWebsiteProperty: any;
  bulkWebsiteBuilding: any;

  constructor(public sharedService: SharedService,
    public messageService: MessageService,
    readonly appService: AppService,
    readonly popUpService: PopUpService,
  ) { }

  public bulkUpdateContacts(payload): Observable<any> {
    const bulkUpdateContactsUrl = config.bulkUpdateContactsUrl;
    return this.sharedService.postData(bulkUpdateContactsUrl, payload);
  }

  public bulkUpdateWebsiteBlog(payload): Observable<any> {
    const bulkUpdateWebsiteBlogUrl = config.bulkUpdateWebsiteBlogUrl;
    return this.sharedService.postData(bulkUpdateWebsiteBlogUrl, payload);
  }

  public bulkUpdateProperty(payload): Observable<any> {
    const bulkUpdatePropertyUrl = config.bulkUpdatePropertyUrl;
    return this.sharedService.postData(bulkUpdatePropertyUrl, payload);
  }

  public bulkUpdatemergeContacts(payload): Observable<any> {
    const bulkUpdatemergeContactsUrl = config.bulkUpdatemergeContactsUrl;
    return this.sharedService.postData(bulkUpdatemergeContactsUrl, payload);
  }
  
  public bulkUpdateGroups(payload): Observable<any> {
    const bulkUpdateGroupsUrl = config.bulkUpdateGroupsUrl;
    return this.sharedService.postData(bulkUpdateGroupsUrl, payload);
  }

  public bulkUpdateTags(payload): Observable<any> {
    const bulkUpdateTagsUrl = config.bulkUpdateTagsUrl;
    return this.sharedService.postData(bulkUpdateTagsUrl, payload);
  }

  public bulkUpdateTickets(payload): Observable<any> {
    const bulkUpdateTicketsUrl = config.bulkUpdateTicketsUrl;
    return this.sharedService.postData(bulkUpdateTicketsUrl, payload);
  }

  public bulkUpdateTasks(payload): Observable<any> {
    const bulkUpdateTasksUrl = config.bulkUpdateTasksUrl;
    return this.sharedService.postData(bulkUpdateTasksUrl, payload);
  }

  private bulkUpdateEmployees(payload): Observable<any> {
    const bulkUpdateEmployeesUrl = config.bulkUpdateEmployeesUrl;
    return this.sharedService.postData(bulkUpdateEmployeesUrl, payload);
  }

  private bulkUpdateServices(payload): Observable<any> {
    const bulkUpdateServicessUrl = config.bulkUpdateServicessUrl;
    return this.sharedService.postData(bulkUpdateServicessUrl, payload);
  }

  public bulkUpdateTemplates(payload): Observable<any> {
    const bulkUpdateTemplatesUrl = config.bulkUpdateTemplatesUrl;
    return this.sharedService.postData(bulkUpdateTemplatesUrl, payload);
  }

  public bulkUpdateCampaigns(payload): Observable<any> {
    const bulkUpdateCampaignsUrl = config.bulkUpdateCampaignsUrl;
    return this.sharedService.postData(bulkUpdateCampaignsUrl, payload);
  }

  public bulkUpdateTransactions(payload): Observable<any> {
    const bulkUpdateTransactionsUrl = config.bulkUpdateTransactionsUrl;
    return this.sharedService.postData(bulkUpdateTransactionsUrl, payload);
  }

  public bulkUpdateChecklists(payload): Observable<any> {
    const bulkUpdateChecklistUrl = config.bulkUpdateChecklistUrl;
    return this.sharedService.postData(bulkUpdateChecklistUrl, payload);
  }


  updateContactsStatus(selectedContacts: Array<any>) {
    const payload = {
      contacts_status: {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkStatus
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  updateWebsiteBlogsStatus(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkWebsiteBlog
    };
    this.sendBulkUpdateRequestBlog(payload);
  }

  updateWebsiteTagStatus(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkWebsiteTag
    };
    this.popUpService.cmsupdateTags(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  updateWebsitePropertyStatus(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkWebsiteProperty
    };
    this.popUpService.cmsupdateProperty(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  updateWebsiteBuildingStatus(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkWebsiteBuilding
    };
    this.popUpService.cmsupdateBuilding(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  updateWebsiteCategoryStatus(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
        status: this.bulkWebsiteCategory
    };
    this.popUpService.cmsupdateCategory(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  deleteWebsiteTag(selectedContacts: Array<any>) {
    const payload = {
        ids: selectedContacts.map(obj => obj.id),
    };
    this.popUpService.deleteTagCms(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  deleteWebsiteBlogs(selectedContacts: Array<any>) {
    const payload = {
      ids: selectedContacts.map(obj => obj.id),
    };
    this.popUpService.deleteWebsiteBlog(payload).subscribe((res) => {
      this.appService.showLoader(true);
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
}

deleteWebsiteCategory(selectedContacts: Array<any>) {
  const payload = {
    ids: selectedContacts.map(obj => obj.id),
  };
  this.popUpService.deleteWebsiteCategory(payload).subscribe((res) => {
    this.appService.showLoader(true);
    this.appService.updateSelectedContacts([]);
    this.appService.getUpdatedContactData(true);
    this.appService.showLoader(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
  }, e => {
  })
}

deleteWebsiteProperty(selectedContacts: Array<any>) {
  const payload = {
    ids: selectedContacts.map(obj => obj.id),
  };
  this.popUpService.deleteWebsiteProperty(payload).subscribe((res) => {
    this.appService.showLoader(true);
    this.appService.updateSelectedContacts([]);
    this.appService.getUpdatedContactData(true);
    this.appService.showLoader(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
  }, e => {
  })
}

deleteWebsiteBuilding(selectedContacts: Array<any>) {
  const payload = {
    ids: selectedContacts.map(obj => obj.id),
  };
  this.popUpService.deleteWebsiteBuilding(payload).subscribe((res) => {
    this.appService.showLoader(true);
    this.appService.updateSelectedContacts([]);
    this.appService.getUpdatedContactData(true);
    this.appService.showLoader(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
  }, e => {
  })
}

 updateTagWebsiteBlogs(selectedContacts: Array<any>) {
  const payload = {
    ids: selectedContacts.map(obj => obj.id),
    status: this.bulkwebsiteBlogTag,
  };
  this.popUpService.deleteWebsiteBlog(payload).subscribe((res) => {
    this.appService.showLoader(true);
    this.appService.updateSelectedContacts([]);
    this.appService.getUpdatedContactData(true);
    this.appService.showLoader(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
  }, e => {
  })
}

  deleteContactsStatus(selectedContacts: Array<any>) {
    const payload = {
      contact_delete: {
        ids: selectedContacts.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  mergeContactsStatus(selectedContacts: Array<any>) {
    const payload = {
        'contact_id': selectedContacts.map(obj => obj.id),
    };
    this.sendBulkUpdatemergeRequest(payload);
  }

  updateContactsGroups(selectedContacts: Array<any>, list = []) {
    const payload = {
      groups: {
        ids: selectedContacts.map(obj => obj.id),
        groups: this.bulkGroup
      }
    };
    this.bulkGroup = [];
    this.sendBulkUpdateRequest(payload);
  }


  assignContactsGroups(selectedContacts: Array<any>) {
    const payload = {
      assigned_to: {
        ids: selectedContacts.map(obj => obj.id),
        assigned_to: this.bulkAssign.id
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  updateContactsAddTag(selectedContacts: Array<any>, val) {
    const payload = {
      tags: {
        ids: selectedContacts.map(obj => obj.id),
        tags: val.map(obj => obj.id)
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  followupContact(selectedContacts: Array<any>) {
    const payload = {
      follow_up: {
        ids: selectedContacts.map(obj => obj.id),
        next_follow_up: new Date(this.next_follow_up).getTime() / 1000
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  modifyContactsSource(selectedContacts: Array<any>) {
    const payload = {
      source: {
        ids: selectedContacts.map(obj => obj.id),
        source: this.bulkSource
      }
    };
    this.sendBulkUpdateRequest(payload);
  }

  updateGroupsStatus(selectedGroups: Array<any>) {
    const payload = {
      active_status: {
        ids: selectedGroups.map(obj => obj.group_id),
        active_status: this.bulkGroupStatus
      }
    };
    this.sendBulkUpdateGroupRequest(payload);
  }

  updateGroupsDescription(selectedGroups: Array<any>) {
    const payload = {
      description: {
        ids: selectedGroups.map(obj => obj.group_id),
        description: this.bulkdescription
      }
    };
    this.sendBulkUpdateGroupRequest(payload);
  }

  updateGroupsContact(selectedContacts: Array<any>) {
    const payload = {
      update_contacts: {
        ids: selectedContacts.map(obj => obj.group_id),
        contacts: this.bulkContact.map(obj => obj.id)
      }
    };
    this.sendBulkUpdateGroupRequest(payload);
  }

  deleteGroupssStatus(selectedContacts: Array<any>) {
    const payload = {
      group_delete: {
        ids: selectedContacts.map(obj => obj.group_id),
      }
    };
    this.sendBulkUpdateGroupRequest(payload);
  }

  updateTagStatus(selectedGroups: Array<any>) {
    const payload = {
      active_status: {
        ids: selectedGroups.map(obj => obj.tag_id),
        active_status: this.bulkTagStatus
      }
    };
    this.sendBulkUpdateTagRequest(payload);
  }

  deleteTagsStatus(selectedContacts: Array<any>) {
    const payload = {
      tags_delete: {
        ids: selectedContacts.map(obj => obj.tag_id),
      }
    };
    this.sendBulkUpdateTagRequest(payload);
  }

  updateTagSlug(selectedGroups: Array<any>) {
    const payload = {
      slug: {
        ids: selectedGroups.map(obj => obj.tag_id),
        slug: this.bulkTagSlug
      }
    };
    this.sendBulkUpdateTagRequest(payload);
  }


  updateTagsDescription(selectedGroups: Array<any>) {
    const payload = {
      description: {
        ids: selectedGroups.map(obj => obj.tag_id),
        description: this.bulkTagdescription
      }
    };
    this.sendBulkUpdateTagRequest(payload);
  }

  updateTicketStatus(selectedGroups: Array<any>) {
    const payload = {
      status: {
        ids: selectedGroups.map(obj => obj.id),
        status: this.bulkTicketStatus
      }
    };
    this.sendBulkUpdateTicketRequest(payload);
  }

  updateTicketType(selectedGroups: Array<any>) {
    const payload = {
      type: {
        ids: selectedGroups.map(obj => obj.id),
        type: this.bulkTicketType
      }
    };
    this.sendBulkUpdateTicketRequest(payload);
  }

  updateTicketPriority(selectedGroups: Array<any>) {
    const payload = {
      priority: {
        ids: selectedGroups.map(obj => obj.id),
        priority: this.bulkTicketPriority
      }
    };
    this.sendBulkUpdateTicketRequest(payload);
  }

  deleteTicketStatus(selectedContacts: Array<any>) {
    const payload = {
      ticket_delete: {
        ids: selectedContacts.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateTicketRequest(payload);
  }

  updateTaskStatus(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      status: {
        ids: this.allSelectedId,
        status: this.bulkTaskStatus
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }

  calculateAllID(selectedGroups) {
    this.allSelectedId = []
    for (const key of selectedGroups) {
      this.selectedCheckboxItem = key.data.filter((res) => {
        if (res.selected === true) {
          return res;
        }
      })
      for (const val of this.selectedCheckboxItem) {
        this.allSelectedId.push(val.id)
      }
    }

  }

  updateTaskType(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      type: {
        ids: this.allSelectedId,
        type: this.bulkTaskType
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }


  deleteTaskStatus(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      task_delete: {
        ids: this.allSelectedId,
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }

  updateTaskPriority(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      priority: {
        ids: this.allSelectedId,
        priority: this.bulkTasksPriority
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }

  updateTaskEmailRemainder(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      email_reminder_date: {
        ids: this.allSelectedId,
        email_reminder_date: new Date(this.bulkEmailRemDate).getTime() / 1000
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }

  updateTaskTimeRemainder(selectedGroups: Array<any>) {
    this.calculateAllID(selectedGroups);
    const payload = {
      email_reminder_time: {
        ids: this.allSelectedId,
        email_reminder_time: new Date(this.emailReminderTime).getTime() / 1000
      }
    };
    this.sendBulkUpdateTasksRequest(payload);
  }

  updateEmployeeStatus(selectedGroups: Array<any>) {
    const payload = {
      emp_status: {
        ids: selectedGroups.map(obj => obj.id),
        emp_status: this.bulkEmployeeStatus
      }
    };
    this.sendBulkUpdateEmployeesRequest(payload);
  }

  deleteEmployeeStatus(selectedGroups: Array<any>) {
    const payload = {
      is_deleted: selectedGroups.map(obj => obj.id),
    };
    this.popUpService.deleteEmployeeStatus(payload).subscribe((res) => {
       this.appService.updateSelectedDataAdded([]);
      this.appService.getUpdatedData(true);
      if (res["body"]["Not Deleted"] && res["body"]["Not Deleted"].length > 0) {
        res && this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: res["body"]["message"]
        });
      }
      else {
        res && this.messageService.add({
          severity: 'success', summary: 'Success',
          detail: res["body"]["message"]
        });
      }
    },
      (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message });
      });
}
  updateEmployeeSuper(selectedGroups: Array<any>) {
    const payload = {
      supervisor: {
        ids: selectedGroups.map(obj => obj.user_id),
        supervisor: this.bulkSuper.id
      }
    };
    this.sendBulkUpdateEmployeesRequest(payload);
  }

  filterValidGroup(val) {
    this.filterGroup = val.filter((res) => {
      if (res.selected) {
        return true
      }
    })
    this.filterResult = this.filterGroup.every((currentValue) => currentValue.groups === this.filterGroup[0].groups)
    if (this.filterResult) {
      return true;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please Select Similar Roles" });
      return false;
    }
  }
  condition(val) {
    return false;
  }
  updateServiceProviderStatus(selectedGroups: Array<any>) {
    const payload = {
      active_status: {
        ids: selectedGroups.map(obj => obj.id),
        active_status: this.bulkServiceStatus
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateServiceProviderGroup(selectedGroups: Array<any>) {
    const payload = {
      groups: {
        ids: selectedGroups.map(obj => obj.id),
        groups: this.bulkGroup
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateServiceProviderWebsite(selectedGroups: Array<any>) {
    const payload = {
      add_to_website: {
        ids: selectedGroups.map(obj => obj.id),
        add_to_website: this.bulkWebsite
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateServiceProviderVendor(selectedGroups: Array<any>) {
    const payload = {
      approved_vendor: {
        ids: selectedGroups.map(obj => obj.id),
        approved_vendor: this.bulkVendor
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateServiceProviderfee(selectedGroups: Array<any>) {
    const payload = {
      fee: {
        ids: selectedGroups.map(obj => obj.id),
        fee: this.bulkfee
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateServiceProviderTag(selectedGroups: Array<any>, val) {
    const payload = {
      tags: {
        ids: selectedGroups.map(obj => obj.id),
        tags: val.map(obj => obj.id)
      }
    };
    this.sendBulkUpdateServicesRequest(payload);
  }

  updateTemplateType(selectedGroups: Array<any>) {
    const payload = {
      type: {
        ids: selectedGroups.map(obj => obj.id),
        type: this.bulkTemplateType
      }
    };
    this.sendBulkUpdateTemplatesRequest(payload);
  }

  sharedTemplateType(selectedGroups: Array<any>) {
    const payload = {
      shared_with: {
        ids: selectedGroups.map(obj => obj.id),
        shared_with: this.bulksharedwith
      }
    };
    this.sendBulkUpdateTemplatesRequest(payload);
  }

  deleteTemplate(selectedGroups: Array<any>) {
    const payload = {
      template_delete: {
        ids: selectedGroups.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateTemplatesRequest(payload);
  }

  deleteCampaign(selectedGroups: Array<any>) {
    const payload = {
      program_delete: {
        ids: selectedGroups.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateCampaignsRequest(payload);
  }

  updateProgramGroups(selectedGroups: Array<any>) {
    const payload = {
      groups: {
        ids: selectedGroups.map(obj => obj.id),
        groups: [this.groupProgramData]
      }
    };
    this.sendBulkUpdateCampaignsRequest(payload);
  }

  updateProgramSchedule(selectedGroups: Array<any>) {
    const payload = {
      schedule_campaign: {
        ids: selectedGroups.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateTemplatesRequest(payload);
  }

  updateTransactionStatus(selectedGroups: Array<any>) {
    const payload = {
      active_status: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        active_status: this.bulkTransactionStatus,
      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  deleteTransaction(selectedGroups: Array<any>) {
    const payload = {
      transaction_delete: {
        ids: selectedGroups.map(obj => obj.transaction_id),
      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateTransactionsStatus(selectedGroups: Array<any>) {
    const payload = {
      transaction_status: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        transaction_status: this.bulkstatusTRansaction,
      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateTransactionsTypes(selectedGroups: Array<any>) {
    const payload = {
      transaction_type: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        transaction_type: this.bulkTransactionType,
      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateTransactionsSaleTypes(selectedGroups: Array<any>) {
    const payload = {
      sale_type: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        sale_type: this.bulkSaleType,
      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateActualClosedDate(selectedGroups: Array<any>) {
    const payload = {
      actual_closed_leased_date: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        actual_closed_leased_date: new Date(this.actual_closed_leased_date).getTime() / 1000

      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateEstimatedClosedDate(selectedGroups: Array<any>) {
    const payload = {
      estimated_closing_leased_date: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        estimated_closing_leased_date: new Date(this.estimated_closed_leased_date).getTime() / 1000

      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateBrokerageStatus(selectedGroups: Array<any>) {
    const payload = {
      brokerage_status: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        brokerage_status: this.brokerage_status

      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }


  updateSaveStatus(selectedGroups: Array<any>) {
    const payload = {
      save_status: {
        ids: selectedGroups.map(obj => obj.transaction_id),
        publish_status: this.bulkPublishedStatus

      }
    };
    this.sendBulkUpdateTransactionsRequest(payload);
  }

  updateTransactionsCheckListStatus(selectedGroups: Array<any>) {
    const payload = {
      active_status: {
        ids: selectedGroups.map(obj => obj.id),
        active_status: this.bulkCheckListStatus,
      }
    };
    this.sendBulkUpdateTransactionsChecklist(payload);
  }

  deleteTransactionCheckList(selectedGroups: Array<any>) {
    const payload = {
      checklist_delete: {
        ids: selectedGroups.map(obj => obj.id),
      }
    };
    this.sendBulkUpdateTransactionsChecklist(payload);
  }
  updatePropertyStatus(selectedContacts: Array<any>, modelType =  this.defaultPropertyType) {
    const payload = {
      active_status: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        active_status: this.bulkPropertyStatus
      }
    };
    this.sendBulkPropertyRequest(payload);
  }


  updateServiceTypeStatus(selectedContacts: Array<any>) {
    const payload = {
      service_type: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        service_type: this.bulkserviceTypeStatus
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateListExpDateStatus(selectedContacts: Array<any>) {
    const payload = {
      listing_exper_date: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        listing_exper_date:  new Date(this.bulklistexpdate).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateopenHouseDateStatus(selectedContacts: Array<any>) {
    const payload = {
      open_house_date: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        open_house_date:  new Date(this.bulklistopenHouse).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateopenhouseTimeStatus(selectedContacts: Array<any>) {
    const payload = {
      open_house_times_to: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        open_house_times_to:  new Date(this.bulklistopenHouseTimeTo).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateopenhouseTimeFromStatus(selectedContacts: Array<any>) {
    const payload = {
      open_house_times_from: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        open_house_times_from:  new Date(this.bulklistopenHouseTimeFrom).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateopenHouseTypeStatus(selectedContacts: Array<any>) {
    const payload = {
      open_house_type: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        open_house_type:  new Date(this.bulklistopenHouseType).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  deletepropertyListingStatus(selectedContacts: Array<any>) {
    const payload = {
      property_delete: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateTotalCommissionStatus(selectedContacts: Array<any>) {
    const payload = {
      total_commission: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        total_commission:  new Date(this.bulklistTotalcommission).getTime() / 1000,
        total_commission_unit:  new Date(this.bulklistTotalcommission).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateListingagentBonusStatus(selectedContacts: Array<any>) {
    const payload = {
      listing_agent_bonus: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        listing_agent_bonus:  new Date(this.bulklistlistingagentBonus).getTime() / 1000,
        listing_agent_bonus_unit:  new Date(this.bulklistlistingagentBonus).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateSellingagentBonusStatus(selectedContacts: Array<any>) {
    const payload = {
      selling_agent_bonus: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        selling_agent_bonus:  new Date(this.bulklistSellingagentBonus).getTime() / 1000,
        selling_agent_bonus_unit:  new Date(this.bulklistSellingagentBonus).getTime() / 1000
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updateShowingagentStatus(selectedContacts: Array<any>) {
    const payload = {
      showing_agent: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        showing_agent:  new Date(this.bulklistShowingagent).getTime() / 1000,
      }
    };
    this.sendBulkPropertyRequest(payload);
  }

  updatefeatureStatus(selectedContacts: Array<any>) {
    const payload = {
      features: {
        ids: selectedContacts.map(obj => obj.id),
        model: this.defaultPropertyType,
        features:  [this.bulklistfeatures]
      }
    };
    this.sendBulkPropertyRequest(payload);
  }
  
  sendBulkUpdateRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateContacts(payload).subscribe(res => {
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateRequestBlog(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateWebsiteBlog(payload).subscribe(res => {
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    });
  }

  sendBulkPropertyRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateProperty(payload).subscribe(res => {
      this.appService.updateSelecteProviders([]);
      this.appService.getUpdatedDataProperty(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdatemergeRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdatemergeContacts(payload).subscribe(res => {
      this.appService.updateSelectedContacts([]);
      this.appService.getUpdatedContactData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateGroupRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateGroups(payload).subscribe(res => {
      this.appService.updateSelectedGroups([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTagRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateTags(payload).subscribe(res => {
      this.appService.updateSelectedTags([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTicketRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateTickets(payload).subscribe(res => {
      this.appService.updateSelectedTickets([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTasksRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateTasks(payload).subscribe(res => {
      this.appService.updateSelectedServiceProviders([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateEmployeesRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateEmployees(payload).subscribe(res => {
      this.appService.updateSelectedDataAdded([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateServicesRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateServices(payload).subscribe(res => {
      this.appService.updateSelectedDataAdded([]);
      this.appService.getUpdatedServiceProviderData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTemplatesRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateTemplates(payload).subscribe(res => {
      this.appService.updateSelectedTemplates([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateCampaignsRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateCampaigns(payload).subscribe(res => {
      this.appService.updateSelectedPrograms([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTransactionsRequest(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateTransactions(payload).subscribe(res => {
      this.appService.updateSelectedDataAdded([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }

  sendBulkUpdateTransactionsChecklist(payload) {
    this.appService.showLoader(true);
    this.bulkUpdateChecklists(payload).subscribe(res => {
      this.appService.updateSelectedDataAdded([]);
      this.appService.getUpdatedData(true);
      this.appService.showLoader(false);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.body.message });
    }, e => {
    })
  }
  postBlog(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.postBlog(url, data).pipe(shareReplay(1));
  }
  createNewBlog(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.createNewBlog(url, data).pipe(shareReplay(1));
  }
  publishNewBlog(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.createNewBlog(url, data).pipe(shareReplay(1));
  }
  createSeo(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl
    return this.sharedService.postData(url, data).pipe(shareReplay(1));
  }
  createNewCommunity(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl
    return this.sharedService.postData(url, data).pipe(shareReplay(1));
  }
  createNewBuilding(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.postData(url, data).pipe(shareReplay(1));
  }
  createNewProperty(data): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.postData(url, data).pipe(shareReplay(1));
  }
  editBlog(data, id): Observable<any> {
    const editBlogurl = config.addUpdateAnnouncementUrl + id + `/`;
    return this.sharedService.postBlogUpdate(editBlogurl, data).pipe(shareReplay(1));
  }
}