import { UserAccountsComponent } from './../user-accounts/user-accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { MainPagePaymentComponent } from './main-page-payment/main-page-payment.component';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { UpgradePlansComponent } from './upgrade-plans/upgrade-plans.component';
import { BillingMainTableComponent } from './billing-main-table/billing-main-table.component';
import { FooterTeamComponent } from './footer-team/footer-team.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FooterAboutComponent } from './footer-about/footer-about.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PlansSidebarComponent } from './plans-sidebar/plans-sidebar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-accounts',
    pathMatch: 'full'
  },

  {
    path: 'user-accounts',
    component:UserAccountsComponent
  },
  {
    path: 'about',
    component:FooterAboutComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'team',
    component: FooterTeamComponent
  },
  {
    path: 'billing-main-page',
    component: BillingMainTableComponent
  },
  {
    path: 'upgrade-plans',
    component: UpgradePlansComponent
  },
  {
    path: 'plans',
    component: PlansSidebarComponent
  },
  {
    path: 'payment',
    component: MakePaymentComponent
  },
  {
    path: 'main-payment',
    component: MainPagePaymentComponent
  },
  {
    path: 'billing-history',
    component: BillingHistoryComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
