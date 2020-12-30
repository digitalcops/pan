import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from './../shared/shared.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import { ErrorRoutingModule } from './error-routing.module';
@NgModule({
  declarations: [
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    DropdownModule ,
    TableModule ,
    SharedModule ,
    GoogleMapsModule,
    TooltipModule,
    ErrorRoutingModule
  ]
})

export class ErrorModule { }
