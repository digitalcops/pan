import { AddTagComponent } from './pop-up/add-tag/add-tag.component';
import { SubsPlanComponent } from './subs-plan/subs-plan.component';
import { SubsProductComponent } from './subs-product/subs-product.component';
import { NgModule, Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './pop-up/add-user/add-user.component';
import { InitialComponent } from './../initial/initial.component';
import { HeaderComponent } from './header/header.component';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './interceptor';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TagInputModule } from 'ngx-chips';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { TrimTextDirective } from './trim-text.directive';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule} from 'primeng/radiobutton';
import { SettingSidebarComponent } from './setting-sidebar/setting-sidebar.component'
import { InputSwitchModule } from 'primeng/inputswitch';
import { DndModule } from 'ngx-drag-drop';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {ColorPickerModule} from 'primeng/colorpicker';
import {  TableColumnsComponent } from './table-columns/table-columns.component';
import {PickListModule} from 'primeng/picklist';

@NgModule({
  declarations: [
    SettingSidebarComponent,
    SidebarComponent,
    HeaderComponent,
    InitialComponent,
    AddUserComponent,
    FooterComponent,
    FilterComponent,
    TrimTextDirective,
    SubsPlanComponent,
    SubsProductComponent,
    TableColumnsComponent,
    AddTagComponent
  ],
  imports: [
    InputSwitchModule,
    CommonModule,
    IonicModule,
    AccordionModule,
    RouterModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ProgressSpinnerModule,
    TagInputModule,
    NgxIntlTelInputModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    ImageCropperModule,
    EditorModule,
    CheckboxModule,
    AutoCompleteModule,
    NgxTrimDirectiveModule,
    TooltipModule,
    ConfirmDialogModule,
    RadioButtonModule,
    StepsModule,
    DndModule,
    TableModule,
    MessagesModule,
    MultiSelectModule,
    MenuModule,
    ButtonModule,
    CKEditorModule,
    ColorPickerModule,
    PickListModule

  ],
  exports: [
    SettingSidebarComponent,
    SidebarComponent,
    HeaderComponent,
    InitialComponent,
    AddUserComponent,
    FooterComponent,
    FilterComponent,
    TooltipModule,
    ConfirmDialogModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
    DialogModule,
    IonicModule,
    TableColumnsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    ConfirmationService
  ]
})
export class SharedModule { }
