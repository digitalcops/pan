import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppService } from '../../../app/app.service';

@Component({
  selector: 'app-table-columns',
  templateUrl: './table-columns.component.html',
  styleUrls: ['./table-columns.component.scss'],
})

export class TableColumnsComponent implements OnInit {
  list1: any[];
  list2: any[];
  columnsPopup =false;
  openColumnsPopUp=false;
  constructor(
  public appService: AppService,
   ) { }
  ngOnInit(): void {
    this.list1 = [
      { values:"Location Interest"},
      { values:"Budget"} ,
      { values:"Timeframe"},
      { values:"Criteria"},
      { values:"Property Type"},
      { values:"Main Features"} ,
      { values:"Qualified"},
      { values:"NextFollow Up"},
      { values:"Last"},
      { values:"Follow Up"} ,
      { values:"Last Login"} ,
      { values:"Source"},
      { values:"Campaign"},
      { values:"Owner"},
      { values:"Lender" },
    ];
    this.list2 = [];
    this.appService.columnspopup.subscribe(res => {
      this.openColumnsPopUp = res;
    });
  }
}
