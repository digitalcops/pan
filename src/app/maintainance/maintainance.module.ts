import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from './../shared/shared.module';
import {MaintainancePageComponent} from './maintainance-page/maintainance-page.component';
import { MaintainanceRoutingModule } from './maintainance-routing.module';
@NgModule({
  declarations: [
    MaintainancePageComponent,
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    DropdownModule ,
    TableModule ,
    SharedModule ,
    GoogleMapsModule,
    TooltipModule,
    MaintainanceRoutingModule
  ]
})

export class MaintainanceModule { }
