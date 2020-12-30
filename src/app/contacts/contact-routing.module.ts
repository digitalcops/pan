import { ContactsComponent } from './../contacts/contacts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContactProfileComponent } from './view-contact-profile/view-contact-profile.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-customers',
    pathMatch: 'full'
  },
  {
    path: 'all-customers',
    component: ContactsComponent
  },
  {
    path: 'mutate-customer',
    component: AddCustomerComponent
  },
  {
    path: 'view-customer',
    component: ViewContactProfileComponent,
  },
  {
    path: 'customer-edit',
    component: ContactEditComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule { }
