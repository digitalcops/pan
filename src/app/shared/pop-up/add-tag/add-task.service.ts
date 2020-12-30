import { config } from './../../../config';
import { SharedService } from './../../shared.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(readonly sharedService: SharedService) {

  }

  createTag(CreateTaskModel): Observable<any> {
    const url = config.createTagsTeamUrl;
    return this.sharedService.postData(url, CreateTaskModel);
  }

  updateTag(updateTagModel, id): Observable<any> {
    let url = config.updateTagsTeamUrl;
    url = url.replace(':id',id);
    return this.sharedService.putData(url, updateTagModel);
  }

  getSingleTag(id): Observable<any> {
    let url = config.updateTagsTeamUrl;
    url = url.replace(':id',id);
    return this.sharedService.getData(url);
  }
  
}
