
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {

  constructor(public appService: AppService) {}

  ngOnInit() {

  }

}
