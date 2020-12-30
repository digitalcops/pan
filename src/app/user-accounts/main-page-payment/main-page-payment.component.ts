import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-main-page-payment',
  templateUrl: './main-page-payment.component.html',
  styleUrls: ['./main-page-payment.component.scss'],
})
export class MainPagePaymentComponent implements OnInit {
  viewsAndActivityColoumns = [
    { field: 'imageUrl', header: 'Card' },
    { field: 'id', header: 'Name on Card' },
    { field: 'name', header: 'Expires on' },
 
  ];
  viewsAndActivityData = [ { imageUrl: '48XXXXXXXXXX8595' , id:'Jeff Cullen' , name:'10/17'}
];

  constructor( public appService: AppService,) { }

  ngOnInit() : void {
    
this.appService.updateHeaderName({ name: 'Make a Payment'});
   
  }

}
