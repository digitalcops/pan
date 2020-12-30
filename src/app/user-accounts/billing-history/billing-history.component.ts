import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss'],
})
export class BillingHistoryComponent implements OnInit {
  billingColoumns = [
    { field: 'date', header: 'Date' },
    { field: 'description', header: 'Description' },
    { field: 'commision', header: 'Commision Rate' },
    { field: 'sales', header: 'Sales Price' },
    { field: 'sub', header: 'Sub Total' },

  ];
  billingData = [{ 
   date: '12/12/2019',
   description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
   commision: '5.6%' ,
   sales:'$1,800,000' ,
   sub: '$2,800,000',
  },
  { 
    date: '12/12/2019',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    commision: '5.6%' ,
    sales:'$1,800,000' ,
    sub: '$2,800,000',
   },
   { 
    date: '12/12/2019',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    commision: '5.6%' ,
    sales:'$1,800,000' ,
    sub: '$2,800,000',
   },
   { 
    date: '12/12/2019',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    commision: '5.6%' ,
    sales:'$1,800,000' ,
    sub: '$2,800,000',
   }];

  constructor(public appService: AppService,) { }
  ngOnInit(): void {
    this.appService.updateHeaderName({ name: 'Billing History' });
  }
}
