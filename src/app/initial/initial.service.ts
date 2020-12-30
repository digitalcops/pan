import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(
    public sharedService: SharedService
  ) { }

  /**
   * To get roles list
   */
  getRoles(): Observable<any> {
    const getRolesUrl = config.getRoles;
    return this.sharedService.getData(getRolesUrl);
  }

  /**
   * To get Total count
   */
  getCount(): Observable<any> {
    const getCountUrl = config.getCount;
    return this.sharedService.getData(getCountUrl);
  }

}
