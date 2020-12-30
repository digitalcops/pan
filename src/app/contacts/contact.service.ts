import { SharedService } from './../shared/shared.service';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getAllTransactionData(arg0: { page: number; limit: any; }) {
    throw new Error('Method not implemented.');
  }

  serviceProviderList: Array<any>;
  serviceProviderData: Array<any>;
  allEmpList: Array<any> = [];

  constructor(
    public sharedService: SharedService,
    public http: HttpClient,
    public messageService: MessageService,
  ) { }

  /**
   * To get tags list
   * @param page Page count
   */
  getTagsList(page): Observable<any> {
    const getTagsUrl = config.getTags;
    return this.sharedService.postData(getTagsUrl, page);
  }

  getSingleUserTicketData(id, type=""): Observable<any> {
    const getSinlgeUserTicket = `${config.getSinlgeUserTicket}?associated_id=${id}&category_type=${type}`;
    return this.sharedService.getData(getSinlgeUserTicket);
  }

  /**
   * To add social media link
   * @param data 
   */
  addSocialMediaLink(data): Observable<any> {
    const addLinkUrl = config.addSocialMediaLink;
    return this.sharedService.postData(addLinkUrl, data);
  }

  /**
   * To add social media link
   * @param data 
   */
  addServiceSocialMediaLink(data): Observable<any> {
    const addLinkUrl = config.addServiceSocialMediaLink;
    return this.sharedService.postData(addLinkUrl, data);
  }

  exportSelectedContact(selectedContactIds: Array<any>): void {
    const payload = {
      "contact_id": selectedContactIds
    };
    this.exportSelectedContacts(payload).subscribe((response) => {
      const file = new Blob([response], { type: 'text/csv;charset=utf-8' });
      saveAs(file, 'contacts.csv');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File exported successfully' });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
    });
  }

  /**
   * To add connection
   * @param data 
   */
  addConnection(data): Observable<any> {
    const addConnectionUrl = config.addConnectionLink;
    return this.sharedService.postData(addConnectionUrl, data);
  }

  /**
   * To update connection
   * @param data 
   */
  updateConnection(data): Observable<any> {
    const updateConnectionUrl = config.updateConnectionLink;
    return this.sharedService.putData(updateConnectionUrl, data);
  }

  /**
   * To delete connection
   * @param index 
   */
  deleteConnection(index): Observable<any> {
    const deleteConnectionUrl = config.deleteConnectionLink;
    return this.sharedService.deleteData(deleteConnectionUrl + `/${index}`);
  }
  

  /**
   * To get tag Activate/Deactivate
   * @param tagData Tag Data
   */
  updateTag(tagData): Observable<any> {
    const updateTagsUrl = config.updateTag;
    return this.sharedService.patchData(updateTagsUrl, tagData);
  }

  updateGroup(groupData): Observable<any> {
    const updateGroupUrl = config.updateGroup;
    return this.sharedService.patchData(updateGroupUrl, groupData);
  }

  updateTemplate(templateData): Observable<any> {
    const updateTemplateUrl = config.updateTemplate;
    return this.sharedService.patchData(updateTemplateUrl, templateData);
  }
  /**
   * To get contacts
   * @param data Page data
   */
  getContacts(data): Observable<any> {
    let url = config.getAllContactsUrl;
    url = url.replace(':page', data.page || 1).replace(':limit', data.limit || 1000);
    return this.sharedService.postData(url, data);
  }

  
  getHrmsMetaInfo(): Observable<any> {
    const getHrmsMetaDatatUrl = config.getHrmsMetaDatatUrl;
    return this.sharedService.getData(getHrmsMetaDatatUrl);
  }

  getInterExter(): Observable<any> {
    const getInterExterFeatures = config.getInterExterFeatures;
    return this.sharedService.getData(getInterExterFeatures);
  }
  

  getCommisionLimit(data): Observable<any> {
    const url = config.getAllCommisionUrl;
    return this.sharedService.patchData(url, data).pipe(shareReplay(1));
  }

  /**
   * To get service type
   * @param data Page data
   */
  getServiceType(): Observable<any> {
    if (this.serviceProviderList) {
      return of(this.serviceProviderList);
    }
    else {
      const serviceTypeUrl = config.getServiceType;
      return this.sharedService.getData(serviceTypeUrl);
    }
  }

  /**
 * To get service type
 * @param data Page data
 */
  addServiceType(payload): Observable<any> {
    const serviceTypeUrl = config.getServiceType;
    return this.sharedService.postData(serviceTypeUrl, payload);
  }

  /**
   * To get contacts
   * @param data Page data
   */
  getService(data): Observable<any> {
    const url = config.getServiceProviders;
    return this.sharedService.postData(url, data).pipe(shareReplay(1));
  }

  /**
  * To get contacts
  * @param data Page data
  */
  getAllServiceProvider(data = null): Observable<any> {
    const url = config.getServiceProviders;
    if (this.serviceProviderData) {
      return of(this.serviceProviderData);
    }
    else {
      return this.sharedService.postData(url, { page: 1, limit: 5000 }).pipe(shareReplay(1));
    }
  }

  /**
   * To get group list
   * @param page Page count
   */
  getGroupList(page): Observable<any> {
    const getGroupsUrl = config.getGroups;
    return this.sharedService.postData(getGroupsUrl, page);
  }

  /**
  * To get Group by Id
  * @param groupId groupId
  */
  getGroupById(groupId): Observable<any> {
    let getGroupByIdUrl = config.getGroupById;
    getGroupByIdUrl = getGroupByIdUrl.replace(':groupId', groupId);
    return this.sharedService.getData(getGroupByIdUrl);
  }

  /**
   * To get Task list
   * @param id id
   */
  getTasks(id, type = ""): Observable<any> {
    const getTasksUrl = `${config.getTasks}?associated_id=${id}&category_type=${type}`;
    return this.sharedService.getData(getTasksUrl);
  }

  /**
   * To get Ticket list
   * @param id id
   */
  getTicket(id, data): Observable<any> {
    let getTicket = config.getTickets;
    getTicket = getTicket.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.getData(getTicket);
  }


  /**
 * To get files list
 * @param id id
 */
  getFiles(id): Observable<any> {
    const getFilesUrl = config.getFiles;
    return this.sharedService.getData(getFilesUrl + id);
  }

  addTicket(id): Observable<any> {
    const addTicketUrl = config.addTicket;
    return this.sharedService.getData(addTicketUrl + id);
  }
  getDocuments(data): Observable<any> {
    const getTransactionUrl = config.getDocuments;
    return this.sharedService.patchData(getTransactionUrl, data);
  }

  /**
 * To get files list
 * @param id id
 */
  updateServiceProviderTags(payload) {
    const updateServiceProviderSpec = config.updateServiceProviderSpec;
    return this.sharedService.patchData(updateServiceProviderSpec, payload);
  }

  getUserDetail(id) {
    const viewContactUrl = config.getContactDetail;
    return this.sharedService.getData(viewContactUrl + id);
  }


  getServiceProviderDetail(id) {
    const viewProviderUrl = config.getProviderDetail;
    return this.sharedService.getData(viewProviderUrl + id);
  }

  /**
   * To update contacts
   * @param data Page data
   */
  updateUserDetail(data, id) {
    const updateContactUrl = config.updateContacts;
    return this.sharedService.putData(updateContactUrl, data);
  }

  /**
 * To addional info  contacts
 * @param data Page data
 */
  addionalUserInfo(data) {
    const updateContactUrl = config.updateContacts;
    return this.sharedService.putData(updateContactUrl, data);
  }

  updateContactStates(data) {
    const updateContactUrl = config.updateContacts;
    return this.sharedService.putData(updateContactUrl, data);
  }

  /**
   * To update sservice provider
   * @param data Page data
   */
  updateServiceProviderDetail(data, id) {
    const updateServiceProviderUrl = config.updateServiceProvider;
    return this.sharedService.putData(updateServiceProviderUrl, data);
  }

  /**
   * To delete attachment
   * @param data delete data
   */
  deleteAttachment(data) {
    const deleteAttachmentUrl = config.deleteFile;
    return this.sharedService.putData(deleteAttachmentUrl, data);
  }

  /**
   * To import CSV file
   * @param formData FormData
   */
  importCSV(formData) {
    const importContactUrl = config.importCSV;
    return this.sharedService.postData(importContactUrl, formData);
  }

  /**
   * To import CSV file
   * @param formData FormData
   */
  importServiceProviderCSV(formData) {
    const importServiceProviderUrl = config.importServiceProviderCSV;
    return this.sharedService.postData(importServiceProviderUrl, formData);
  }

  /**
   * To export contacts
   */
  exportContacts() {
    const exportContactUrl = config.exportCSV;
    return this.http.get<Blob>(exportContactUrl, { responseType: 'blob' as 'json' });
  }

  /**
  * To export contacts
  */
  exportModuleData(url) {
    const exportContactUrl = config.genericExportUrl + url;
    return this.http.get<Blob>(exportContactUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To export all playbooks
   */
  exportAllPlaybooks() {
    const exportPlaybookUrl = config.exportPlaybookCSV;
    return this.http.get<Blob>(exportPlaybookUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To export selected playbooks
   */
  exportSelectedPlaybooks(payload: any) {
    const exportSelectedPlaybookUrl = config.exportSelectedPlaybookCSV;
    return this.http.post<Blob>(exportSelectedPlaybookUrl, payload, { responseType: 'blob' as 'json' });
  }

  /**
 * To export all contacts
 */
  exportAllContacts() {
    const exportContactUrl = config.exportCSV;
    return this.http.get<Blob>(exportContactUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To export selected contacts
   */
  exportSelectedContacts(payload: any) {
    const exportSelectedContactUrl = config.exportSelectedContactCSV;
    return this.http.post<Blob>(exportSelectedContactUrl, payload, { responseType: 'blob' as 'json' });
  }

  /**
   * To export all groups
   */
  exportAllGroups() {
    const exportGroupUrl = config.exportGroupCSV;
    return this.http.get<Blob>(exportGroupUrl, { responseType: 'blob' as 'json' });
  }

  /**
 * To export selected groups
 */
  exportSelectedGroups(payload: any) {
    const exportSelectedGroupUrl = config.exportGroupCSV;
    return this.http.post<Blob>(exportSelectedGroupUrl, payload, { responseType: 'blob' as 'json' });
  }

  /**
   * To export all tags
   */
  exportAllTags() {
    const exportTagUrl = config.exportTagCSV;
    return this.http.get<Blob>(exportTagUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To export all service providers
   */
  exportAllServiceProviders() {
    const exportServiceProviderUrl = config.exportServiceProviderCSV;
    return this.http.get<Blob>(exportServiceProviderUrl, { responseType: 'blob' as 'json' });
  }

  /**
 * To export selected Service Provider
 */
  exportSelectedServiceProviders(payload: any) {
    const exportSelectedServiceProviderUrl = config.exportServiceProviderCSV;
    return this.http.post<Blob>(exportSelectedServiceProviderUrl, payload, { responseType: 'blob' as 'json' });
  }

  /**
   * To export selected tags
   */
  exportSelectedTags(payload: any) {
    const exportSelectedTagUrl = config.exportTagCSV;
    return this.http.post<Blob>(exportSelectedTagUrl, payload, { responseType: 'blob' as 'json' });
  }

  /**
   * To get activity
   * @param contactId Selected contact Id
   */
  getActivity(contactId, type) {
    let getActivityUrl = config.getActivity;
    getActivityUrl = getActivityUrl.replace(':contactId', contactId) + type;
    return this.sharedService.getData(getActivityUrl);
  }

  getCallLog(callId) {
    let getCallLogUrl = config.getCallLogUrl;
    getCallLogUrl = getCallLogUrl + callId;
    return this.sharedService.getData(getCallLogUrl);
  }

  getCallNotes(contactId, type): Observable<any> {
    const getCallActivity = config.getCallActivity;
    return this.sharedService.postData(getCallActivity, { "types": type, "id": contactId });
  }

  changeCallStatus(payload): Observable<any> {
    const addUpdateCallNoteUrl = config.addUpdateCallNoteUrl;
    return this.sharedService.patchData(addUpdateCallNoteUrl, payload);
  }

  /**
   * To update specific contact field
   * @param data Data to update
   */
  updateContactField(data) {
    const updateContactUrl = config.updateContactSpec;
    return this.sharedService.patchData(updateContactUrl, data);
  }

  updateTransactionSpec(data) {
    const updateTransactionUrl = config.updateTransactionSpec;
    return this.sharedService.patchData(updateTransactionUrl, data);
  }

  /**
   * To Get all forms the user created.
   * @param data form id
   */
  getUserAllPlaybookForms(payload) {
    const getAllPlaybookFormsUrl = config.getAllPlaybookFormsUrl;
    return this.sharedService.postData(getAllPlaybookFormsUrl, payload);
  }

  /**
  * To Publish the form
  * @param data form id
  */
  publishPlaybookForm(payload) {
    const publishPlaybookFormUrl = config.publishPlaybookFormUrl;
    return this.sharedService.patchData(publishPlaybookFormUrl, payload);
  }

  /**
  * get all published Play book form
  * @param data form id
  */
  getPublishedPlaybookFormData() {
    const getPublishedPlaybookUrl = config.getPublishedPlaybookUrl;
    return this.sharedService.getData(getPublishedPlaybookUrl);
  }

  /**
   * get all contacts playbook
   * @param data form id
   */
  getContactsPlaybook(id) {
    const getContactsPlaybookUrl = config.getContactsPlaybookUrl + id;
    return this.sharedService.getData(getContactsPlaybookUrl);
  }

  /**
   * To Get the playbook from data via ID
   * @param data form id
   */
  getPlaybookFromID(playbook_id) {
    const getPlaybookFromIDUrl = config.getPlaybookFromIDUrl + playbook_id;
    return this.sharedService.getData(getPlaybookFromIDUrl);
  }
  /**
    * To Get the playbook from data via ID
    * @param data form id
    */
  getLayoutidxFromID(Layoutidx_id) {
    const getLayoutidxFromIDUrl = config.getLayoutidxFromIDUrl + Layoutidx_id;
    return this.sharedService.getData(getLayoutidxFromIDUrl);
  }
  /**
   * To Publish the form
   * @param data payload
   */
  activatePlaybookForm(payload) {
    const activatePlaybookFormUrl = config.activatePlaybookFormUrl;
    return this.sharedService.patchData(activatePlaybookFormUrl, payload);
  }

  /**
  * Save Data of the forms values
  * @param data formData
  */
  savePlaybookFormData(formData) {
    const savePlaybookFormValuesUrl = config.savePlaybookFormValuesUrl;
    return this.sharedService.postData(savePlaybookFormValuesUrl, formData);
  }

  /**
   * get all contacts playbook
   * @param data form id
   */
  getFilledPlaybook(id) {
    const getFilledPlaybookUrl = config.getFilledPlaybookUrl + id;
    return this.sharedService.getData(getFilledPlaybookUrl);
  }

  updateFilledPlaybook(formData) {
    const updateFilledPlaybookUrl = config.updateFilledPlaybookUrl;
    return this.sharedService.putData(updateFilledPlaybookUrl, formData);
  }

  /**
   * Clone Multiple Playbook Form into one playbook form 
   * @param data formData
   */
  clonePlaybookFormData(formData) {
    const cloneupdatePlaybookUrl = config.cloneupdatePlaybookUrl;
    return this.sharedService.postData(cloneupdatePlaybookUrl, formData);
  }

  /**
   * Bulk Update (Update Multiple Playbook Forms) 
   * @param data formData
   */
  bulkUpdatePlaybook(formData) {
    const bulkupdatePlaybookUrl = config.bulkupdatePlaybookUrl;
    return this.sharedService.putData(bulkupdatePlaybookUrl, formData);
  }

  /**
   * Delete the Playbook form answer sheet of the particular contact
   * @param data form id
   */
  contactDeletePlaybook(form_id) {
    const deleteContactPlaybookUrl = config.deleteContactPlaybookUrl + form_id;
    return this.sharedService.patchData(deleteContactPlaybookUrl, {});
  }

  /**
   * Bulk Update (Update Multiple Playbook Forms) 
   * @param data formData
   */
  deleteSelectedSinglePlaybook(id) {
    const deletePlaybookFormUrl = config.deletePlaybookFormUrl + id;
    return this.sharedService.patchData(deletePlaybookFormUrl, {});
  }

  dynamicSort(property, sortOrder) {
    return function (a, b) {
      let result = null;
      switch (property) {
        case 'created_details': {
          result = (a[property]["created_name"] < b[property]["created_name"]) ? -1 : (a[property]["created_name"] > b[property]["created_name"]) ? 1 : 0;
          break;
        }
        case 'assigned_to': {
          const aLower = a["assignee"]["name"] ? a["assignee"]["name"].toLowerCase() : '';
          const bLower = b["assignee"]["name"] ? b["assignee"]["name"].toLowerCase() : '';
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }
        case 'type': {
          if (a["type"]) {
            const aLower = a["type"] ? a["type"].toLowerCase() : '';
            const bLower = b["type"] ? b["type"].toLowerCase() : '';
            result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
            break;
          }
          else if (a["service_type"]) {
            const aLower = a["service_type"]["service_type"] ? a["service_type"]["service_type"].toLowerCase() : '';
            const bLower = b["service_type"]["service_type"] ? b["service_type"]["service_type"].toLowerCase() : '';
            result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
            break;
          }

        }
        case 'assigne_details': {
          const aLower = a["assigne_details"]["assigne_name"] ? a["assigne_details"]["assigne_name"].toLowerCase() : '';
          const bLower = b["assigne_details"]["assigne_name"] ? b["assigne_details"]["assigne_name"].toLowerCase() : '';
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }
        case 'group': {
          if (a["group"]) {
            const aLower = a["group"][0] ? a["group"][0]["group"].toLowerCase() : 'group';
            const bLower = b["group"][0] ? b["group"][0]["group"].toLowerCase() : 'group';
            result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          }
          else if (a["groups"]) {
            const aLower = a["groups"]["name"] ? a["groups"]["name"].toLowerCase() : '';
            const bLower = b["groups"]["name"] ? b["groups"]["name"].toLowerCase() : '';
            result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          }
          break;
        }
        case 'name': {
          const aLower = a["first_name"].toLowerCase();
          const bLower = b["first_name"].toLowerCase();
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }

        case 'company_name': {
          const aLower = a["company_name"].toLowerCase();
          const bLower = b["company_name"].toLowerCase();
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }
        case 'details': {
          const aLower = (a["details"].trim()).toLowerCase();
          const bLower = (b["details"].trim()).toLowerCase();
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }
        case 'first_name': {
          const aLower = (a["first_name"].trim()).toLowerCase();
          const bLower = (b["first_name"].trim()).toLowerCase();
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
          break;
        }
        default: {
          a[property] = a[property] == null ? '' : a[property];
          b[property] = b[property] == null ? '' : b[property];
          const aLower = (typeof a[property] === "string") ? (a[property].trim()).toLowerCase() : a[property];
          const bLower = (typeof b[property] === "string") ? (b[property].trim()).toLowerCase() : b[property];
          result = (aLower < bLower) ? -1 : (aLower > bLower) ? 1 : 0;
        }
      }
      return result * sortOrder;
    }
  }
}
