import { AddTaskService } from './add-task.service';
import { AppService } from './../../../app.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PopUpService } from '../pop-up.service';
import { AddTag } from '../pop-up.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalState } from '../../shared.model';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss', '../../../../assets/stylesheets/form.scss'],
})
export class AddTagComponent implements OnInit {
  @Input() taskMode: string;
  addTag: AddTag;
  @Output() modalState = new EventEmitter<any>();
  description: any;
  tag: any;
  rows = 500;
  dmsViewUrl = '/document/dms-tags';
  slug: any;
  modal: ModalState;
  page = 1;
  tag_id: any;
  tag_name: any;
  modalStateDatasubcription: any;
  activestatus: any;
  isGlobalView = false

  constructor(
    public addTaskService: AddTaskService,
    public popUpService: PopUpService,
    public messageService: MessageService,
    public appService: AppService,
    public router: Router,
  ) {
    this.addTag = new AddTag();
    this.appService.openAddTag.subscribe((res) => {
      this.taskMode = res;
    })
  }

  ngOnInit() {
    this.isGlobalView = this.router.url.includes(this.dmsViewUrl);
    if (this.taskMode === 'SAVE') {
      this.addTag.tag_name = '';
      this.addTag.description = '';
      this.addTag.is_global = false;
      this.addTag.slug = '';
      this.activestatus = '';
      this.tag_id = ''
    }
    this.appService.openSharedTag.subscribe((res: any) => {
      if (res && res.name && (res.name !== '')) {
        this.taskMode = 'UPDATE';
        this.addTag.tag_name = res.name;
        this.addTag.description = res.description;
        this.addTag.is_global = res.is_global;
        this.addTag.slug = res.slug;
        this.activestatus = res.is_active;
        this.tag_id = res.id
      }
    });
  }

  firstComponentFunction() {
    // this.website.onFirstComponentButtonClick();
  }

  /**
   * To save tag
   * @param addTag Tag model
   */
  saveTag(addTag) {
    const payload = {
      name: this.addTag.tag_name,
      description: this.addTag.description,
      slug: this.addTag.slug,
    };
    this.popUpService.addTag(payload).subscribe(() => {
      this.appService.getUpdatedData(true);
      this.modalState.emit('addTag');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag created successfully' });
    }, (serverError) => {
      if (typeof serverError.error.message === "object") {
        const message = serverError.error.message;
        for (const key in message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message[key] });
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: serverError.error.message });
      }
    });
  }
  updateTag() {
    const payload = {
      name: this.addTag.tag_name,
      description: this.addTag.description,
      slug: this.addTag.slug,
      is_active: this.activestatus
    };
    this.addTaskService.updateTag(payload, this.tag_id).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag Updated successfully' });
      this.modalState.emit('addTag');
      this.appService.getUpdatedData(true);
      this.appService.getCheckboxValue(false);

    }, (error) => {
    });
  }

  addNewTag(req) {
   
  }

  addNewDMSTag(addTag) {
    
  }

  addUpdateDMSTag(addTag) {
   
  }

  /**
   * To validate Name
   * @param addTag Add tag
   */
  validateName(addTag) {
    if (addTag.name && addTag.name.trim() === '') {
      return true;
    } else {
      return false;
    }
  }
}
