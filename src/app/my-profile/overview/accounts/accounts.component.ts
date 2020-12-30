import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { AvailableModelsForAccounts , HrandHrRecruiterAccounts} from './../../../contacts/contact.model';
import { PropertyService } from './../../../property/property.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit { 

    group_name:string;
    items:any[];
    hrItems:any[];
    formId:string;
    ListingName:string;
    navPath:string
    property_id:string
    url_type:string
    link:string
    featureData:string
    addListingModal= false;
    addSearchModal= false;
    searchModelData: any;
    uploadImageModal=false;
    activeItem:boolean;
    modalSubscription: Subscription;
    modalSubscription1: Subscription;
    modalSubscription2: Subscription;
    errorFormList: Subscription;
    propertyPlaceholderSub: Subscription;
    pageRefreshSub: Subscription;

    errorDataFlagsList: boolean[];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public propertyService: PropertyService, 
        public appService: AppService,
        ) {}
    
     ngOnInit(){
        this.errorDataFlagsList = [];
        this.appService.updateHeaderName({ name: 'My Profile'}); 
        this.group_name = localStorage.getItem("loggedInUser")
        ? JSON.parse(localStorage.getItem("loggedInUser")).group_name
        : "";
          
           
            
            const tab_data = AvailableModelsForAccounts["Account_Details"];          
            this.link = tab_data.link;
            this.items = tab_data.tab_listing;
            
            const hrTabData = HrandHrRecruiterAccounts["Account_Details"];
            this.link = hrTabData.link;
            this.hrItems = hrTabData.tab_listing;

            this.items = this.items.map((obj) => {
                return ({
                    ...obj,
                    noErrorClass: true
                });
            });

            this.errorDataFlagsList.forEach((state, idx) => {
                this.items[idx].noErrorClass = state;
            }); 
      
       
        this.modalSubscription = this.appService.modalState$.subscribe((state) => {
            if (state) {
              this.addListingModal = state;
            }
        });

        this.errorFormList = this.appService.errorFormListSource$.subscribe((data) => {
            if (data) {
               this.errorDataFlagsList = data;
               data.forEach((state, idx) => {
                this.items[idx].noErrorClass = state;
               }); 
            }
        });

        this.propertyPlaceholderSub = this.appService.propertyPlaceholderState$.subscribe((featureData) => {
            if (featureData) {
              this.featureData = featureData;
            }
        });

        this.modalSubscription1 = this.appService.searchmodalSource$.subscribe((response) => {
            if (response) {
              this.addSearchModal = true;
              this.searchModelData = response;
            }
        });
        this.modalSubscription2 = this.appService.uploadmodalSource$.subscribe((state) => {
            if (state) {
              this.uploadImageModal = state;
            }
        });
    }

    ngOnDestroy(){
        if (this.modalSubscription) {
            this.modalSubscription.unsubscribe();
        }else if(this.modalSubscription2){
            this.modalSubscription2.unsubscribe();
        }else if(this.modalSubscription1){
            this.modalSubscription1.unsubscribe();
        }

        this.propertyPlaceholderSub && this.propertyPlaceholderSub.unsubscribe();
        this.errorFormList && this.errorFormList.unsubscribe();
        this.pageRefreshSub && this.pageRefreshSub.unsubscribe();
    }

    updateModalState(state) {
        this.addListingModal = state;
    }

    updateSearchState(state){
        this.addSearchModal = state;
    }

    uploadImageState(state){
        this.uploadImageModal = state;
    }

    onClickCancel()
    {
        this.propertyService.saveAsDraft = false;
        this.router.navigate(['/profile/overview']);
    }
    
  }