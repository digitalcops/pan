
import { Utils } from "../../../utils";
import { AppService } from "../../../app.service";
import { Subscription } from "rxjs";
import { SlidePanelAnimation } from "../../../shared/animations/animations";
import {
  Component, 
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import { PopUpService } from "../../../shared/pop-up/pop-up.service";
import { MessageService } from "primeng/api";
import { SharedService } from "../../../shared/shared.service";
import { HttpClient } from "@angular/common/http";
import * as _ from 'underscore';

@Component({
  selector: 'app-filter-team-sidebar',
  templateUrl: './filter-team-sidebar.component.html',
  styleUrls: ['./filter-team-sidebar.component.scss', '../../../../assets/stylesheets/form.scss'],
  animations: SlidePanelAnimation,
})
export class FilterTeamSidebarComponent implements OnInit {
  profileSection = false;
  overlay = false;
  profileData: any;
  sidebarData: any;
  fetchTags: any = [];
  profileSubscription: Subscription;
   metaOptions = null

  @Output() getFiltertedData = new EventEmitter<any>();
  @Output() getResetEmployeeData = new EventEmitter<any>();
  filterModel: any;
  constructor(
    public appService: AppService,
    public popUpService: PopUpService,
    public messageService: MessageService,
    public httpclient: HttpClient,
    public shareService: SharedService,
    public utils: Utils,
    ) {}

  ngOnInit() {
    this.profileSubscription = this.appService.filterTeamSidebarSource$.subscribe(
      (res: any) => {
        if (res.state) {
          this.profileSection = res.state;
          this.overlay = res.state;
          document.getElementsByTagName("body")[0].style.overflow = "hidden";
         
        } 
      }
    );
  }
}
