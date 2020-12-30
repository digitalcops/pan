import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactRoutingModule } from './contact-routing.module';
import { TagInputModule } from 'ngx-chips';
import { ViewContactProfileComponent } from './view-contact-profile/view-contact-profile.component'
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DialogModule } from 'primeng/dialog';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {TabMenuModule} from 'primeng/tabmenu';
import {MultiSelectModule} from 'primeng/multiselect';
import {LightboxModule} from 'primeng/lightbox';
import {CarouselModule} from 'primeng/carousel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DragDropModule } from '@angular/cdk/drag-drop';
import {PickListModule} from 'primeng/picklist';

import { ContactGoogleMap } from './googleMap/googleMap.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [
    ContactsComponent, 
    ViewContactProfileComponent,
    ContactEditComponent, 
    ContactProfileComponent,
    ContactGoogleMap,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    RouterModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    TableModule,
    InputSwitchModule,
    TagInputModule,
    DropdownModule,
    CheckboxModule,
    ContactRoutingModule,
    ProgressSpinnerModule,
    DialogModule,
    CalendarModule,
    NgxIntlTelInputModule,
    TabMenuModule,
    MultiSelectModule,
    LightboxModule,
    CarouselModule,
    DragDropModule,
    GoogleMapsModule,
    PickListModule

  ]
})
export class ContactModule { }
