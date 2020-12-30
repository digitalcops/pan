import { Subscription } from 'rxjs';
import { config } from '../../config';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../my-profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../../shared/pop-up/pop-up.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer-team',
  templateUrl: './footer-team.component.html',
  styleUrls: ['./footer-team.component.scss'],
})
export class FooterTeamComponent implements OnInit {
  alpha: any[];
  responsiveOptions;
  total = 0;
  rowNumber = 0;
  pageSize = 50;
  rows = 50;
  rowHeight: number;
  showMoreNotification: Array<any> = [];
  days: Array<any> = [];
  daysDiffernce: any;
  page = 1;
  openNotes = false;
  resetModels = false;
  openNotesList = false;
  openMail = false;
  activeTabbing = 1;
  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder  
  ){
    this.alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
    "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  }

  ngOnInit() {
    this.appService.updateHeaderName({ name: 'Team', count: 1 });
  }
 
  filterTeam() {
    this.appService.updateTeamSidebarState({
      state: true,
      data:5
    });
  };
}
