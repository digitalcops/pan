import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {MaintainancePageComponent} from "./maintainance-page/maintainance-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "maintainance-page",
    pathMatch: "full",
  },
  {
    path: "maintainance-page",
    component: MaintainancePageComponent,
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainanceRoutingModule { }
