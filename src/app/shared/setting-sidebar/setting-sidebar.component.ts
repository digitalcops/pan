import { Subscription } from 'rxjs';
import { SlidePanelAnimation } from './../../shared/animations/animations';
import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { AppService } from './../../app.service';
import { environment } from './../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-setting-sidebar',
  templateUrl: './setting-sidebar.component.html',
  styleUrls: ['./setting-sidebar.component.scss'],
  animations: SlidePanelAnimation,
})
export class SettingSidebarComponent implements OnInit {
  checked2 = true;
  authenticated = false;
  sidebarSetting = false;
  overlays = false;
  settingSubscription: Subscription;
  authSubscription: Subscription;
  constructor(
    public appService: AppService,
    public messageService: MessageService,
  ) { }
  ngOnInit() {
    this.settingSubscription = this.appService.settingSidebarDataSource$.subscribe((state: any) => {
      if (state) {
        const data = localStorage.getItem('auth');
        this.authenticated = !!(data && (data !== 'null'));
        this.sidebarSetting = true;
        this.overlays = true;
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        this.addScroll();
      }
    });
  }

  onAuthenticateGoogle() {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    if (event.target.closest('.overlaySideMenu') && !event.target.closest('.sidebarSetting')) {
      this.sidebarSetting = false;
      this.overlays = false;
      this.addScroll();
    }
  }
  addScroll() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe();
  }
}
