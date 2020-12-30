import { IServiceAreaColumns, ServiceAreaTableColumnList } from './../../../profile.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProfileService } from './../../../profile.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../app.service';
import { FormBuilder } from '@angular/forms';
import { PopUpService } from '../../../../shared/pop-up/pop-up.service';
@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.scss'],
})
export class ServiceAreasComponent implements OnInit {

  serviceCols: IServiceAreaColumns[];
  data;
  modal=false;
  loggedInUserId: number;

  saveButtonClickedSubscription: Subscription;

  constructor(
              public messageService: MessageService,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder
  ) {
      this.serviceCols = ServiceAreaTableColumnList;
   }

  ngOnInit() 
  {
    this.loggedInUserId = this.profileService.getLoggedinUserId();

    const params =  {
                      page: 1,
                      limit: 500,
                      user_id: this.loggedInUserId
                    }
    this.getUserDetails(params);

    this.saveButtonClickedSubscription = this.profileService.saveButtonClicked$.subscribe((buttonState: any) => {
      
    });
  }

  getUserDetails(params)
  {
    this.appService.showLoader(true);
    this.profileService.getServiceAreas(params).subscribe((res) => {
      if(res)
      {
        this.data = res.data;
        this.appService.showLoader(false);
      }
    });
  }

  openAddNewModal(){
    this.modal=true;
  }

  updateModalState() {
    this.modal = false;
  }

  updateServiceData()
  {
    const params =  {
                      page: 1,
                      limit: 500,
                      user_id: this.loggedInUserId
                    }
   this.modal = false;
   this.getUserDetails(params);
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }

  ngOnDestroy(): void {
    this.saveButtonClickedSubscription && this.saveButtonClickedSubscription.unsubscribe();
  }
}
