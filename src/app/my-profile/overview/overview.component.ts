import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  sub: any;
  selectedShiftChangeSubscription: Subscription;

  buttonHidden: boolean;

  constructor(
      public profileService: ProfileService,
      public route: ActivatedRoute
   ) { }

  ngOnInit() { 
    this.buttonHidden = false;

    this.selectedShiftChangeSubscription = this.profileService.buttonStateChange$.subscribe((buttonState: any) => {
      this.buttonHidden = buttonState;
    });
  }

  cancelButtonClicked(){
    this.profileService.jumpToOverviewScreen();
  }
  
  saveButtonClicked()
  {
    this.profileService.broadcastSaveButtonClicked();
  }

  ngOnDestroy(): void {
    this.selectedShiftChangeSubscription && this.selectedShiftChangeSubscription.unsubscribe();
  }
}
