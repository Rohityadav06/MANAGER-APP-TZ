import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import {
    NavController,
    AlertController,
    MenuController,
    ToastController,
    PopoverController,
    LoadingController,
    ModalController } from '@ionic/angular';

import { RestApiService } from './../../rest-api.service';
import { MessagebodyPage } from './../modal/messagebody/messagebody.page';
import { LoadingPage } from 'src/app/loading/loading.page';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
    isUnread: boolean= false;
    oneAtATime: boolean = true;
    

    @ViewChild(LoadingPage) loadingMask:LoadingPage;
    
    loading=true;
    

  userid: string = localStorage.getItem('_userid');
  respons: any;

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public popoverCtrl: PopoverController,
              public alertController: AlertController,
              public modalController: ModalController,
              public toastCtrl: ToastController,
              public api: RestApiService,
              private loadingController: LoadingController) { }

    ngOnInit() {
        this.getResponse();
       
    
   
    }

    ngAfterViewInit() {
        console.log(this.loadingMask)
    }

   activeIndex: number = -1; // The accordion at index 0 will be open by default

toggleClass(i: number): void {
  this.activeIndex = i;
  
}

    async getResponse() {
        // let loading = await this.loadingController.create({});
        // await loading.present();
        
        await this.api.getmessagesbyuserid(this.userid)
            .subscribe(res => {
                //console.log('@@@Feedback from db: '+JSON.stringify(res));
                // loading.dismiss();
                this.loading=false;
                this.respons = res;
                //this.showAlert('Location Sharing', 'Center location', 'Location sharing '+res['status']+' !!!');
            }, err => {
                console.log(err);
                this.loading=false
                // loading.dismiss();
            });
    }

    async openMessage(res) {
        //console.log('#$#$res: '+JSON.stringify(res))
        const modal = await this.modalController.create({
            component: MessagebodyPage,
            componentProps: {res: res} //<-- this is used to pass data from  this page to the modal page that will open on click
        });
        this.updateMessageStatus(res);
        return await modal.present();
    }
    async updateMessageStatus(res){
        if(res['status'] == 'unread'){
            let isOpen = false;
            let _id = res['_id'];
            let id = res['id'];
            let userid = res['userid'];
            let title = res['title'];
            let message = res['message'];
            let status = 'read';
            let readon = new Date;

            const body = {
                id: id,
                userid: userid,
                title: title,
                message: message,
                status: status,
                readon: readon,
                isOpen: isOpen
            };
            
            let loading = await this.loadingController.create({});
            await loading.present();
            await this.api.updatemessagebyid(_id, body)
                .subscribe(res => {
                    //console.log('@@@Feedback from db: '+JSON.stringify(res));
                    loading.dismiss();
                    //this.getResponse();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
                this.getResponse();

           
        }
        return false;
    }
}
