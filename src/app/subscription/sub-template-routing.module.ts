import { AddAllSubscriptionComponent } from './add-all-subscription/add-all-subscription.component';
import { SubManagementComponent } from './subs-management/subs-management.component';
import { AddInvoicingComponent } from './add-invoice/add-invoice.component';
import { SubInvoicingComponent } from './subs-invoicing/subs-invoicing.component';
import { SubTagsComponent } from './subs-tags/subs-tags.component';
import { AddSalesTeamComponent } from './add-sales-team/add-sales-team.component';
import { AllSalesTeamComponent } from './sales-team/sales-team.component';
import { SubTemplateComponent } from './sub-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubProductsComponent } from './subs-product/sub-products.component';
import { AddQuotaionsComponent } from './add-quotaions/add-quotaions.component';
import { SubQuotationsComponent } from './subs-quotations/subs-quotations.component';
import { AddSalesTeamTestComponent } from './add-sales-team-test/add-sales-team.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-plan',
    pathMatch: 'full'
  },
  {
    path: 'all-plan',
    component: SubTemplateComponent
  },
  {
    path: 'subscription-product',
    component: SubProductsComponent
  },
  {
    path: 'subscription-quotation',
    component: SubQuotationsComponent
  },
  {
    path: 'subscription-tags',
    component: SubTagsComponent
  },
  {
    path: 'invoicing',
    component: SubInvoicingComponent
  },
  {
    path: 'all-subscription',
    component: SubManagementComponent
  },
  {
    path: 'all-subscription/mutate-allsubs',
    component: AddAllSubscriptionComponent
  },
  {
    path: 'subscription-quotation/mutate-quotation',
    component: AddQuotaionsComponent ,
  },
  {
    path: 'invoicing/mutate-invoice',
    component: AddInvoicingComponent,
  },
  {
    
    path: 'sales-team/mutate-salesteam',
    component: AddSalesTeamComponent ,
  },
  {
    
    path: 'sales-team/test',
    component: AddSalesTeamTestComponent ,
  },
  {
    path: 'sales-team',
    component: AllSalesTeamComponent ,
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule { }
