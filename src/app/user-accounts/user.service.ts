import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';
import { config } from './../config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public sharedService: SharedService,
    public http: HttpClient
  ) { }

  /**
   * To get users list
   * @param data Params
   */
  getUsers(data): Observable<any> {
    let getUserUrl = config.getUsers;
    getUserUrl = getUserUrl.replace(':page', data.page).replace(':limit', data.limit);
    return this.sharedService.postData(getUserUrl, {});
  }

  getSearchType(): Observable<any> {
    const url = config.addUpdateAnnouncementUrl;
    return this.sharedService.getData(url);
  }

   /**
   * To export all users
   */
  exportAllUsers() {
    const exportEmployeeUrl = config.exportEmployeeUrl;
    return this.http.get<Blob>(exportEmployeeUrl, { responseType: 'blob' as 'json' });
  }

  /**
   * To export selected users
   */
  exportSelectedUsers(payload:any) {
    const exportSelectedUsersUrl = config.exportEmployeeUrl;
    return this.http.post<Blob>(exportSelectedUsersUrl, payload, { responseType: 'blob' as 'json' });
  }


  /**
   * To filter user accounts based on selected filters
   * @param content Filters
   */
  getFilteredUsers(content): Observable<any> {
    let getUserUrl = config.getUsers;
    getUserUrl = getUserUrl.replace(':page', content.page).replace(':limit', content.limit);
    return this.sharedService.postData(getUserUrl, content);
  }

  /**
   * To update user
   * @param userData User data
   */
  updateUser(userData): Observable<any> {
    const updateUserUrl = config.updateUser;
    return this.sharedService.putData(updateUserUrl, userData);
  }

  updateBlog(data,id): Observable<any> {
    let statusUpdateUrl = config.addUpdateAnnouncementUrl;
    statusUpdateUrl = statusUpdateUrl.replace(":id", id);
    return this.sharedService.putData(statusUpdateUrl, data);
  }

  updateBuilding(data,id): Observable<any> {
    let buildingStatusUrl = config.addUpdateAnnouncementUrl;
    buildingStatusUrl = buildingStatusUrl.replace(":id", id);
    return this.sharedService.putData(buildingStatusUrl, data);
  }

  updateProperty(data,id): Observable<any> {
    let propertyStatusUrl = config.addUpdateAnnouncementUrl;
    propertyStatusUrl = propertyStatusUrl.replace(":id", id);
    return this.sharedService.putData(propertyStatusUrl, data);
  }

  updateCommunity(data,id): Observable<any> {
    let statusCommunityUrl = config.addUpdateAnnouncementUrl;
    statusCommunityUrl = statusCommunityUrl.replace(":id", id);
    return this.sharedService.putData(statusCommunityUrl, data);
  }

  

}
