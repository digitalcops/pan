import { UserComponent } from './overview/user/user.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
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
const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        component:UserComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component:ContactInfoComponent 
          },
          {
            path: 'public-info',
            component: PublicInfoComponent
          },
          {
            path: 'company-info',
            component: CompanyInfoComponent
          },
          {
            path: 'change-pic',
            component: ChangePicComponent
          },
          {
            path: 'social-links',
            component: SocialLinksComponent
          },
          {
            path:'general-settings',
            component: GeneralSettingsComponent
          },
          {
            path:'change-password',
            component: ChangePasswordComponent
          },
          {
            path:'service-areas',
            component: ServiceAreasComponent
          },
          {
            path:'realtor-memberships',
            component: RealtorMembershipsComponent
          }
        ]
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

