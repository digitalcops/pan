import { SharedService } from './../shared/shared.service';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  buttonStateChangeSource = new Subject<Object>();
  buttonStateChange$ = this.buttonStateChangeSource.asObservable();

  saveButtonClickedSource = new Subject<Object>();
  saveButtonClicked$ = this.saveButtonClickedSource.asObservable();

  constructor(
    public sharedService: SharedService,
    readonly router: Router,
    public http: HttpClient,
  ) { }

  /**
   * To get tags list
   * @param page Page count
   */
  getUserAllDetails(id): Observable<any> {
    const getUserAllDetails = config.getUserAllDetails;
    return this.sharedService.getData(getUserAllDetails + id);
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

  /**
   * To get Realtor info
   * @param data Page data
   */
  updateRealtorInfo(data){
    const setRealtorInfo = config.setRealtorInfo;
    return this.sharedService.postData(setRealtorInfo, data);
  }

  getRealtorInfo(id) {
    const realtorInfo = config.realtorInfo;
    return this.sharedService.getData(realtorInfo + id);
  }

  getUserDetail(id) {
    const getProfileContactDetail = config.getProfileContactDetail;
    return this.sharedService.getData(getProfileContactDetail + id);
  }

  /**
   * To update contacts
   * @param data Page data
   */
  updateUserDetail(data) {
    const updateProfileContact = config.updateProfileContact;
    return this.sharedService.postData(updateProfileContact, data);
  }

  /**
   * To to get logged in user id
   * @param data delete data
   */
  getLoggedinUserId() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return (loggedInUser ? JSON.parse(loggedInUser).id : 0);
  }

  /**
   * To get public info of the user
   * @param formData FormData
   */
  getPublicInfo(id) {
    const profileInfoUrl = config.profileInfoUrl;
    return this.sharedService.getData(profileInfoUrl + id);
  }

   /**
   * To update/set public info of the user
   * @param formData FormData
   */
  updatePublicInfo(formData) {
    const setprofileInfoUrl = config.setprofileInfoUrl;
    return this.sharedService.postData(setprofileInfoUrl, formData);
  }

  /**
   * To update/set company info of the user
   */
  updateCompanyInfo(formData) {
    const setCompanyInfoUrl = config.setCompanyInfoUrl;
    return this.sharedService.postData(setCompanyInfoUrl, formData);
  }

  /**
   * To get company info of the user
   * @param formData FormData
   */
  getCompanyInfo(id) {
    const companyInfoUrl = config.companyInfoUrl;
    return this.sharedService.getData(companyInfoUrl + id);
  }

  getServiceAreas(params) {
    let serviceAreaInfo = config.serviceAreaInfo;
    serviceAreaInfo = serviceAreaInfo.replace(':page', params.page)
                                     .replace(':limit', params.limit)
                                     .replace(':user_id', params.user_id);
    return this.sharedService.getData(serviceAreaInfo);
  }

  updateServiceAreaInfo(formData) {
    const setServiceAreaInfo = config.setServiceAreaInfo;
    return this.sharedService.postData(setServiceAreaInfo, formData);
  }

  getGeneralSettingInfo(id) {
    const generalSettingInfoUrl = config.generalSettingInfoUrl;
    return this.sharedService.getData(generalSettingInfoUrl + id);
  }

  updateGeneralSettingInfo(formData) {
    const setGeneralSettingUrl = config.setGeneralSettingUrl;
    return this.sharedService.postData(setGeneralSettingUrl, formData);
  }

  getSocialMediaInfo(id) {
    const socialMediaInfoUrl = config.socialMediaInfoUrl;
    return this.sharedService.getData(socialMediaInfoUrl + id);
  }

  updateSocialMediaInfo(formData) {
    const setSocialMediaUrl = config.setSocialMediaUrl;
    return this.sharedService.postData(setSocialMediaUrl, formData);
  }

  updateChangePasswordInfo(formData) {
    const changePasswordUrl = config.changePasswordUrl;
    return this.sharedService.putData(changePasswordUrl, formData);
  }

  getUserProfilePic(id) {
    const UserProfilePicUrl = config.UserProfilePicUrl;
    return this.sharedService.getData(UserProfilePicUrl + id);
  }

  updateUserProfilePic(formData) {
    const setUserProfilePicUrl = config.setUserProfilePicUrl;
    return this.sharedService.postData(setUserProfilePicUrl, formData);
  }

  removeUserProfilePic(id) {
    const removeUserProfilePicUrl = config.removeUserProfilePicUrl;
    return this.sharedService.putData(removeUserProfilePicUrl, id);
  }

  jumpToOverviewScreen()
  {
    this.router.navigate(['profile/overview/user']);
  }

  broadcastButtonStateToParent(state): void {
    this.buttonStateChangeSource.next(state);
  }

  broadcastSaveButtonClicked(): void {
    this.saveButtonClickedSource.next();
  }
}

