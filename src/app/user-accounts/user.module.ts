import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from './../shared/shared.module';
import { UserAccountsComponent } from './../user-accounts/user-accounts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { MainPagePaymentComponent } from './main-page-payment/main-page-payment.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { UpgradePlansComponent } from './upgrade-plans/upgrade-plans.component';
import { BillingMainTableComponent } from './billing-main-table/billing-main-table.component';
import { FooterTeamComponent } from './footer-team/footer-team.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FooterAboutComponent } from './footer-about/footer-about.component';
import {CarouselModule} from 'primeng/carousel';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FilterTeamSidebarComponent } from './footer-team/filter-team-sidebar/filter-team-sidebar.component';
import { PlansSidebarComponent } from './plans-sidebar/plans-sidebar.component';

@NgModule({
  declarations: [
    UserAccountsComponent,
    MakePaymentComponent,
    MainPagePaymentComponent,
    BillingHistoryComponent,
    UpgradePlansComponent,
    BillingMainTableComponent,
    FooterTeamComponent,
    PrivacyPolicyComponent,
    FooterAboutComponent,
    TermsConditionsComponent,
    FilterTeamSidebarComponent,
    PlansSidebarComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    SharedModule,
    FormsModule,
    TableModule,
    DropdownModule,
    UserRoutingModule,
    CheckboxModule,
    CarouselModule
  ]
})
export class UserModule { }
