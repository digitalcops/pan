import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './config';
import { SharedService } from '../app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(readonly SharedService: SharedService) {
    
   }

   getEmail(SendEmailModel):Observable<any>{
    let url= config.sendEmailUrl;
    return this.SharedService.postData(url,SendEmailModel);
  }
}
