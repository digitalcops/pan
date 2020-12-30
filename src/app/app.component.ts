import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { AuthenticateService } from './authenticate/authenticate.service';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BnNgIdleService } from 'bn-ng-idle';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', '../assets/stylesheets/form.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  timeoutInterval = 1800;
  spinner = false;
  openCallMsg = false;
  openScheduleMsg = false;
  openColumnsPopup = false;

  callid = 0;
  moduleType = 0;
  list = [];
  customSpinner = false;
  spinnerSub: Subscription;
  customSpinnerSub: Subscription;
  watchSub: Subscription;
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public appService: AppService,
    readonly authService: AuthenticateService,
    readonly router: Router,
    readonly bnIdle: BnNgIdleService,
    public route: ActivatedRoute,
    public messageService: MessageService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  signOut() {
    this.authService.logout().subscribe(() => {
      const remD = localStorage.getItem('rem_d')
      const auth = localStorage.getItem('auth')
      localStorage.clear();
      localStorage.setItem('rem_d', remD);
      localStorage.setItem('auth', auth);
      this.router.navigate(["login"]);
      this.appService.updateSidebarView(false);
    });
  }

  ngOnInit() {
    if (environment.production) {
      this.watchSub = this.bnIdle.startWatching(this.timeoutInterval)
        .subscribe((isTimedOut: boolean) => {
          if (isTimedOut) {
            this.bnIdle.stopTimer();
            this.signOut();
          }
        });
    }
    this.route.queryParams.subscribe((params) => {
      if (params.state && (params.error !== "access_denied")) {
       this.performGoogleAuthOp(params);
      }
    });
    this.subscribeEvents();
  }


  subscribeEvents() {
    this.appService.callpopup.subscribe(res => {
      this.openCallMsg = res.state;
      this.callid = res.callid;
      this.moduleType = res.moduleType;
      this.list = res.list;
    });
    this.appService.schedulepopup.subscribe(res => {
      this.openScheduleMsg = res;
    });
    
    setTimeout(() => {
      this.spinnerSub = this.appService.loaderState$.subscribe((state: any) => {
        this.spinner = state;
      });
      this.customSpinnerSub = this.appService.customloaderState$.subscribe((state: any) => {
        this.customSpinner = state;
      });
    }, 1000);
  }

  performGoogleAuthOp(params) {
  }

  ngOnDestroy(): void {
    if (this.spinnerSub) {
      this.spinnerSub.unsubscribe();
    }
    if (this.customSpinnerSub) {
      this.customSpinnerSub.unsubscribe();
    }
    if (this.watchSub) {
      this.watchSub.unsubscribe();
    }
  }
}
