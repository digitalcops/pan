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
  selector: 'app-company-info',
  templateUrl: './upgrade-plans.component.html',
  styleUrls: ['./upgrade-plans.component.scss'],
})
export class UpgradePlansComponent implements OnInit {
  assignPagelayoutPopup = false;
  cardDetailPopup=false;
 annualPlans :any= [
   {
     plan:"Plan A - Current", popular:"Most Popular",imagePath:"../../../assets/images/noun_popular.svg",
     dollar:"$",  dollar_rates:"495" ,orText:"or",percent:"10%" ,plan_header:"Whichever is less",plan_buttons:"Current Plan"
},
{
  plan:"Plan B - Current", popular:"Save Money",imagePath:"../../../assets/images/noun_Save_green.svg",
  dollar:"$",  dollar_rates:"99" ,orText:".00",percent:"" ,plan_header:"Per Month",plan_buttons:"Upgrade Plan"
},
{
  plan:"Plan C - Current", popular:"High Volume",imagePath:"../../../assets/images/noun_money.svg",
  dollar:"$",  dollar_rates:"99" ,orText:".00",percent:""  ,plan_header:"Per Month",plan_buttons:"Upgrade Plan"
},
{
  plan:"Plan A - Current", popular:"Most Popular",imagePath:"../../../assets/images/noun_popular.svg",
  dollar:"$",  dollar_rates:"495" ,orText:"or",percent:"10%" ,plan_header:"Whichever is less",plan_buttons:"Upgrade Plan"
},

];

  activeTabbing = 1;
  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder  
  ) {
   }

  ngOnInit() {
    this.appService.updateHeaderName({ name: 'Upgrade Plans', count: 1 });
  }
  assignPagelayout(data){
    if(data.plan_buttons === 'Upgrade Plan'){
    this.assignPagelayoutPopup =true;
  }
  };
  cardlayoutPopup(){
  this.cardDetailPopup = true;
}
}
