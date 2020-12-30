import { Router } from '@angular/router';
import { Utils } from './../../../utils';
import { AppService } from './../../../app.service';
import { MessageService } from 'primeng/api';
import { PopUpService } from './../pop-up.service';
import { AddUser } from './../pop-up.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss', '../../../../assets/stylesheets/form.scss'],
})
export class AddUserComponent implements OnInit {
  addUser: AddUser;
  augmentedRoles: Array<any> = [];
  @Input() rolesList;
  @Input() fromEmployeeTab;
  @Output() modalState = new EventEmitter<any>();
   constructor(
    public popUpService: PopUpService,
    public messageService: MessageService,
    public appService: AppService,
    public router: Router,
    ) {
    this.addUser = new AddUser();
  }

  ngOnInit() {
    const roles = _.clone(this.rolesList);
    roles.splice(0, 1);
    this.augmentedRoles = this.augmentRoles(roles);
  }

  /**
   * To Augment roles
   * @param roles Roles
   */
  augmentRoles(roles) {
    let updatedData = [];
    updatedData = roles.map((role) => ({
      label: role.label,
      value: role.label
    }));
    return updatedData;
  }
  
  /**
   * To add user account
   * @param addUser User model
   */
  addUserAccount(addUser) {
    const baseObj = {...addUser};
    const payload = {
      groups: baseObj.groups,
      email: baseObj.email.toLowerCase(),
      first_name: baseObj.firstName,
      middle_name: baseObj.middleName,
      last_name: baseObj.lastName,
    };
    this.popUpService.addUser(payload).subscribe((res) => {
      this.appService.getUpdatedData(true);
      this.modalState.emit('addUser');
      if(this.fromEmployeeTab) {
        let url = "/hrms/oodo-detail-formtab/employee-form-tab";
        if((payload.groups === "Admin") || (payload.groups === "Agent") || (payload.groups === "Broker")) {
          url = "/hrms/agent-detail-formtab/contact-form-tab";
        }
        this.router.navigate([url]);
        this.appService.updateFromEmployeeTable({...res.body, ...payload});
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.status === 400 ? 'Email already exists' : 'Something went wrong' });
    });
  }

  /**
   * To validate form
   * @param addUser User
   */
  validateForm(addUser) {
    if (addUser.name && addUser.name.trim() === '' || addUser.email && addUser.email.trim() === '') {
      return true;
    } else {
      return false;
    }
  }

}
