import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { InitialService } from './initial.service';
import { Router, ActivatedRoute , NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InitialComponent implements OnInit, OnDestroy {
  inputVariabletrue;
  urlHideSidebar = ['/maintainance/maintainance-page', '/error/error-page'];
  isSidebarVisible = true;

  makeSidebarVisible:boolean;

  selectedIndex = 0;
  fullView = true;
  rolesList: Array<any> = [];
  totalCount = {};
  sideBarSub: Subscription;
  urlToOpen = null;
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public appService: AppService,
    public initialService: InitialService,
    public route: ActivatedRoute,
    public router: Router

  ) {
  
  this.router.events.subscribe(
  (event: any) => {
    if (event instanceof NavigationEnd) {
      const currentUrl = this.router.url;
      if(this.urlHideSidebar.includes(currentUrl)){
        this.isSidebarVisible =false;
        
      }
      else{
        this.isSidebarVisible =true;
      }
    }
  }
);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.urlToOpen = !!params.urlToOpen || false;
  });
    // this.getRoles();
    this.getCount();
    this.initializeApp();
    this.sideBarSub = this.appService.sideBarStateSource$.subscribe((state: any) => {
      this.fullView = state;
    });
  }

  ngOnDestroy() {
    if (this.sideBarSub) {
      this.sideBarSub.unsubscribe();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * To get roles
   */
  getRoles() {
    this.initialService.getRoles().subscribe((response) => {
      this.rolesList = response.data.length > 0 ? this.augmentRoles(response.data) : [];
      this.appService.updateRoles(this.rolesList);
    });
  }

  /**
   * To get count
   */
  getCount() {
    this.initialService.getCount().subscribe((response) => {
      this.totalCount = response.data;
      this.appService.updateCount(this.totalCount);
    });
  }

  /**
   * To augment roles list
   * @param data Roles list
   */
  augmentRoles(data) {
    const updatedData = data.map((role) => ({
      label: role.name,
      value: role.id
    }));
    return updatedData;
  }
  getData(value){
   this.makeSidebarVisible = !value;
  }
}
