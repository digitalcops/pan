import { AddAllSubscriptionComponent } from './add-all-subscription/add-all-subscription.component';
import { SubManagementComponent } from './subs-management/subs-management.component';
import { AddInvoicingComponent } from './add-invoice/add-invoice.component';
import { SubInvoicingComponent } from './subs-invoicing/subs-invoicing.component';
import { SubTagsComponent } from './subs-tags/subs-tags.component';
import { SubscriptionRoutingModule } from './sub-template-routing.module';
import { SubTemplateComponent } from './sub-template.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { GoogleMapsModule } from '@angular/google-maps';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {TabMenuModule} from 'primeng/tabmenu';
import {MultiSelectModule} from 'primeng/multiselect';
import {LightboxModule} from 'primeng/lightbox';
import {CarouselModule} from 'primeng/carousel';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { SubProductsComponent } from './subs-product/sub-products.component';
import { SubQuotationsComponent } from './subs-quotations/subs-quotations.component';
import { AddQuotaionsComponent } from './add-quotaions/add-quotaions.component';
import { AllSalesTeamComponent } from './sales-team/sales-team.component';
import { AddSalesTeamComponent } from './add-sales-team/add-sales-team.component';
import {MenuModule} from 'primeng/menu';
import { AddSalesTeamTestComponent } from './add-sales-team-test/add-sales-team.component';

@NgModule({
  declarations: [
    SubTemplateComponent,
    SubProductsComponent,
    SubQuotationsComponent,
    AddQuotaionsComponent,
    AllSalesTeamComponent,
    AddSalesTeamComponent,
    SubTagsComponent,
    SubInvoicingComponent,
    AddInvoicingComponent,
    SubManagementComponent,
    AddAllSubscriptionComponent,
    AddSalesTeamTestComponent
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
    ProgressSpinnerModule,
    DialogModule,
    CalendarModule,
    NgxIntlTelInputModule,
    TabMenuModule,
    MultiSelectModule,
    LightboxModule,
    CarouselModule,
    AccordionModule,
    GoogleMapsModule,
    SubscriptionRoutingModule,
    MenuModule,
  ]
})
export class SubscriptionModule { }
