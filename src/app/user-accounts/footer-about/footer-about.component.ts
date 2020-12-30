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
  selector: 'app-footer-about',
  templateUrl: './footer-about.component.html',
  styleUrls: ['./footer-about.component.scss'],
})
export class FooterAboutComponent implements OnInit {
  propertyImageSlider: any[] = [];
  imagePath ='../../../assets/images/house-america.png';
  responsiveOptions; 
  constructor(
              public messageService: MessageService,
              public httpclient: HttpClient,
              public popUpService: PopUpService,
              public appService: AppService,
              public profileService: ProfileService,
              public _formBuilder: FormBuilder  
  ) {
    this.propertyImageSlider=[
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
      { image:this.imagePath},
  ];
  this.responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 6,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  }

  ngOnInit() {
    this.appService.updateHeaderName({ name: 'About', count: 1 });
  }
 
}
