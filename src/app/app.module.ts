import { ToastModule } from 'primeng/toast';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthUtils } from './authenticate/autheticate.utils';
import { InitialAuthGuard } from './initial/initial.guard';
import { AuthenticateGuard } from './authenticate/autheticate.guard';
import { Utils } from './utils';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TooltipModule } from 'primeng/tooltip';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'
import { BnNgIdleService } from 'bn-ng-idle';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    EditorModule,
    TabsModule.forRoot(),
    ProgressSpinnerModule,
    TooltipModule,
    ClickOutsideModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MessageService,
    AuthUtils,
    InitialAuthGuard,
    AuthenticateGuard,
    Title,
    Utils,
    BnNgIdleService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  exports: [IonicModule],
})

export class AppModule { }
