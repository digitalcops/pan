import { ProfileComponent } from './profile.component';
import { OverviewComponent } from './overview/overview.component'
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AccountsComponent } from './overview/accounts/accounts.component';
import { ContactInfoComponent } from './overview/accounts/contact-info/contact-info.component';
import { PublicInfoComponent } from './overview/accounts/public-info/public-info.component';
import { CompanyInfoComponent } from './overview/accounts/company-info/company-info.component';
import { SocialLinksComponent } from './overview/accounts/social-links/social-links.component';
import { GeneralSettingsComponent } from './overview/accounts/general-settings/general-settings.component';
import { ChangePasswordComponent } from './overview/accounts/change-password/change-password.component';
import { ServiceAreasComponent } from './overview/accounts/service-areas/service-areas.component';
import { RealtorMembershipsComponent } from './overview/accounts/realtor-memberships/realtor-memberships.component';
import { ChangePicComponent } from './overview/accounts/change-pic/change-pic.component';
import { AddAreaComponent } from './overview/accounts/add-area/add-area.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [ProfileComponent, OverviewComponent,
     AccountsComponent,ContactInfoComponent,
     PublicInfoComponent,CompanyInfoComponent,
     SocialLinksComponent,GeneralSettingsComponent,ChangePicComponent,
     ChangePasswordComponent,ServiceAreasComponent,
     AddAreaComponent,RealtorMembershipsComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    DialogModule,
    EditorModule,
    AngularMultiSelectModule,
    NgxIntlTelInputModule
  ]
})
export class ProfileModule { }
