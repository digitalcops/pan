
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-maintainance-page',
  templateUrl: './maintainance-page.component.html',
  styleUrls: ['./maintainance-page.component.scss'],
})
export class MaintainancePageComponent implements OnInit {

  constructor(public appService: AppService) {}

  ngOnInit() {
    this.appService.updateHeaderName({ name: 'Dashboard', count: 0 });

  }

}
