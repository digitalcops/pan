import { HttpClient } from '@angular/common/http';
import { config } from './../../config';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(
    public sharedService: SharedService,
    readonly messageService: MessageService,
    public http: HttpClient,
    ) { }

  /**
   * To add contact
   * @param contactData Contact data
   */
  addContact(contactData) {
    const addContactUrl = config.addContact;
    return this.sharedService.postData(addContactUrl, contactData);
  }

  getListEmbededVideo(page){
    const getListEmbededVideo  = config.getListEmbededVideo;
    return this.sharedService.postData(getListEmbededVideo, page);
  }


  getEmbededideo(data){
    const embededVideoUrl = config.embededVideoUrl;
    return this.sharedService.postData(embededVideoUrl, data);
  }

  getOpenHouse(data){
    const addOpenHouse = config.addOpenHouse;
    return this.sharedService.postData(addOpenHouse, data);
  }

    /**
   * To add service
   * @param serviceData Service data
   */
  addService(serviceData) {
    const addServiceUrl = config.addService;
    return this.sharedService.postData(addServiceUrl, serviceData);
  }

  /**
   * To add user
   * @param user User data
   */
  addUser(user) {
    const addUserUrl = config.addUser;
    return this.sharedService.postData(addUserUrl, user);
  }

  getFeaturedagentList(userlist) {
    const getAllfeaturedlist = config.getAllfeaturedlist;
    return this.sharedService.postData(getAllfeaturedlist, userlist);
  }

  getInterExterPost(data){
    const getInterExterFeatures = config.getInterExterFeatures;
    return this.sharedService.postData(getInterExterFeatures,data);
  }
 
  /**
   * To add user
   * @param user User data
   */
  addGroup(user) {
    const addGroupUrl = config.addGroup;
    return this.sharedService.postData(addGroupUrl, user);
  }

  /**
   * To add tag
   * @param user Tag data
   */
  addTag(tag) {
    const addTagUrl = config.createTagsTeamUrl;
    return this.sharedService.postData(addTagUrl, tag);
  }

  /**
   * To get contries list
   */
  getCountries() {
    const getCountryUrl = config.getCountries;
    return this.sharedService.getData(getCountryUrl);
  }

  getDataOpnHouse(id) {
    const addOpenHouse = config.addOpenHouse + id;
    return this.sharedService.getData(addOpenHouse);
  }

  /**
   * To get flags list
   */
  getFlags() {
    const getFlagsUrl = config.getFlags;
    return this.sharedService.getData(getFlagsUrl);
  }

  /**
   * To get Tag list
   */
  getTagsList() {
    const getTagsUrl = config.getTags;
    return this.sharedService.postData(getTagsUrl, { page: 1, limit: 1000 });
  }

  getServiceSocialMediaLinks(id) {
    const getServiceSocialMediaLink = config.getServiceSocialMediaLink + id;
    return this.sharedService.getData(getServiceSocialMediaLink);
  }

 

  getGroups(data?) {
    const getGroupsUrl = config.getGroups;
    return this.sharedService.postData(getGroupsUrl, data ? data : { page: 1, limit: 1000 });
  }

  /**
   * To get combined data country/flag
   */
  getModalData() {
    const getCountries = this.getCountries();
    const getTags = this.getTagsList();
    const groupIds = this.getGroups();
    return forkJoin([getCountries, getTags, groupIds]);
  }

  /**
   * To get state list
   * @param countryId Country Id
   */
  getStatesList(countryId) {
    let getStateUrl = config.getStates;
    getStateUrl = getStateUrl.replace(':countryId', countryId);
    return this.sharedService.getData(getStateUrl);
  }

  updateTags(data) {
    const updateContactSpec = config.updateContactSpec;
    return this.sharedService.patchData(updateContactSpec, data);
  }

  updateTag(data) {
    const updateTransactionSpec = config.updateTransactionSpec;
    return this.sharedService.patchData(updateTransactionSpec, data);
  }

  updateServiceProviderTags(data) {
    const updateServiceProviderSpec = config.updateServiceProviderSpec;
    return this.sharedService.patchData(updateServiceProviderSpec, data);
  }

  updateTransactionStatus(data) {
    const updateTransactionStatusUrl = config.updateTransactionStatusUrl;
    return this.sharedService.postData(updateTransactionStatusUrl, data);
  }

  activateTransactionStatus(data) {
    const deleteDeactivateStatusUrl = config.deleteDeactivateStatusUrl;
    return this.sharedService.patchData(deleteDeactivateStatusUrl, data);
  }

  deleteTransactionStatus(data) {
    const deleteDeactivateStatusUrl = config.deleteDeactivateStatusUrl;
    return this.sharedService.postData(deleteDeactivateStatusUrl, data);
  }

  deleteEmployeeStatus(data) {
    const deleteEmployeeUrl = config.deleteEmployeeUrl;
    return this.sharedService.postData(deleteEmployeeUrl, data);
  }

  deleteWebsiteBlog(data) {
    const deleteWebsiteBlogUrl = config.deleteWebsiteBlogUrl;
    return this.sharedService.postData(deleteWebsiteBlogUrl, data);
  }

  deleteWebsiteCategory(data) {
    const deleteWebsiteCategoryUrl = config.deleteWebsiteCategoryUrl;
    return this.sharedService.postData(deleteWebsiteCategoryUrl, data);
  }

  deleteWebsiteProperty(data) {
    const deleteWebsitePropertyUrl = config.deleteWebsitePropertyUrl;
    return this.sharedService.postData(deleteWebsitePropertyUrl, data);
  }

  deleteWebsiteBuilding(data) {
    const deleteWebsiteBuildingUrl = config.deleteWebsiteBuildingUrl;
    return this.sharedService.postData(deleteWebsiteBuildingUrl, data);
  }
  
  cmsupdateTags(payload) {
    const cmsUpdateTagUrl = config.cmsUpdateTagUrl;
    return this.sharedService.postData(cmsUpdateTagUrl, payload);
  }

  cmsupdateCategory(payload) {
    const cmsUpdateCategoryUrl = config.cmsUpdateCategoryUrl;
    return this.sharedService.postData(cmsUpdateCategoryUrl, payload);
  }

  cmsupdateProperty(payload) {
    const bulkUpdateWebsitePropertyUrl = config.bulkUpdateWebsitePropertyUrl;
    return this.sharedService.postData(bulkUpdateWebsitePropertyUrl, payload);
  }

  cmsupdateBuilding(payload) {
    const bulkUpdateWebsiteBuildingUrl = config.bulkUpdateWebsiteBuildingUrl;
    return this.sharedService.postData(bulkUpdateWebsiteBuildingUrl, payload);
  }

  deleteTagCms(payload) {
    const deleteTagCmsUrl = config.deleteTagCmsUrl;
    return this.sharedService.postData(deleteTagCmsUrl, payload);
  }

  deleteOpenHouseDetail(index) {
    const deleteOpenHouseLink = config.deleteOpenHouseLink;
    return this.sharedService.deleteData(deleteOpenHouseLink + `/${index}`);
  }


  deleteEmployeenewStatus(data) {
    const bulkUpdateContactsUrl = config.bulkUpdateContactsUrl;
    return this.sharedService.postData(bulkUpdateContactsUrl, data);
  }


  addNotes(data) {
    const addNotesUrl = config.addNotesUrl;
    return this.sharedService.postData(addNotesUrl, data);
  }

  addNotesTags(data) {
    const addTagsNotes = config.addTagsNotes;
    return this.sharedService.patchData(addTagsNotes, data);
  }


  updateTagsPatch(data) {
    const updateContactSpec = config.updateContactSpec;
    return this.sharedService.patchData(updateContactSpec, data);
  }

  exportSelectedTransactions(payload:any) {
    const exportTransactionUrl = config.exportTransactionUrl;
    return this.http.post<Blob>(exportTransactionUrl, payload, { responseType: 'blob' as 'json' });
  }

  exportAllTransactions() {
    const exportTransactionUrl = config.exportTransactionUrl;
    return this.http.get<Blob>(exportTransactionUrl, { responseType: 'blob' as 'json' });
  }

  exportSelectedEmployees(payload:any) {
    const exportEmployeeUrl = config.exportEmployeeUrl;
    return this.http.post<Blob>(exportEmployeeUrl, payload, { responseType: 'blob' as 'json' });
  }

  exportAllEmployees() {
    const exportEmployeeUrl = config.exportEmployeeUrl;
    return this.http.get<Blob>(exportEmployeeUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To get users list
   * @param data Params
   */
  getUsers(data) {
    let getUserUrl = config.getUsers;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.getData(getUserUrl);
  }

  getCatgories() {
    const getCategories = config.getCategories;
    return this.sharedService.getData(getCategories);
  }

  /**
   * To get ticket modal data
   */
  getTicketModalData(countData: any) {
    let getAllTransactionUrl = config.addUpdateAnnouncementUrl;
    getAllTransactionUrl = getAllTransactionUrl.replace(":limit", "1000").replace(":page", "1");
    const trans =  this.sharedService.getData(getAllTransactionUrl);
    const getContacts = this.getContacts({ page: 1, limit: countData.contact_count === 0 ? 1 : countData.contact_count});
    const getUsers = this.getUsers({ page: 1, limit: countData.user_count === 0 ? 1 : countData.user_count });
    const getCatgories = this.getCatgories();
    return forkJoin([getContacts, getUsers, getCatgories, 
      this.sharedService.postData(config.getServiceProviders, { page: 1, limit:1000}),
      trans
    ]);
  }

  /** 
   * To get contacts
   * @param data Page data
   */
  getContacts(data) {
    const url = config.getContacts;
    return this.sharedService.postData(url, data);
  }

  /**
   * To create ticket
   * @param data Ticket data
   */
  createTicket(data) {
    const addTicketUrl = config.addTicket;
    return this.sharedService.postData(addTicketUrl, data);
  }

   /**
   * To Create Play Book Form
   * @param data form data
   */
  createPlaybookForm(data) {
    const createPlaybookFormUrl = config.createPlaybookFormUrl;
    return this.sharedService.postData(createPlaybookFormUrl, data);
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
   * To Publish the form
   * @param data form id
   */
  publishPlaybookForm(payload) {
    const publishPlaybookFormUrl = config.publishPlaybookFormUrl;
    return this.sharedService.patchData(publishPlaybookFormUrl, payload);
  }

  /**
   * To Get all forms the user created.
   * @param data form id
   */
  getPlaybookFormMetaData() {
    const getPlaybookFormMetaDataUrl = config.getPlaybookFormMetaDataUrl;
    return this.sharedService.getData(getPlaybookFormMetaDataUrl);
  }

  /**
   * Update Play book form
   * @param data form id
   */
  updatePlaybookFormData(formData) {
    const updatePlaybookFormDataUrl = config.updatePlaybookFormDataUrl;
    return this.sharedService.putData(updatePlaybookFormDataUrl, formData);
  }

  /**
   * To add features meta data list
   * @param none
   */
  addFeaturesMetaData(in_payload, from_transaction= false, 
    from_employee= false, from_hrms= false) {
      const payload = {...in_payload};
    if(from_transaction) {
      const getTransactionMeta = config.addUpdateAnnouncementUrl;
      return this.sharedService.postData(getTransactionMeta, payload);
    }
    else if(from_employee) {
      const getEmpMetaInfoUrl = config.getEmpMetaInfoUrl;
      return this.sharedService.postData(getEmpMetaInfoUrl, payload);
    }
    else if(from_hrms) {
      let url = "";
      if(payload.types === "degree") { url = config.addDegreeUrl;}
      if(payload.types === "tags") {url = config.addTagUrl;}
      if(payload.types === "emp_category") {url = config.addCategoryUrl;}
      return this.sharedService.postData(url, {name:payload.name});
    }
  }

   /**
   * To send autofill property data 
   * @param none
   */
  sendAutofillPropertyData(payload) {
    const getAutofillPropertyURL = config.getAutofillPropertyURL;
    return this.sharedService.postData(getAutofillPropertyURL, payload);
  }

  print(): void {
    window.print();
  }

  repositionGroup(baseList, selectedGroups) {
    const retList = selectedGroups.map((obj) => {
      return ({
        label: obj.group,
        value: obj.id,
      });
    })

    baseList.forEach(obj => {
      if(!(retList.find(ret => ret.value === obj.value))){
        retList.push(obj);
      }
    });
    return retList;
  }
}
