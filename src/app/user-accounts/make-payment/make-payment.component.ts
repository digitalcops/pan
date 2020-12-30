import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {

  constructor( public appService: AppService,) { }

  ngOnInit() : void {
    
this.appService.updateHeaderName({ name: 'Cards on File'});
   
  }

}
